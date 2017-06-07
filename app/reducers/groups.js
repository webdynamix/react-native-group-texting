import * as types from '../actions/actionTypes';
import { filter } from 'lodash';
import { AsyncStorage } from 'react-native';

const initialState = {
  title: 'Groups',
  newGroupModalOpen: false,
  contactsModalVisible: false,
  selectedContacts: [],
  newGroupModalTitle: 'New Group',
  contacts: [],
  mygroups: {},
  key: 0,
};

export default function groups(state = initialState, action = {}) {
  switch (action.type) {
    case 'NEW_GROUP_MODAL_OPEN':
      return {
        ...state,
        newGroupModalOpen: action.value
      };
    case 'CONTACTS_SYNC':
      return {
        ...state,
        contacts: action.payload
      };
    case 'GROUPS_SYNC':
      return {
        ...state,
        mygroups: action.payload
      };
    case 'NEW_SELECTED_CONTACTS':
      return {
        ...state,
        selectedContacts: action.payload
      };
    case 'ADD_NEW_GROUP':
      return {
        ...state,
        mygroups: Object.assign({}, state.mygroups, action.payload),
        selectedContacts: [],
      };
    case 'GROUP_CONTACTS_CHANGED':
      state.mygroups[action.id].contacts = action.payload

      return {
        ...state,
        key: !state.key,
      };
    case 'GROUP_CONTACT_NUMBERS_CHANGED':
      state.mygroups[action.id].contacts.map(contact =>
        contact.id === action.payload.contactId ? {...contact, selectedNumbers: action.payload.selectedNumbers} : contact
      );

      return {
        ...state,
        key: !state.key,
      };
    case 'REMOVE_GROUP':
      const mygroups = Object.assign({}, state.mygroups);
      delete mygroups[action.value];

      return {
        ...state,
        mygroups,
      };
    default:
      return state;
  }
}
