import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Separator = ({props}) => (
  <View style={styles.separator} />
);

let styles = StyleSheet.create({
  separator: {
    height: 1,
    width: 400,
    backgroundColor: '#E0E0E0',
  },
});

export default Separator;
