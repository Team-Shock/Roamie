import { combineReducers } from 'redux';
import preferences from './preferences';
import user from './userReducer';
import trips from './tripsReducer';
// import options from './optionsReducer';
import currentTrip from './currentTrip';

const reducer = combineReducers({
  preferences,
  user,
  trips,
  currentTrip,
});

export default reducer;
