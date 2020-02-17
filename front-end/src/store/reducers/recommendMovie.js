import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  isFeching: false,
  movies: [],
  error: null
};

const getRecommendationStart = (state, action) => {
  return updateObject(state, {
    error: null,
    isFeching: true
  });
};

const getRecommendationSuccess = (state, action) => {
  return updateObject(state, {
    movies: action.movies,
    isFeching: false,
    error: null
  });
};

const getRecommendationFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    isFeching: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      
    case actionTypes.GET_RECOMMENDATION_START:
      return getRecommendationStart(state, action);
    case actionTypes.GET_RECOMMENDATION_SUCCESS:
      return getRecommendationSuccess(state, action);
    case actionTypes.GET_RECOMMENDATION_FAIL:
      return getRecommendationFail(state, action);

    default:
      return state;
  }
};

export default reducer;
