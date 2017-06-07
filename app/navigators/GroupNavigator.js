import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import { orange, white } from '../helpers/colors';

import GroupsScreen from '../components/Messaging';
import GroupDetailsScreen from '../components/GroupDetails';

export const AppNavigator = StackNavigator({
  Main: { screen: GroupsScreen },
  ViewGroup: { screen: GroupDetailsScreen },
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
