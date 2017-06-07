import * as types from './actionTypes';

export function login(payload) {

  return (dispatch) => {
    dispatch({
      type: types.LOGIN,
      payload: payload,
    });
  };
}

export function logOut() {
  return (dispatch) => {
    dispatch({
      type: types.LOGOUT,
    })
  }
}

export function storePicture(uri) {
  return (dispatch) => {
    dispatch({
      type: types.PICTURE,
      value: uri,
    })
  }
}
