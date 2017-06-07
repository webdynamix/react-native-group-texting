import { Platform } from 'react-native';

export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
export const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 40;

export const HEADER_TEXT_STYLE = {
  fontSize: Platform.OS === 'ios' ? 17 : 18,
  fontWeight: Platform.OS === 'ios' ? '600' : '500',
  textAlign: Platform.OS === 'ios' ? 'center' : 'left',
  top: 10,
}

export const LIST_STYLE = {
  rowHeight: 40,
};
