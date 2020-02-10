import { axiosMovies as axios } from '../../axios';
import * as actionTypes from './actionTypes';

export const getGenreStart = () => {
  return {
    type: actionTypes.GET_GENRE_START
  };
};

export const getGenreSuccess = genres => {
  return {
    type: actionTypes.GET_GENRE_SUCCESS,
    genres
  };
};

export const getGenreFail = error => {
  return {
    type: actionTypes.GET_GENRE_FAIL,
    error: error
  };
};

export const getMovieStart = () => {
  return {
    type: actionTypes.GET_MOVIE_START
  };
};

export const getMovieSuccess = (res, filters) => {
  const ms = res.map((r, i) => {
    return { [filters[i]]: r.data.results };
  });

  return {
    type: actionTypes.GET_MOVIE_SUCCESS,
    movies: ms,
    filters
  };
};

export const getMovieFail = error => {
  return {
    type: actionTypes.GET_MOVIE_FAIL,
    error: error
  };
};

export const getMovies = requestData => {
  const filters = requestData.filters;

  const requests = filters.map(filter => {
    return axios.get(`/movie/${filter}`, {
      params: { page: requestData.page }
    });
  });

  return dispatch => {
    dispatch(getMovieStart());
    Promise.all(requests)
      .then(res => {
        dispatch(getMovieSuccess(res, filters));
      })
      .catch(err => {
        console.log('*****', err);
        dispatch(getMovieFail(err));
      });
  };
};

export const searchMovies = requestData => {
  return axios.get(`/search/movie`, {
    params: { query: requestData.query, page: requestData.page }
  });
};

export const getGenres = () => {
  return dispatch => {
    dispatch(getGenreStart());
    axios
      .get(`genre/movie/list`, { params: {} })
      .then(res => {
        console.log(res);
        console.log(res.data.genres);
        dispatch(getGenreSuccess(res.data.genres));
      })
      .catch(err => {
        console.log('*****', err);
        dispatch(getGenreFail(err));
      });
  };
};

export const getMovie = id => {
  return axios.get(`/movie/${id}`);
};

export const getActors = id => {
  return axios.get(`/movie/${id}/credits`);
};

export const getMovieImages = id => {
  return axios.get(`/movie/${id}/images`, { params: { language: 'null' } });
};

export const getRecommendations = id => {
  return axios.get(`/movie/${id}/recommendations`, {
    params: {
      language: 'null',
      page: 1
    }
  });
};
