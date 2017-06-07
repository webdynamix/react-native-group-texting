import { combineReducers } from 'redux';

import app from './app';
import groups from './groups';
import user from './user';
import nav from './nav';
import groupsNav from './groupsNav';
import auth from './auth';

const reducers = combineReducers({
  app,
  groups,
  user,
  nav,
  groupsNav,
  auth,
});

export default reducers;
