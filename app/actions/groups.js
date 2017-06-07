import * as types from './actionTypes';

export function toggleNewGroupModal(value) {
  return (dispatch) => {
    dispatch({
      type: 'NEW_GROUP_MODAL_OPEN',
      value,
    });
  };
}

export function selectedContacts(payload) {
  return (dispatch) => {
    dispatch({
      type: 'NEW_SELECTED_CONTACTS',
      payload,
    });
  };
}

export function contactsSync(payload) {
  return (dispatch) => {
    dispatch({
      type: 'CONTACTS_SYNC',
      payload,
    });
  };
}

export function groupsSync(payload) {
  return (dispatch) => {
    dispatch({
      type: 'GROUPS_SYNC',
      payload,
    });
  };
}

export function saveNewGroup(payload) {
  console.log('saveNewGroup', payload);
  return (dispatch) => {
    dispatch({
      type: 'ADD_NEW_GROUP',
      payload,
    });
  };
}

export function updateGroupContacts(id, payload) {
  return (dispatch) => {
    dispatch({
      type: 'GROUP_CONTACTS_CHANGED',
      id,
      payload,
    });
  };
}

export function updateGroupContactNumbers(id, payload) {
  console.log('updateGroupContacts', id, payload)
  return (dispatch) => {
    dispatch({
      type: 'GROUP_CONTACT_NUMBERS_CHANGED',
      id,
      payload,
    });
  };
}

export function removeGroup(value) {
  return (dispatch) => {
    dispatch({
      type: 'REMOVE_GROUP',
      value,
    });
  };
}
