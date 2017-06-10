import MessageCompose from 'react-native-message-compose';

const recipients = (contacts) => {
  const list = [];

  contacts.forEach((item) => {
    item.selectedNumbers.forEach((number) => {
      list.push(number);
    });
  });
  console.log('text recipients', list);
  return list;
}

export async function sendMessage(contacts) {
  try {
    const res = await MessageCompose.send({
      recipients: recipients(contacts),
      subject: 'SEND SMS',
      body: 'This ya\' down for tha weekend? :) ',
    });
  } catch (e) {
    // console.error('error', e);
  }
}
