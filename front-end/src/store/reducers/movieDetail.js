import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  isFeching: false,
  movie: null,
  credits: null,
  images: null,
  recommendations: null,
  error: null
};

const getMovieDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    isFeching: true
  });
};

const getMovieDetailSuccess = (state, action) => {
  return updateObject(state, {
    movie: action.movie,
    credits: action.credits,
    images: action.images,
    recommendations: action.recommendations,
    isFeching: false,
    error: null
  });
};

const getMovieDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    isFeching: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MOVIE_DETAIL_START:
      return getMovieDetailStart(state, action);
    case actionTypes.GET_MOVIE_DETAIL_SUCCESS:
      return getMovieDetailSuccess(state, action);
    case actionTypes.GET_MOVIE_DETAIL_FAIL:
      return getMovieDetailFail(state, action);

    default:
      return state;
  }
};

export default reducer;
