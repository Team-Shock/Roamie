import { PostgresWrapper } from '../../postgres/postgres';
import Axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const SET_FIRSTTIMEVISIT = 'SET_FIRSTTIMEVISIT';
/**
 * INITIAL STATE
 */
const initialState = {};

/**
 * ACTION CREATORS
 */
const setFirstTimeVisitor = firstTime => ({
  type: SET_FIRSTTIMEVISIT,
  firstTime,
});
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const instance = await PostgresWrapper.getInstance();
    const res = await instance.get('http://172.16.26.140:8080/auth/me');
    dispatch(getUser(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method) => async dispatch => {
  let res;
  try {
    const instance = await PostgresWrapper.getInstance();
    res = await instance.post(`http://172.16.26.140:8080/auth/${method}`, {
      email,
      password,
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
    res = await instance.post(`http://172.16.26.140:8080/auth/oauth`, {
      name,
      email,
    });
    dispatch(getUser(res.data));
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }
};

export const logout = () => async dispatch => {
  try {
    let instance = await PostgresWrapper.getInstance();
    await instance.post('http://172.16.26.140:8080/auth/logout');
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
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return {};
    default:
      return state;
  }
};
export default user;
