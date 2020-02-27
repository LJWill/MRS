import _ from 'lodash';
// import faker from 'faker';
import React, { Component } from 'react';
import { Search, Grid, Header, Segment } from 'semantic-ui-react';
import pic from '../../assets/images/m2.png';
import { connect } from 'react-redux';
import * as movieActions from '../../store/actions/movie';

const source = _.times(6, () => ({
  title: 'hello world',
  description: 'people',
  image: pic,
  price: '$1,000,000'
}));

const initialState = { isLoading: false, results: [], value: '' };

const styles = {
  searchBar: {
    alignItems: 'center',
    display: 'flex'
  }
};
class SearchExampleStandard extends Component {
  state = initialState;

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    let keywords = value.split(' ');

    // console.log('&&&&&&&&&&&&&&&&', keywords);

    // setTimeout(() => {
    //   if (this.state.value.length < 1) return this.setState(initialState);

    //   const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
    //   const isMatch = result => re.test(result.title);

    //   this.setState({
    //     isLoading: false,
    //     results: _.filter(source, isMatch)
    //   });
    // }, 1500);

    this.props.getMovieSearch(keywords);
  };

  componentWillReceiveProps(nextProps) {

    if (this.props.movieSearch !== nextProps.movieSearch) {
      this.setState({
        isLoading: false,
        results: nextProps.movieSearch
      });
    }
  }

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Grid.Column width={12} style={styles.searchBar}>
        <style>
          {`
            .ui.search .prompt {
                border-radius: 500rem;
                width:50vw
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

const mapStateToProps = state => {
  return {
    movies: state.movieBrowser.movies,
    userMovies: state.userMovie.userMovies,
    movieSearch: state.movieSearch.movies
  };
};

const mapDispatchToProps = dispatch => ({
  userMovieAction: (movie, token) =>
    dispatch(movieActions.userMovieAction(movie, token)),
  getMovieSearch: keywords => dispatch(movieActions.getMovieSearch(keywords))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchExampleStandard);
