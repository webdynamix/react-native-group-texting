import React from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { red, orange, white } from '../constants/colors';
import { STATUSBAR_HEIGHT, APPBAR_HEIGHT, TITLE_OFFSET, HEADER_TEXT_STYLE } from '../constants';
import { CloseIcon, CheckCTAIcon } from './Icons';


let styles = StyleSheet.create({
  container: {
    paddingTop:STATUSBAR_HEIGHT,
    height: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
    backgroundColor: orange,
    flexDirection: 'row',
    elevation: 4,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    fontSize: HEADER_TEXT_STYLE.fontSize,
    fontWeight: HEADER_TEXT_STYLE.fontWeight,
    textAlign: HEADER_TEXT_STYLE.textAlign,
    marginHorizontal: 16,
    flex: 1,
    bottom: 0,
    left: TITLE_OFFSET,
    right: TITLE_OFFSET,
    top: HEADER_TEXT_STYLE.top,
    position: 'absolute',
    alignItems: 'center',
    color: white,
  },
  cta: {
    right: 12,
    bottom: 0,
    top: 7,
    position: 'absolute',
  },
  close: {
    left: 12,
    bottom: 0,
    top: 7,
    position: 'absolute',
  }
});

const Separator = (props) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.close}
        onPress={props.onModalClose}>
        <CloseIcon />
      </TouchableOpacity>
      <Text
        style={styles.title}
        numberOfLines={1}
        accessibilityTraits="header"
      >{props.title}</Text>
      {!!props.cta &&
        <TouchableOpacity
          style={styles.cta}
          onPress={props.onCTA}>
          <CheckCTAIcon />
        </TouchableOpacity>
      }
    </View>
  </View>
);

export default Separator;
