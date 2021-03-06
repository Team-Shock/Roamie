import { PostgresWrapper } from '../../postgres/postgres';
import yelp from '../../server/api/yelp';

//ACTION TYPES

const GOT_CURRENT_TRIP = 'GOT_CURRENT_TRIP';
const STARTED_TRIP = 'STARTED_TRIP';
const ADDED_TO_ROUTE = 'ADDED_TO_ROUTE';
const GOT_OPTIONS = 'GOT_OPTIONS';
const SUBMITTED_FEEDBACK = 'SUBMITTED_FEEDBACK';
const ENDED_TRIP = 'ENDED_TRIP';

//INITIAL STATE
const initialState = {
  trip: {},
  route: [],
  currentLatLong: { latitude: 40.704385, longitude: -74.009806 },
  inTransit: false,
  options: [],
  currentPlace: {},
  lastPlaceId: null,
};

//ACTION CREATORS
const gotCurrentTrip = trip => ({ type: GOT_CURRENT_TRIP, trip });
const startedTrip = (trip, location) => ({
  type: STARTED_TRIP,
  trip,
  location,
});
const addedToRoute = (trip, place) => ({ type: ADDED_TO_ROUTE, trip, place });
const gotOptions = options => ({ type: GOT_OPTIONS, options });
const submittedFeedback = (placeId, feedback) => ({
  type: SUBMITTED_FEEDBACK,
  placeId,
  feedback,
});
const endedTrip = () => ({ type: ENDED_TRIP });

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
    const { data } = await instance.post(`/api/trips/${userId}`, {
      location,
    });

    dispatch(startedTrip(data, location));
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
    dispatch(addedToRoute(data, place));
  } catch (error) {
    console.error(error);
  }
};

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

export const submitFeedback = (placeId, tripId, feedback) => async dispatch => {
  try {
    const instance = await PostgresWrapper.getInstance();
    const { data } = await instance.put(`/api/trips/${tripId}/${placeId}`, {
      feedback,
    });

    dispatch(submittedFeedback());
  } catch (error) {
    console.error(error);
  }
};

export const endTrip = tripId => async dispatch => {
  try {
  
    const instance = await PostgresWrapper.getInstance();
    const { data } = await instance.put(`api/trips/end/${tripId}`);
    dispatch(endedTrip());
  } catch (error) {
    console.error(error);
  }
};

//REDUCER

const currentTrip = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CURRENT_TRIP:
      return { ...state, trip: action.trip };
    case STARTED_TRIP:
      return {
        ...state,
        trip: action.trip,
        currentLatLong: action.location,
        route: [...state.route, action.location],
      };
    case GOT_OPTIONS:
      return { ...state, options: action.options };
    case SUBMITTED_FEEDBACK:
      return { ...state, inTransit: false };
    case ADDED_TO_ROUTE:
      return {
        ...state,
        trip: action.trip,
        options: [],
        currentLatLong: action.place.coordinates,
        inTransit: true,
        route: [...state.route, action.place.coordinates],
        currentPlace: action.place,
        lastPlaceId: action.trip.places[action.trip.places.length - 1].id,
      };
    case ENDED_TRIP:
      return initialState;
    default:
      return state;
  }
};

export default currentTrip;
