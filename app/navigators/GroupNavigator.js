import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import { orange, white } from '../constants/colors';

import Groups from '../components/Groups';
import GroupDetails from '../components/GroupDetails';

export const AppNavigator = StackNavigator({
  Main: { screen: Groups },
  ViewGroup: { screen: GroupDetails },
}, {
  navigationOptions: {
    headerStyle: { backgroundColor: orange },
    headerTintColor: white,
  },
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator
    navigation={addNavigationHelpers({ dispatch, state: nav })}
  />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.groupsNav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
