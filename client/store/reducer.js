import { combineReducers } from 'redux';
import preferences from './preferences';
import user from './user-reducer';
import trips from './trips-reducer';
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
