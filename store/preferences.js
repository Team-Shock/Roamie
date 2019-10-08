import axios from "axios";

//These preferences could be default preferences in the models, in which case the getPreferences thunk would GET them from the database and the setPreferences would PUT/POST them there as well
const initialState = {
  preferences: [
    { id: 1, preference: "coffee", selected: true },
    { id: 2, preference: "brunch", selected: true },
    { id: 3, preference: "breakfast", selected: true },
    { id: 4, preference: "dinner", selected: true },
    { id: 5, preference: "$", selected: true },
    { id: 6, preference: "$$", selected: true },
    { id: 7, preference: "$$$", selected: true },
    { id: 8, preference: "family friendly", selected: true },
    { id: 9, preference: "dog friendly", selected: true },
    { id: 10, preference: "romantic", selected: true },
    { id: 11, preference: "laptop friendly", selected: true },
    { id: 12, preference: "indie", selected: true },
    { id: 13, preference: "local favorite", selected: true },
    { id: 14, preference: "ice cream", selected: true },
    { id: 15, preference: "scenic", selected: true },
    { id: 16, preference: "outdoorsy", selected: true }
  ]
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
export const getPreferences = prefs => async dispatch => {
  dispatch(gotPreferences(prefs));
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
