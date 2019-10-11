import axios from "axios";
import { defaultPreferences } from "../../utils/defaultPreferences";
import Axios from "axios";

const initialState = {
  preferences: defaultPreferences
};

// Action Types
const GOT_PREFERENCES = "GOT_PREFERENCES";
const SET_PREFERENCES = "SET_PREFERENCES";

// Action Creators
const gotPreferences = prefs => ({
  type: GOT_PREFERENCES,
  prefs
});
const setThePreferences = preferences => ({
  type: SET_PREFERENCES,
  preferences
});

// Thunk Creators
export const getPreferences = id => async dispatch => {
  try {
    const { data } = await Axios.get(`/api/preferences/:id`);
    console.log("DATA FROM GETPREFERENCES THUNK", data);
    dispatch(gotPreferences(data));
  } catch (error) {
    console.log("There was an error getting preferences", error);
  }
};

export const setPreferences = preferences => async dispatch => {
  dispatch(setThePreferences(preferences));
  dispatch(gotPreferences(preferences));
};
// Reducer
const preferences = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PREFERENCES: {
      return state.preferences;
    }
    case SET_PREFERENCES: {
      return {
        ...state,
        preferences: action.preferences
      };
    }
    default: {
      return state;
    }
  }
};

export default preferences;
