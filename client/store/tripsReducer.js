import { PostgresWrapper } from "../../postgres/postgres";
import user from "./userReducer";

/**
 * ACTION TYPES
 */
const GOT_TRIPS = "GOT_TRIPS";
const GOT_SELECTED_TRIP = "GOT_SELECTED_TRIP";
const REMOVE_TRIP = "REMOVE_TRIP";
const GOT_SELECTED_TRIP_NOTES = "GOT_SELECTED_TRIP_NOTES"
/**
 * INITIAL STATE
 */
const initialState = [
  allTrips =[],
  selectedTrip = {},
  notes = []
];

/**
 * ACTION CREATORS
 */
const gotTrips = trips => ({ type: GOT_TRIPS, trips });
const gotSelectedTrip = trip => ({ type: GOT_SELECTED_TRIP, trip });
const gotSelectedTripNotes = notes => ({ type: GOT_SELECTED_TRIP_NOTES, notes });

// const removedTrips = () => ({ type: REMOVED_TRIPS });

/**
 * THUNK CREATORS
 */
export const getTrips = (userId) => async dispatch => {
  try {
    const instance = await PostgresWrapper.getInstance();
    const res = await instance.get(`/api/trips/${userId}`);
    if(res.data){
        dispatch(gotTrips(res.data));
    }
    else{
        console.log("Unable to retrieve any trips")
    }
  } catch (err) {
    console.error(err);
  }
};

export const getSelectedTrip = (userId, tripId) => async dispatch => {
  try {
    const instance = await PostgresWrapper.getInstance();
    const res = await instance.get(`/api/trips/${userId}/${tripId}`);
    if(res.data){
        dispatch(gotSelectedTrip(res.data));
    }
    else{
        console.log("Unable to retrieve any trips")
    }
  } catch (err) {
    console.error(err);
  }
};

export const getSelectedTripNotes = (tripId) => async dispatch => {
  try {
    const instance = await PostgresWrapper.getInstance();
    const res = await instance.get(`/api/trips/places/${tripId}`);
    if(res.data){
        dispatch(gotSelectedTripNotes(res.data));
    }
    else{
        console.log("Unable to retrieve any trip notes")
    }
  } catch (err) {
    console.error(err);
  }
};


/**
 * REDUCER
 */
const trips = (state = initialState, action) => {
  switch (action.type) {
    case GOT_TRIPS:
      return {...state, allTrips: action.trips}
    // case REMOVE_TRIP:
    case GOT_SELECTED_TRIP:
      return {...state, selectedTrip: action.trip}
    case GOT_SELECTED_TRIP_NOTES:
      return {...state, selectedTripNotes: action.notes}
    default:
      return state;
  }
};
export default trips;
