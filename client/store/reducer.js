import { combineReducers } from 'redux';
import preferences from './preferences';
import user from './userReducer';
import trips from './tripsReducer';
import options from './options-reducer';
import currentTrip from './currentTrip';

const reducer = combineReducers({
  preferences,
  user,
  trips,
  options,
  currentTrip,
});

export default reducer;
