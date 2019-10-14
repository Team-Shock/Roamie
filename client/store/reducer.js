import { combineReducers } from "redux";
import preferences from "./preferences";
import user from "./user-reducer";
import trips from "./tripsReducer"

const reducer = combineReducers({
  preferences,
  user,
  trips
});

export default reducer;
