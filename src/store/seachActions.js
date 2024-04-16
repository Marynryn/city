// searchActions.js

import axios from 'axios';

// Action Types
export const SEARCH_CITY_REQUEST = 'SEARCH_CITY_REQUEST';
export const SEARCH_CITY_SUCCESS = 'SEARCH_CITY_SUCCESS';
export const SEARCH_CITY_FAILURE = 'SEARCH_CITY_FAILURE';
const YOUR_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
// Action Creators
export const searchCityRequest = () => ({
  type: SEARCH_CITY_REQUEST,
});

export const searchCitySuccess = farthestCity => ({
  type: SEARCH_CITY_SUCCESS,
  payload: farthestCity,
});

export const searchCityFailure = error => ({
  type: SEARCH_CITY_FAILURE,
  payload: error,
});

// Async Action Creator
export const searchCity = query => {
  return async dispatch => {
    dispatch(searchCityRequest());
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${YOUR_API_KEY}`
      );
      const data = response.data;

      if (data.status === 'OK' && data.results.length > 0) {
        // Assume calculateDistance and findFarthestCity functions are defined elsewhere
        const citiesWithDistance = data.results.map(city => ({
          ...city,
          distance: calculateDistance(
            city.geometry.location.lat,
            city.geometry.location.lng
          ),
        }));

        const farthestCity = findFarthestCity(citiesWithDistance);
        dispatch(searchCitySuccess(farthestCity));
      } else {
        dispatch(searchCityFailure('No city found'));
      }
    } catch (error) {
      dispatch(searchCityFailure(error.message));
    }
  };
};

// Helper functions for calculating distance and finding farthest city
// You need to implement these functions according to your requirements
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // Implement your distance calculation logic here
};

const findFarthestCity = cities => {
  // Implement your logic to find the farthest city here
};
