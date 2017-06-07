import * as types from '../actions/actionTypes';

const initialState = {
  isLoggedIn: false
};

const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.LOGIN:
      return { ...state, isLoggedIn: true };
    case types.LOGOUT:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

export default auth;
