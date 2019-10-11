import { combineReducers } from "redux";
import preferences from "./preferences";
import user from "./user-reducer";

const reducer = combineReducers({
  preferences,
  user
});

export default reducer;
