import React from 'react';
import _ from 'lodash';
import { Container, Divider, Grid, Header, Icon } from 'semantic-ui-react';
import MidMovieCard from '../../components/MovieList/MidMovieCard';
import DisplayNav from '../../components/HeadMenu/DisplayNav';
import { connect } from 'react-redux';
import { Flipper, Flipped } from 'react-flip-toolkit';
import * as movieActions from '../../store/actions/movie';
import './MovieBrowser.scss';

class MovieBrowser extends React.Component {
  state = {
    expanded: false,
    movies: null
  };

  shuffleMovie = movie => {

    this.setState({
      movies: _.shuffle(this.state.movies),
      expanded: !this.state.expanded
    });

    this.props.userMovieAction(movie, this.props.token);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  anotherShuffleMovie = movie => {

    console.log('9999999999', this.props.token)

    this.setState({
      movies: _.shuffle(this.state.movies),
      expanded: !this.state.expanded
    });

    this.props.userMovieRemove(movie, this.props.token);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  componentDidMount() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  componentWillMount() {
    let m = this.props.movies[0];
    // console.log('++++++++++', m && m);
    m && this.setState({ movies: m.top_rated });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.movies !== this.props.movies) {
      // get now playing movies
      console.log('++++++++++', nextProps.movies[0].top_rated);
      this.setState({ movies: nextProps.movies[0].top_rated });
    }
  }

  render() {
    let { movies } = this.state;

    return (
      <div>
        <DisplayNav
          movies={this.props.userMovies}
          func={this.anotherShuffleMovie}
        />
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
    <Flipped flipId={m.idMovie}>
      <Grid.Column>
        <MidMovieCard {...m} key={m.idMovie} shuffleMovie={data.func} />
      </Grid.Column>
    </Flipped>
  ));
};

const mapStateToProps = state => {
  return {
    // genres: state.movieBrowser.genres,
    movies: state.movieBrowser.movies,
    userMovies: state.userMovie.userMovies,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => ({
  userMovieAction: (movie, token) => dispatch(movieActions.userMovieAction(movie, token)),
  userMovieRemove: (movie, token) => dispatch(movieActions.userMovieRemove(movie, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieBrowser);
