import { PostgresWrapper } from '../../postgres/postgres';

//ACTION TYPES

const GOT_CURRENT_TRIP = 'GOT_CURRENT_TRIP';
const STARTED_TRIP = 'STARTED_TRIP';
const ADDED_TO_ROUTE = 'ADDED_TO_ROUTE';

//INITIAL STATE
const initialState = {};

//ACTION CREATORS
const gotCurrentTrip = trip => ({ type: GOT_CURRENT_TRIP, trip });
const startedTrip = trip => ({ type: STARTED_TRIP, trip });
const addedToRoute = trip => ({ type: ADDED_TO_ROUTE, trip });

//THUNK CREATORS

export const getCurrentTrip = userId => async dispatch => {
  try {
    const instance = await PostgresWrapper.getInstance();
    const res = instance.get(`/api/trips/${userId}/current`);

    dispatch(gotCurrentTrip(res.data));
  } catch (error) {
    console.error(error);
  }
};

export const startTrip = (userId, location) => async dispatch => {
  try {
    const instance = await PostgresWrapper.getInstance();
    const res = await instance.post(`/api/trips/${userId}`, {
      location,
    });

    dispatch(startedTrip(res.data));
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
    dispatch(addedToRoute(data));
  } catch (error) {
    console.error(error);
  }
};

//REDUCER

const currentTrip = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CURRENT_TRIP:
      return action.trip;
    case STARTED_TRIP:
      return action.trip;
    case ADDED_TO_ROUTE:
      return action.trip;
    default:
      return state;
  }
};

export default currentTrip;
