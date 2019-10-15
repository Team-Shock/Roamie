import { PostgresWrapper } from '../../postgres/postgres';

//ACTION TYPES

const GOT_CURRENT_TRIP = 'GOT_CURRENT_TRIP';
const STARTED_TRIP = 'STARTED_TRIP';
//INITIAL STATE
const initialState = {};

//ACTION CREATORS
const gotCurrentTrip = trip => ({ type: GOT_CURRENT_TRIP, trip });
const startedTrip = trip => ({ type: STARTED_TRIP, trip });

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
    let res = await instance.post(`/api/trips/${userId}`, {
      location,
    });

    dispatch(startedTrip(res.data));
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
      console.log('TRIP RETURNED FROM REDUCER:', action.trip);
      return action.trip;
    default:
      return state;
  }
};

export default currentTrip;
