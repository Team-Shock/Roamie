import axios from "axios";

const defaultPreferences = [
  { id: 1, preference: "coffee" },
  { id: 2, preference: "brunch" },
  { id: 3, preference: "breakfast" },
  { id: 4, preference: "dinner" },
  { id: 5, preference: "$" },
  { id: 6, preference: "$$" },
  { id: 7, preference: "$$$" },
  { id: 8, preference: "family friendly" },
  { id: 9, preference: "dog friendly" },
  { id: 10, preference: "romantic" },
  { id: 11, preference: "laptop friendly" },
  { id: 12, preference: "indie" },
  { id: 13, preference: "local favorite" },
  { id: 14, preference: "ice cream" },
  { id: 15, preference: "scenic" },
  { id: 16, preference: "outdoorsy" }
];

// Action Types
const GOT_PREFERENCES = "GOT_PREFERENCES";

// Action Creators
const gotPreferences = prefs => ({
  type: GOT_PREFERENCES,
  prefs
});

// Thunk Creators
export const getPreferences = prefs => async dispatch => {
  dispatch(gotPreferences(prefs));
};
// Reducer
const preferences = (state = defaultPreferences, action) => {
  switch (action.type) {
    case GOT_PREFERENCES: {
      return defaultPreferences;
    }
    default: {
      return state;
    }
  }
};

export default preferences;
