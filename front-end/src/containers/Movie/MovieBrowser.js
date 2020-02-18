import React from 'react';
import _ from 'lodash';
import {
  Container,
  Divider,
  Grid,
  Header,
  Loader,
  Dimmer,
  Icon,
  Pagination
} from 'semantic-ui-react';
import MidMovieCard from '../../components/MovieList/MidMovieCard';
import DisplayNav from '../../components/HeadMenu/DisplayNav';
import { connect } from 'react-redux';
import { Flipper, Flipped } from 'react-flip-toolkit';
import * as movieActions from '../../store/actions/movie';
import './MovieBrowser.scss';
import { createGlobalStyle } from 'styled-components';
// import { withRouter } from "react-router-dom"

const GlobalStyle = createGlobalStyle`
@keyframes fadeIn {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}

 .fadeIn{
  animation: fadeIn .35s forwards;
  animation-timing-function: cubic-bezier(0.39, 0.575, 0.565, 1);
}

@keyframes fadeOut {
  0% { opacity: 1}
  100% { opacity: 0; }
}

 .fadeOut{
  animation: fadeOut .3s forwards;
  animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);
}

`;

class MovieBrowser extends React.Component {
  state = {
    expanded: false,
    movies: null,
    loaded: false,
    activePage: null
  };

  shuffleMovie = () => {
    this.setState({
      // movies: _.shuffle(this.state.movies),
      movies: this.props.recommendMovies,
      expanded: !this.state.expanded,
      loaded: false
    });
  };

  anotherShuffleMovie = movie => {
    this.setState({
      // movies: _.shuffle(this.state.movies),
      movies: this.props.recommendMovies,
      expanded: !this.state.expanded,
      loaded: false
    });

    // this.props.userMovieRemove(movie, this.props.token);
  };

  componentDidMount() {
    this.setState({ movies: this.props.recommendMovies, loaded: true });

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  componentWillMount() {
    this.setState({ movies: this.props.recommendMovies });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.recommendMovies !== this.props.recommendMovies) {
      this.setState({ movies: nextProps.recommendMovies, loaded: true });
    }
  }

  handlePaginationChange = (e, { activePage }) => {
    console.log(activePage);
    this.setState({ activePage });
    this.props.getMyRecommendation(activePage);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  createFlipperKey = () => {
    let id_list = this.props.recommendMovies.map(movie => movie.idMovie);
    return id_list.join('-');
  };

  render() {
    // let { movies } = this.state;
    let movies = this.props.recommendMovies;
    return (
      <div>
        <GlobalStyle />
        <DisplayNav
          movies={this.props.userMovies}
          func={this.anotherShuffleMovie}
        />

        {this.props.isFetching && (
          <Dimmer active>
            <Loader active inverted>
              Loading
            </Loader>
          </Dimmer>
        )}

        <Container className="movieContainer">
          <Flipper flipKey={this.createFlipperKey()} spring="gentle">
            <Grid container columns={5}>
              <MovieView
                data={movies}
                func={this.shuffleMovie}
                loaded={this.state.loaded}
              />
            </Grid>
          </Flipper>
        </Container>

        <Container className="pagination">
          <Pagination
            defaultActivePage={this.props.currentPage}
            activePage={this.props.currentPage}
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
            totalPages={this.props.totalPage}
            onPageChange={this.handlePaginationChange}
          />
        </Container>
      </div>
    );
  }
}

const onAppear = (el, i) => {
  setTimeout(() => {
    el.classList.add('fadeIn');
    setTimeout(() => {
      el.style.opacity = 1;
      el.classList.remove('fadeIn');
    }, 500);
  }, i * 30);
};

const onExit = (el, i, removeElement) => {
  setTimeout(() => {
    el.classList.add('fadeOut');
    setTimeout(removeElement, 500);
  }, i * 50);
};

const onComplete = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};

const MovieView = data => {
  // console.log('helooooooooo', data.loaded, data.data[0]);
  return data.data.map(m => (
    <Flipped
      flipId={m.idMovie}
      key={m.idMovie}
      onAppear={onAppear}
      onExit={onExit}
      onComplete={onComplete}
    >
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
    totalPage: state.recommendMovie.total_page,
    currentPage: state.recommendMovie.current_page,
    nextPage: state.recommendMovie.next,
    previousPage: state.recommendMovie.previous,
    isFetching: state.recommendMovie.isFetching,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => ({
  userMovieAction: (movie, token) =>
    dispatch(movieActions.userMovieAction(movie, token)),
  userMovieRemove: (movie, token) =>
    dispatch(movieActions.userMovieRemove(movie, token)),
  getMyRecommendation: pageNumber =>
    dispatch(movieActions.getMyRecommendation(pageNumber))
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieBrowser);
