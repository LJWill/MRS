import React from 'react';
import _ from 'lodash';
import { Container, Divider, Grid, Header, Icon } from 'semantic-ui-react';
import MidMovieCard from '../../components/MovieList/MidMovieCard';
import DisplayNav from '../../components/HeadMenu/DisplayNav';
import { connect } from 'react-redux';
import { Flipper, Flipped } from 'react-flip-toolkit';
import FlipMove from 'react-flip-move';
import * as movieActions from '../../store/actions/movie';
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

    console.log('[[[[[[[[[[[[', this.props);
    const selectedKeys = Object.keys(items).filter(key => items[key].selected);
    const remainingKeys = Object.keys(items).filter(
      key => !items[key].selected
    );

    return (
      <div>
        <DisplayNav />

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


class Example extends React.Component {
  state = {
    expanded: false,
    movies: null
  };

  shuffleMovie = (movie) => {
    this.setState({
      movies: _.shuffle(this.state.movies),
      expanded: !this.state.expanded
    });

    console.log(movie)
    this.props.userMovieLike(movie)

  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.movies !== this.props.movies) {
      // get now playing movies
      this.setState({ movies: nextProps.movies[0].now_playing });
    }
  }

  render() {

    let { movies } = this.state;

    console.log('----------->', this.state.expanded);

    return (
      <div>
        <DisplayNav movies={this.props.userMovies}/>
        <Container className="movieContainer">
          <Flipper flipKey={this.state.expanded} spring="gentle">
            {movies && (
              <Grid container columns={5}>
                <MovieView data={movies} func={this.shuffleMovie} />
              </Grid>
            )}
          </Flipper>
        </Container>
      </div>
    );
  }
}

const MovieView = data => {
  return data.data.map(m => (
    <Flipped flipId={m.id}>
      <Grid.Column>
        <MidMovieCard {...m} key={m.id} shuffleMovie={data.func} />
      </Grid.Column>
    </Flipped>
  ));
};


const mapStateToProps = state => {
  return {
    genres: state.movieBrowser.genres,
    movies: state.movieBrowser.movies,
    userMovies: state.userMovie.userMovies
  };
};

const mapDispatchToProps = dispatch => ({
  userMovieLike: (movie) => dispatch(movieActions.userMovieLike(movie)),
  userMovieDisLike: (movie) => dispatch(movieActions.userMovieDisLike(movie))
});


export default connect(mapStateToProps, mapDispatchToProps)(Example);
