import yelp from '../../server/api/yelp';
import { PostgresWrapper } from '../../postgres/postgres';

//Action Types

const GOT_OPTIONS = 'GOT_OPTIONS';
const ADD_TO_ROUTE = 'ADD_TO_ROUTE';

const initialState = [];

//Action Creators
const gotOptions = options => ({
  type: GOT_OPTIONS,
  options,
});
const addedToRoute = place => ({ type: ADD_TO_ROUTE, place });

//THUNK CREATORS
export const getOptions = (params, location) => async dispatch => {
  try {
    const { data } = await yelp.get('/search', {
      params: {
        latitude: location.latitude,
        longitude: location.longitude,
        term: params,
      },
    });
    dispatch(gotOptions(data));
  } catch (error) {
    console.error(error);
  }
};

export const addToRoute = (place, tripId) => async dispatch => {
  try {
    const instance = await PostgresWrapper.getInstance();
    const { data } = await instance.post(`/api/trips/places/${tripId}`, {
      place,
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

//REDUCER
const options = (state = initialState, action) => {
  switch (action.type) {
    case GOT_OPTIONS:
      return action.options;
    default:
      return state;
  }
};

export default options;
