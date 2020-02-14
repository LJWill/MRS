import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEye } from '@fortawesome/free-regular-svg-icons';
import { urlTitle, addToList, isSaved, removeFromList } from '../../utils';
import config from '../../config';
import { GenericButton, PrimaryButton, Button } from './Button';
import * as movieActions from '../../store/actions/movie';
import { connect } from 'react-redux';

const Poster = styled.div`
  background-color: #fff;
  background-image: url(${p => `${p.bg}`});
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  position: absolute;
  transition: filter 0.4s;
  width: 100%;
  z-index: -2;
`;

const Rating = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 6px 8px;
  background: #aa2e85;
  color: #fff;
  font-size: 11px;
  border-radius: 100%;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05), 0 7px 20px rgba(0, 0, 0, 0.14);
`;

const Content = styled.div`
  align-items: center;
  display: none;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 10px;
  position: absolute;
  text-align: center;
  width: 100%;

  ${Button} {
    margin: 5px 0;
  }
`;

const Wrapper = styled.article`
  border: 2px solid transparent;
  color: #ddd;
  flex-shrink: 0;
  height: 400px;
  margin: 5px;
  position: relative;
  transition: border 0.2s;
  width: 250px;
  transition: all 0.6s;

  &:hover {
    border: 2px solid #ddd;

    ${Poster} {
      filter: blur(10px);
    }

    ${Content} {
      display: flex;
    }

    &:before {
      background-color: #000;
      content: '';
      height: 100%;
      left: 0;
      opacity: 0.5;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: -1;
    }
  }
`;

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaved: isSaved(props),
      style: { opacity: 1, transform: 'rotateY(0)' }
    };
  }

  add = movie => {
    // addToList(movie);
    // this.setState({ isSaved: true });
    let newData = Object.assign({userAction: 'Like'}, movie)
    this.props.userMovieAction(newData)

    console.log(newData)
  };

  remove = movie => {
    removeFromList(movie);
    this.setState({ isSaved: false });
    if (this.props.inFavorites) {
      this.setState(
        { style: { opacity: 0, transform: 'rotateY(70deg)' } },
        () => {
          setTimeout(() => {
            this.props.removeFromFavorites(movie.id);
          }, 500);
        }
      );
    }
  };

  render() {
    const { title, vote_average, id, poster_path } = this.props;

    let backgroundColor
    if (vote_average >= 8) {
        backgroundColor = 'rgb(78, 173, 31)'
    }else if (vote_average <=6) {
        backgroundColor = 'rgb(166, 173, 31)'
    }else {
        backgroundColor = '#aa2e85'
    }

    return (
      <Wrapper style={this.state.style}>
        <Rating
            style={{backgroundColor}}
        >{vote_average.toFixed(1)}</Rating>
        <Content>
          <h3>{title}</h3>
          <Link
            to={`${process.env.PUBLIC_URL}/movie/${encodeURIComponent(
              urlTitle(title)
            )}/${id}`}
          >
            <PrimaryButton
              title="View"
              icon={<FontAwesomeIcon icon={faEye} />}
            />
          </Link>
          <Link
            to={`/movies`}
          >
          {this.state.isSaved ? (
            <GenericButton
              title="Favorite"
              icon={<FontAwesomeIcon icon="star" />}
              onClick={() => this.remove(this.props)}
            />
          ) : (
            <GenericButton
              title="Favorite"
              icon={<FontAwesomeIcon icon={faStar} />}
              onClick={() => this.add(this.props)}
            />
          )}
          </Link>
        </Content>
        <Poster bg={`${config.medium}${poster_path}`} />
      </Wrapper>
    );
  }
}


const mapStateToProps = state => {
  return {
    genres: state.movieBrowser.genres,
    movies: state.movieBrowser.movies,
    userMovies: state.userMovie.userMovies
  };
};

const mapDispatchToProps = dispatch => ({
  userMovieAction: (movie) => dispatch(movieActions.userMovieAction(movie)),
  userMovieRemove: (movie) => dispatch(movieActions.userMovieRemove(movie))
});


export default connect(mapStateToProps, mapDispatchToProps)(Movie);