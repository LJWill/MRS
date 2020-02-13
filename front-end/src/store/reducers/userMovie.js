import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  isFetching: false,
  error: null,
  userAction: null,
  userMovies: []
};

const containObj = (obj, list) => {
  let result = false;
  list.map(item => {
    if (obj.id === item.id) {
      result = true;
    }
  });
  return result;
};

const userMovieAction = (state, action) => {
  if (!containObj(action.movie, state.userMovies)) {
    return updateObject(state, {
      userMovies: [...state.userMovies, action.movie]
    });
  } else {
    return updateObject(state, {
      userMovies: state.userMovies
    });
  }
};

const userMovieRemove = (state, action) => {
  const newState = state.userMovies.filter(item => item.id !== action.movie.id);

  return updateObject(state, {
    userMovies: newState
  });
};

const userMovieSuccess = (state, action) => {
  return updateObject(state, {
    isFetching: false,
    error: null,
    userMovies: action.movie,
    userAction: action.username
  });
};

const userMovieFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_MOVIE_ACTION:
      return userMovieAction(state, action);
    case actionTypes.USER_MOVIE_REMOVE:
      return userMovieRemove(state, action);
    case actionTypes.USER_MOVIE_SUCCESS:
      return userMovieSuccess(state, action);
    case actionTypes.USER_MOVIE_FAIL:
      return userMovieFail(state, action);

    default:
      return state;
  }
};

export default reducer;
