import React from 'react';

import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

let styles = StyleSheet.create({
  separator: {
    height: 1,
    width: 400,
    backgroundColor: '#E0E0E0',
  },
});

const Separator = ({props}) => (
  <View style={styles.separator} />
);

export default Separator;
