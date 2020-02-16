import { axiosMovies as axios } from '../../axios';
import * as actionTypes from './actionTypes';

// get genre
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

// get movie list
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

// get movie detailed info
export const getMovieDetailStart = () => {
  return {
    type: actionTypes.GET_MOVIE_DETAIL_START
  };
};

export const getMovieDetailSuccess = res => {
  // let arr = ['movie', 'credits', 'recommendations']

  return {
    type: actionTypes.GET_MOVIE_DETAIL_SUCCESS,
    movie: res[0].data,
    credits: res[1].data,
    images: res[2].data,
    recommendations: res[3].data
  };
};

export const getMovieDetailFail = error => {
  return {
    type: actionTypes.GET_MOVIE_DETAIL_FAIL,
    error: error
  };
};

export const getMovies = requestData => {
  const filters = requestData.filters;

  const requests = filters.map(filter => {
    return axios.get(`/movie/${filter}/`, {
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

export const getMovieDetail = id => {
  const requests = [
    getMovie(id),
    getActors(id),
    getMovieImages(id),
    getRecommendations(id)
  ];

  console.log(requests);
  return dispatch => {
    dispatch(getMovieDetailStart());
    Promise.all(requests)
      .then(res => {
        console.log(res);
        dispatch(getMovieDetailSuccess(res));
      })
      .catch(err => {
        console.log('*****', err);
        dispatch(getMovieDetailFail(err));
      });
  };
};

export const getMovie = id => {
  return axios.get(`/movie/${id}`, {
    params: {}
  });
};

export const getActors = id => {
  return axios.get(`/movie/${id}/credits`, {
    params: { language: ""}
  });
};

export const getMovieImages = (id) => {
  return axios.get(`/movie/${id}/images`, {
    params: { language: "null"}
  });
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

export const getRecommendations = id => {
  return axios.get(`/movie/${id}/recommendations`, {
    params: {
      language: 'null',
      page: 1
    }
  });
};



// dispatch user movie action

export const userMovieAction = (movie) => {
  return {
    type: actionTypes.USER_MOVIE_ACTION,
    movie
  };
};

export const userMovieRemove = (movie) => {
  return {
    type: actionTypes.USER_MOVIE_REMOVE,
    movie
  };
};


export const userMovieSuccess = movie => {
  return {
    type: actionTypes.USER_MOVIE_SUCCESS,
    movie
  };
};

export const userMovieFail = error => {
  return {
    type: actionTypes.USER_MOVIE_FAIL,
    error: error
  };
};


export const dispatchUserMovie = (movie, userAction) => {

  return dispatch => {
    // axios.get(`/movie/${id}`, {
    //   params: {}
    // });

    dispatch(userMovieSuccess(movie))

  };
};