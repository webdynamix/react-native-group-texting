import * as types from '../actions/actionTypes';

const initialState = {
  title: 'Welcome to OneApp',
  videosUri: 'https://vimeo.com/mimison/videos',
  dashboardUri: 'https://www.vintagechurchla.com/',
};

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case types.UPDATE_TITLE:
      return {
        ...state,
      };
    default:
      return state;
  }
}
