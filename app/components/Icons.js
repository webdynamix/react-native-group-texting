import React from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

import { Icon, TouchableHighlight } from 'react-native-elements';

import { white } from '../constants/colors';

const size = 25;
const dark = '#333333';

export const DeleteIcon = () => (
  <View style={styles.container}>
    <Icon
      name="trash-o"
      type="font-awesome"
      size={size}
      color={white}
    />
  </View>
);

export const TextIcon = () => (
  <View style={styles.container}>
    <Icon
      name="commenting-o"
      type="font-awesome"
      size={size}
      color={white}
    />
  </View>
);

export const AddIcon = () => (
  <View style={styles.headerIcon}>
    <Icon
      name="add"
      size={30}
      color={white}
    />
  </View>
);

export const AddContactsIcon = () => (
  <View style={styles.headerIcon}>
    <Icon
      name="group-add"
      size={30}
      color={white}
    />
  </View>
);

export const CloseIcon = () => (
  <View style={styles.headerIcon}>
    <Icon
      name="close"
      size={25}
      color={white}
    />
  </View>
);

export const CheckCTAIcon = () => (
  <View style={styles.headerIcon}>
    <Icon
      name="done"
      size={30}
      color={white}
    />
  </View>
);

export const PhoneTypeIcon = (props) => {
  let name = 'phone';
  switch (props.type) {
    case 'home':
      name = 'home';
      break;
    case 'work':
      name = 'location-city';
      break;
    case 'iPhone':
      name = 'phone-iphone';
      break;
    case 'mobile':
      name = 'smartphone';
      break;
    default:

  }
  return (
    <View style={styles.rightIcon}>
      <Icon
        name={name}
        size={15}
        color={props.color}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  headerIcon: {
    paddingRight: 20,
  },
  rightIcon: {
    alignSelf: 'flex-end',
  }
});
