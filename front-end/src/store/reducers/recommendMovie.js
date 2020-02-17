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
  const movies = action.movies
  console.log('#################################################', movies);

  return updateObject(state, {
    movies: movies.results,
    isFeching: false,
    next: movies.links ? movies.links.next : null,
    previous: movies.link ? movies.link.previous : null,
    total_page: movies.page_number ? movies.page_number : null,
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
