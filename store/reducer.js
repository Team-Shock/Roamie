import { combineReducers } from "redux";
import preferences from "./preferences";
import user from './user'

const reducer = combineReducers({
  preferences,
  user
});

export default reducer;
