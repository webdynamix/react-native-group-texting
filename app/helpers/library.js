import { filter } from 'lodash';

export const arrayOfObjects = (objs) => {
  const list = [];
  for( const key in objs ) {
      list.push(objs[key]);
  }
  return list;
}

export const getObjectFromArray = (id, arr) => {
  return arr.filter((obj) => {
    return obj.id === id;
  })[0];
}

export const getContacts = (groupContacts, contactsArray) => {
  const contacts = [];
  groupContacts.forEach((contact) => {
    contacts.push(getObjectFromArray(contact.id, contactsArray));
  });

  return contacts;
}

export const getContactsNames = (groupContacts, contactsArray, limit = null) => {
  const contacts = [];
  groupContacts.forEach((contact, key) => {
    if (key < limit || !limit) contacts.push(getObjectFromArray(contact.id, contactsArray).name);
  });

  return contacts;
}

// const selectANumber = (obj) => {
//   obj.numbers.forEach((number, key) => {
//
//     switch (number.localizedLabel) {
//       case 'iPhone':
//         return number.identifier
//       default:
//
//     }
//   });
// }

export const getANumber = (id, allContacts) => {
  const obj = getObjectFromArray(id, allContacts);
  // const  numb ;
  //
  // if (obj.numbers.length === 1) {
  //   numb = obj.numbers[0].identifier
  // } else {
  //   numb = selectANumber(obj);
  // }
  return obj.numbers[0].digits;
}

export const groupContactsList = (list, allContacts) => {
  const contacts = [];
  list.forEach((id) => {
    contacts.push({
      id,
      selectedNumbers: [getANumber(id, allContacts)],
    });
  });

  return contacts;
}


export const getObjectsIds = (objs) => {
  const ids = [];
  objs.forEach((obj) => {
    ids.push(obj.id);
  });

  return ids;
}

export const objectLength = (obj) => {
  let count = 0
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) ++count;
  }
  return count;
}
