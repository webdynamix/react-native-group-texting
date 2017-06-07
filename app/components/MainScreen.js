/*
  wraps authenticated dashboard view
  todo: use AuthenticatedDashboard in AppNavigator and
        avoid using this wrapper
*/
import React from 'react';
import AuthenticatedDashboard from './AuthenticatedDashboard';

const MainScreen = () => (
  <AuthenticatedDashboard />
);

// removes that nasty header space
MainScreen.navigationOptions = {
  header: null
}

export default MainScreen;
