import _ from 'lodash';
import faker from 'faker';
import React, { Component } from 'react';
import { Search, Grid, Header, Segment } from 'semantic-ui-react';


const source = _.times(5, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$')
}));

const initialState = { isLoading: false, results: [], value: '' };

const styles = {
  searchBar: {
    alignItems: 'center',
    display: 'flex'
  }
};
export default class SearchExampleStandard extends Component {
  state = initialState;

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch)
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Grid.Column width={12} style={styles.searchBar}>
        <style>
        {`
            .ui.search .prompt {
                border-radius: 500rem;
                width:500px
            }
        `}
        </style>
        <Search
          fluid
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true
          })}
          results={results}
          value={value}
          {...this.props}
        />
      </Grid.Column>
    );
  }
}
