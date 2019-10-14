import { PostgresWrapper } from "../../postgres/postgres";

/**
 * ACTION TYPES
 */
const GOT_TRIPS = "GOT_TRIPS";
const REMOVE_TRIP = "REMOVE_TRIP";
/**
 * INITIAL STATE
 */
const initialState = [];

/**
 * ACTION CREATORS
 */
const gotTrips = trips => ({ type: GOT_TRIPS, trips });
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

/**
 * REDUCER
 */
const trips = (state = initialState, action) => {
  switch (action.type) {
    case GOT_TRIPS:
      return action.trips
    // case REMOVE_TRIP:
    default:
      return state;
  }
};
export default trips;
