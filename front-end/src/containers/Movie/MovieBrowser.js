import React from 'react';
import _ from 'lodash';
import { Container, Divider, Grid, Header, Icon } from 'semantic-ui-react';
import MovieCard from '../../components/MovieList/MovieCard';
import Nav from '../../components/HeadMenu/Nav';
import { connect } from 'react-redux';

import shuffle from 'lodash/shuffle';
import throttle from 'lodash/throttle';
import FlipMove from 'react-flip-move';
import './MovieBrowser.scss';

class MovieBrowser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      items: {
        A: { selected: false },
        B: { selected: false },
        C: { selected: false },
        D: { selected: false },
        E: { selected: false },
        F: { selected: false },
        G: { selected: false },
        H: { selected: false },
        I: { selected: false },
        J: { selected: false },
        K: { selected: false },
        L: { selected: false },
        M: { selected: false },
        N: { selected: false },
        O: { selected: false },
        P: { selected: false },
        Q: { selected: false },
        R: { selected: false },
        S: { selected: false },
        T: { selected: false },
        U: { selected: false },
        V: { selected: false },
        W: { selected: false },
        X: { selected: false },
        Y: { selected: false },
        Z: { selected: false }
      }
    };
  }

  selectItem(key) {
    this.setState({
      items: {
        ...this.state.items,
        [key]: { selected: !this.state.items[key].selected }
      }
    });
  }

  renderItem(key) {
    return (
      <div className="utem" onClick={() => this.selectItem(key)} key={key}>
        {key}
      </div>
    );
  }

  render() {
    const { selected, items } = this.state;

    console.log('[[[[[[[[[[[[', this.props)
    const selectedKeys = Object.keys(items).filter(key => items[key].selected);
    const remainingKeys = Object.keys(items).filter(
      key => !items[key].selected
    );

    return (
      <div>
        <Nav />

        <Container className="movieContainer">
          {/* <MyTabs /> */}
          {/* <Header as="h2" inverted textAlign="center">
          Movie List
        </Header> */}
          <Divider />

          <hr />
          <FlipMove className="selected">
            {selectedKeys.length === 0 && (
              <div className="placeholder">Please select an item below</div>
            )}
            {selectedKeys.map(key => this.renderItem(key))}
          </FlipMove>
          <hr />

          <FlipMove
            className="items"
            duration={350}
            staggerDurationBy={20}
            staggerDelayBy={20}
          >
            <FlipMove>
              {Object.keys(items)
                // .filter(key => !items[key].selected)
                .map(key => this.renderItem(key))}
            </FlipMove>
          </FlipMove>
        </Container>
      </div>
    );
  }
}

class ListItem extends React.Component {
  render() {
    const listClass = `list-item card ${this.props.view}`;
    const style = { zIndex: 100 - this.props.index };

    return (
      <li id={this.props.id} className={listClass} style={style}>
        <h3>{this.props.name}</h3>
        <button onClick={this.props.clickHandler}>
          <i className="fa fa-close" />
        </button>
      </li>
    );
  }
};

class Shuffle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      removedArticles: [],
      view: 'grid',
      order: 'asc',
      sortingMethod: 'chronological',
      enterLeaveAnimation: 'accordianVertical',
      movies: this.props.movies[0]
    };

    this.toggleList = this.toggleList.bind(this);
    this.toggleGrid = this.toggleGrid.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
    this.sortRotate = this.sortRotate.bind(this);
    this.sortShuffle = this.sortShuffle.bind(this);
  }

  toggleList() {
    this.setState({
      view: 'list',
      enterLeaveAnimation: 'accordianVertical'
    });
  }

  toggleGrid() {
    this.setState({
      view: 'grid',
      enterLeaveAnimation: 'accordianHorizontal'
    });
  }

  toggleSort() {
    const sortAsc = (a, b) => a.timestamp - b.timestamp;
    const sortDesc = (a, b) => b.timestamp - a.timestamp;

    this.setState({
      order: (this.state.order === 'asc' ? 'desc' : 'asc'),
      sortingMethod: 'chronological',
      articles: this.state.articles.sort(
        this.state.order === 'asc' ? sortDesc : sortAsc
      )
    });
  }

  sortShuffle() {
    this.setState({
      sortingMethod: 'shuffle',
      articles: shuffle(this.state.articles)
    });
  }

  moveArticle(source, dest, id) {
    const sourceArticles = this.state[source].slice();
    let destArticles = this.state[dest].slice();

    if ( !sourceArticles.length ) return;

    // Find the index of the article clicked.
    // If no ID is provided, the index is 0
    const i = id ? sourceArticles.findIndex(article => article.id === id) : 0;

    // If the article is already removed, do nothing.
    if ( i === -1 ) return;

    destArticles = [].concat( sourceArticles.splice(i, 1), destArticles );

    this.setState({
      [source]: sourceArticles,
      [dest]: destArticles,
    });
  }

  sortRotate() {
    const articles = this.state.articles.slice();
    articles.unshift(articles.pop())

    this.setState({
      sortingMethod: 'rotate',
      articles
    });
  }

  renderMovies() {
    console.log('[[[[[', this.props)
    return this.state.movies.map( (movie, i) => {
      return (
        <ListItem
          key={movie.id}
          view={this.state.view}
          index={i}
          clickHandler={throttle(() => this.moveArticle('movies', 'removedMovies', movie.id), 800)}
          {...movie}
        />
      );
    });
  }

  render() {
    return (
      <div id="shuffle" className={this.state.view}>
        {/* <header>
          <div className="abs-right">
            <Toggle
              clickHandler={this.sortShuffle}
              text="Shuffle" icon="random"
              active={this.state.sortingMethod === 'shuffle'}
            />
          </div>
        </header> */}
        <div>
          <FlipMove
            staggerDurationBy="30"
            duration={500}
            enterAnimation={this.state.enterLeaveAnimation}
            leaveAnimation={this.state.enterLeaveAnimation}
            typeName="ul"
          >
            { this.renderMovies() }

            {/* <footer key="foot">
              <div className="abs-right">
                <Toggle
                  clickHandler={() => (
                    this.moveArticle('removedArticles', 'articles')
                  )}
                  text="Add Item"
                  icon="plus"
                  active={this.state.removedArticles.length > 0}
                />
                <Toggle
                  clickHandler={() => (
                    this.moveArticle('articles', 'removedArticles')
                  )}
                  text="Remove Item"
                  icon="close"
                  active={this.state.articles.length > 0}
                />
              </div>
            </footer> */}
          </FlipMove>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    genres: state.movieBrowser.genres,
    movies: state.movieBrowser.movies
  };
};


export default connect(mapStateToProps)(MovieBrowser);

