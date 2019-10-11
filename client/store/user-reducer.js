import { PostgresWrapper } from "../../postgres/postgres";
import Axios from "axios";

/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";
const SET_FIRSTTIMEVISIT = "SET_FIRSTTIMEVISIT"
/**
 * INITIAL STATE
 */
const initialState = {
  user: {},
  firstTime : false
};

/**
 * ACTION CREATORS
 */
const setFirstTimeVisitor = firstTime => ({type: SET_FIRSTTIMEVISIT, firstTime})
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const instance = await PostgresWrapper.getInstance();
    const res = await instance.get("/auth/me");
    dispatch(getUser(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method) => async dispatch => {
  let res;
  try {
    const instance = await PostgresWrapper.getInstance();
    res = await instance.post(`/auth/${method}`, {
      email,
      password
    });
    dispatch(getUser(res.data));
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }
};

export const oauth = (name, email) => async dispatch => {
  let res;
  try {
    const instance = await PostgresWrapper.getInstance();
    res = await instance.post(`/auth/oauth`, {
      name,
      email
    });
    dispatch(setFirstTimeVisitor(res.data.firstTime))
    dispatch(getUser(res.data.user))
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }
};

export const logout = () => async dispatch => {
  try {
    let instance = await PostgresWrapper.getInstance();
    await instance.post("/auth/logout");
    dispatch(removeUser());
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_FIRSTTIMEVISIT:
      return {...state,
        firstTime: action.firstTime};
    case GET_USER:
      return {...state, user: action.user};
    case REMOVE_USER:
      return {...state, user: {}};
    default:
      return state;
  }
};
export default user;
