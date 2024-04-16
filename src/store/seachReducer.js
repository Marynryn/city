// searchReducer.js

import {
  SEARCH_CITY_REQUEST,
  SEARCH_CITY_SUCCESS,
  SEARCH_CITY_FAILURE,
} from './searchActions';

// Начальное состояние хранилища
const initialState = {
  loading: false,
  error: null,
  farthestCity: null,
};

// Редуктор для обновления состояния хранилища
const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_CITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SEARCH_CITY_SUCCESS:
      return {
        ...state,
        loading: false,
        farthestCity: action.payload,
        error: null,
      };
    case SEARCH_CITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
