import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  isFeching: false,
  next: null,
  previous: null,
  total_page: null,
  current_page: null,
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
  console.log('#################################################', action);
  return updateObject(state, {
    movies: action.movies,
    isFeching: false,
    next: action.links.next,
    previous: action.link.previous,
    total_page: action.page_number,
    current_page: null,
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
