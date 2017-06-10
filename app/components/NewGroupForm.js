/*
  #! view with form to create new group.
  todo: Remove contacts modal and render ContactList inside
        this same view. No need to have a separate modal to add contacts.
*/
import React, { PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as groupsActions from '../actions/groups';
import { filter } from 'lodash';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';

import { orange } from '../constants/colors';
import { groupContactsList, arrayOfObjects } from '../helpers/library';
import ModalHeader from './ModalHeader';
import ContactsList from './ContactsList';

class NewGroup extends Component {
  constructor(props) {
      super(props);

      this.state = {
        contacts: [],
        name: '',
        disabledButton: true,
        contactsModalVisible: false,
      }

      this.groupNameUpdate = this.groupNameUpdate.bind(this);
      this.openContactsModal = this.openContactsModal.bind(this);
      this.closeContactsModal = this.closeContactsModal.bind(this);
      this.saveGroup = this.saveGroup.bind(this);
  }

  groupNameUpdate(value) {
    const disabledButton = value.length === 0 ? true : false;
    this.setState({
      name: value,
      disabledButton
    })
  }

  closeContactsModal() {
    this.setState({ contactsModalVisible: false });
  }

  openContactsModal() {
    this.setState({ contactsModalVisible: true });
  }

  saveGroup() {
    this.closeContactsModal();

    const date = new Date().toDateString();
    const all = arrayOfObjects(this.props.savedGroups);

    const id = !!all.length ? Number(all[all.length-1].id) + 1 : 1;

    this.props.actions.saveNewGroup({
      [id] : {
        id,
        name: this.state.name,
        contacts: groupContactsList(this.props.selectedContacts, this.props.contacts),
      }
    });

    setTimeout(() => {
      this.props.actions.toggleNewGroupModal(false);
    }, 200);
  }

  render() {

    return (
      <View style={styles.container}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.contactsModalVisible}
          >
          <View>
            <ModalHeader
              title="Add Contacts"
              onModalClose={this.closeContactsModal}
              cta={true}
              onCTA={this.saveGroup}
            />
          </View>
          <ContactsList />
        </Modal>
        <View>
          <FormLabel>Add a name for your group.</FormLabel>
          <View style={styles.spacer} />
          <FormInput
            placeholder="Name"
            value={this.state.name}
            onChangeText={this.groupNameUpdate}
          />
          <View style={styles.buttonContainer}>
            <Button
              large
              iconRight
              borderRadius={5}
              fontSize={16}
              fontWeight="600"
              disabled={this.state.disabledButton}
              icon={{name: 'user-plus', type: 'font-awesome'}}
              backgroundColor={orange}
              onPress={this.openContactsModal}
              title='ADD CONTACTS' />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
  },
  buttonContainer: {
    marginTop: 60,
    marginLeft: 30,
    marginRight: 30,
  },
  spacer: {
    height: 30,
  }
});

NewGroup.propTypes = {
  actions: PropTypes.object,
  newGroupModalOpen: PropTypes.bool,
  selectedContacts: PropTypes.array,
  savedGroups: PropTypes.object,
  contacts: PropTypes.array,
}

const mapStateToProps = (state) => {
  return {
    newGroupModalOpen: state.groups.newGroupModalOpen,
    selectedContacts: state.groups.selectedContacts,
    savedGroups: state.groups.mygroups,
    contacts: state.groups.contacts,
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(groupsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewGroup);
