import axios from "axios";
import { defaultPreferences } from "../../utils/defaultPreferences";
import Axios from "axios";
import { PostgresWrapper } from "../../postgres/postgres";

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

//This currently isn't being called
export const getPreferences = id => async dispatch => {
  try {
    const { data } = await Axios.get(`/api/preferences/:id`);
    dispatch(gotPreferences(data));
  } catch (error) {
    console.log("There was an error getting preferences", error);
  }
};

export const setPreferences = (id, preferences) => async dispatch => {
  try {
    const instance = await PostgresWrapper.getInstance();
    const { data } = await instance.put(
      `/api/preferences/${id}/change`,
      preferences
    );
  } catch (error) {
    console.log("There was an error editing preferences", error);
  }
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
