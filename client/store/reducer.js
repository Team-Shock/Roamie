import { combineReducers } from "redux";
import preferences from "./preferences";
import user from "./user-reducer";
import trips from "./trips-reducer"

const reducer = combineReducers({
  preferences,
  user,
  trips
});

export default reducer;
