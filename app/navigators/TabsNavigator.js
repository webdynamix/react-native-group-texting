import React, { PropTypes, Component } from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { StyleSheet, View, Text } from 'react-native';

import Profile from '../components/Profile';
import GroupNavigator from '../navigators/GroupNavigator';
import Messages from '../components/Messaging0';
import Media from '../components/Media';

const iconSize = 20;

export const Tabs = TabNavigator({
  Discover: {
    screen: GroupNavigator,
    navigationOptions: {
      tabBarLabel: 'Messaging',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="commenting-o"
          type='font-awesome'
          size={iconSize}
          color={tintColor}
        />
      ),
      header: null,
    },
    header: null
   },
  Media: {
    screen: Media,
    navigationOptions: {
      tabBarLabel: 'Media',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="tv"
          type='font-awesome'
          size={iconSize}
          color={tintColor}
        />
      )
    }
   },
   Messages: {
     screen: Messages,
     navigationOptions: {
       tabBarLabel: 'Messages',
       tabBarIcon: ({ tintColor }) => (
         <Icon
           name="comments-o"
           type='font-awesome'
           size={iconSize}
           color={tintColor}
         />
       )
     }
    },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="user-o"
          type="font-awesome"
          size={iconSize}
          color={tintColor}
        />
      )
    }
  },
});
