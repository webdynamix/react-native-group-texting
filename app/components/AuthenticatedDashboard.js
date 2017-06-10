/*
  #! Sets up a view with bottom tabs navitagion for an authenticated users.
*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AuthButton from './AuthButton';
import { Tabs } from '../navigators/TabsNavigator';

const AuthenticatedDashboard = ({ isLoggedIn, dispatch }) => {
  if (!isLoggedIn) {
    return (
      <View>
        <Text>Please log in</Text>
        <AuthButton />
      </View>
    );
  }
  return <Tabs />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c00000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

AuthenticatedDashboard.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(AuthenticatedDashboard);
