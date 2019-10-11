import { PostgresWrapper } from "../../postgres/postgres";
import Axios from "axios";

/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
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
      email,
      password
    });
    dispatch(getUser(res));
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    // history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    let instance = await PostgresWrapper.getInstance();
    await instance.post("/auth/logout");
    dispatch(removeUser());
    // history.push('/login')
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
const user = (state = defaultUser, action) => {
  switch (action.type) {
    case GET_USER:
      console.log("ACTION.USER INSIDE REDUCER", action.user);
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
};
export default user;
