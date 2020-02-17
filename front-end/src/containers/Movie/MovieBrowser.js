import React from 'react';
import _ from 'lodash';
import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Pagination
} from 'semantic-ui-react';
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
    console.log('9999999999', this.props.token);

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
    // m && this.setState({ movies: m.most_watched });
    this.setState({ movies: this.props.recommendMovies})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.movies !== this.props.movies) {
      // get now playing movies
      // this.setState({ movies: nextProps.movies[0].most_watched });
      this.setState({ movies: this.props.recommendMovies})
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

        <Container className="pagination">
            <Pagination
              defaultActivePage={5}
              ellipsisItem={{
                content: <Icon name="ellipsis horizontal" />,
                icon: true
              }}
              firstItem={{
                content: <Icon name="angle double left" />,
                icon: true
              }}
              lastItem={{
                content: <Icon name="angle double right" />,
                icon: true
              }}
              prevItem={{ content: <Icon name="angle left" />, icon: true }}
              nextItem={{ content: <Icon name="angle right" />, icon: true }}
              totalPages={10}
            />
        </Container>
      </div>
    );
  }
}

const MovieView = data => {
  return data.data.map(m => (
    <Flipped flipId={m.idMovie} key={m.idMovie}>
      <Grid.Column>
        <MidMovieCard {...m} shuffleMovie={data.func} />
      </Grid.Column>
    </Flipped>
  ));
};

const mapStateToProps = state => {
  return {
    // genres: state.movieBrowser.genres,
    movies: state.movieBrowser.movies,
    userMovies: state.userMovie.userMovies,
    recommendMovies: state.recommendMovie.movies,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => ({
  userMovieAction: (movie, token) =>
    dispatch(movieActions.userMovieAction(movie, token)),
  userMovieRemove: (movie, token) =>
    dispatch(movieActions.userMovieRemove(movie, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieBrowser);
