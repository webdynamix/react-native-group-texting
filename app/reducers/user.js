import * as types from '../actions/actionTypes';

const initialState = {
  name: '',
  photo: '',
  picture: '',
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        name: !!action.hasOwnProperty('payload') ? action.payload.displayName : '',
        photo: action.payload.photoURL,
      };
    case types.LOGOUT:
      return {
        ...state,
        name: '',
      }
    case types.PICTURE:
      return {
        ...state,
        picture: action.value,
      }
    default:
      return state;
  }
}
