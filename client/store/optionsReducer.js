import yelp from '../../server/api/yelp';
import { PostgresWrapper } from '../../postgres/postgres';

//Action Types

const GOT_OPTIONS = 'GOT_OPTIONS';

const initialState = { options: [], nextPlace: {} };

//Action Creators
const gotOptions = options => ({
  type: GOT_OPTIONS,
  options,
});

//THUNK CREATORS
export const getOptions = (params, location) => async dispatch => {
  try {
    const { data } = await yelp.get('/search', {
      params: {
        latitude: location.latitude,
        longitude: location.longitude,
        term: params,
      },
    });
    dispatch(gotOptions(data));
  } catch (error) {
    console.error(error);
  }
};



//REDUCER
const options = (state = initialState, action) => {
  switch (action.type) {
    case GOT_OPTIONS:
      return { ...state, options: action.options };

    default:
      return state;
  }
};

export default options;
