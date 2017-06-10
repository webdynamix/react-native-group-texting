/*
  #! Group details view with a list of group contacts and search filtering
     Each contact has a list of selectable phone numbers
  todo: * Make search filtering work
        * Move Modal to it's own Component
        * Move renderRow to it's own Component
*/
import React, { PropTypes, Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as groupsActions from '../actions/groups';
import _ from 'lodash';
import {
  StyleSheet, View, Text, TouchableOpacity, Modal, ListView, AsyncStorage,
} from 'react-native';

import Swipeout from 'react-native-swipeout'
import Search from 'react-native-search-box';
import Contacts from 'react-native-unified-contacts';

import { shadedOrange, red, orange, white, blue, disabledText } from '../constants/colors';
import { getContacts, getObjectFromArray, getObjectsIds } from '../helpers/library';
import { DeleteIcon, AddIcon, AddContactsIcon, PhoneTypeIcon } from './Icons';
import Separator from './Separator';
import ModalHeader from './ModalHeader';
import ContactsList from './ContactsList';

class Group extends Component {
  constructor(props) {
      super(props);

      this.ds = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      });

      this.state = {
        contacts: [],
        list: [],
        scrollEnabled: true,
        contactsModalVisible: false,
      }

      this.openContacsModal = this.openContacsModal.bind(this);
  }

  componentDidMount() {
    this.updateList();
    this.props.navigation.setParams({ handleAddToNewGroup: this.openContacsModal})
  }

  componentWillUpdate(nextProps) {
    const list = getObjectsIds(this.state.contacts);
    const nextList = getObjectsIds(nextProps.group.contacts);
    const equals = _.isEqual(list.sort(), nextList.sort());

    if(!equals) this.updateList();
  }

  storeGroups() {
    AsyncStorage.setItem('groups', JSON.stringify(this.props.myGroups));
  }

  updateList() {
    this.setState({
      list: this.props.group.contacts,
      contacts: getContacts(this.props.group.contacts, this.props.contacts),
    });
    this.storeGroups();
  }

  openContacsModal() {
    this.setState({
      contactsModalVisible: true,
    });
  }

  onUpdateGroup() {
    this.storeGroups();
    this.closeContactsModal();
  }

  cancelContactsModal() {
    this.closeContactsModal();
  }

  closeContactsModal() {
    this.setState({
      contactsModalVisible: false,
    });
  }

  setSearchText() {
    // todo: setup on search text change
  }

  scrollEnabled(enabled) {
    this.setState({ scrollEnabled: enabled })
  }

  removeContactFromGroup(contact) {
    // todo: remove a contact fromgroup
  }

  numberSelect(contactId, digits, selected) {
    const contact = getObjectFromArray(contactId, this.props.group.contacts);
    const callList = contact.selectedNumbers;
    const index = callList.indexOf(digits);
    const exists = index > -1;

    if(!selected && !exists) callList.push(digits);
    if(!!selected && !!exists) callList.splice(index, 1);

    this.props.actions.updateGroupContactNumbers(this.props.group.id, {
      contactId: contactId,
      selectedNumbers: callList,
    });
  }

  isNumberSelected(contactId, digits) {
    const obj = getObjectFromArray(contactId, this.props.group.contacts);
    const list = !!obj && obj.hasOwnProperty('selectedNumbers') ? obj.selectedNumbers : [];

    return list.indexOf(digits) > -1;
  }

  numberItem(contactId, number, key) {
    const selected = this.isNumberSelected(contactId, number.digits);
    let color = disabledText;
    if(!!selected) color = blue;

    return (
      <TouchableOpacity
        key={key}
        style={styles.numberRowButton}
        onPress={this.numberSelect.bind(this, contactId, number.digits, selected)}>
        <View style={styles.numberWrap}>
          <Text style={[styles.numberDigits, !!selected && styles.numberDigitsActive ]}>{number.stringValue}</Text>
          <Text style={styles.numberLabel}>{number.label}</Text>
        </View>
        <PhoneTypeIcon type={number.localizedLabel} color={color} />
      </TouchableOpacity>
    );
  }

  contactNumbers(contactId, numbers) {
    const list = [];

    numbers.forEach((number, key) => {
      list.push(this.numberItem(contactId, number, key))
    });

    return list;
  }

  renderRow(rowData) {
    // todo: move to it's own component
    let swipeBtns = [{
      text: 'Delete',
      component: <DeleteIcon />,
      backgroundColor: red,
      underlayColor: 'rgba(0, 0, 0, 0.6)',
      onPress: () => { this.removeContactFromGroup(rowData) }
    }];

    return (
      <Swipeout right={swipeBtns}
        autoClose={true}
        scroll={(enabled) => {this.scrollEnabled(enabled)}}
        backgroundColor= 'transparent'>
        <View>
          <View style={styles.rowContainer}>
            <View style={styles.circle}>
              <Text style={styles.circleText}>A</Text>
            </View>
            <View style={styles.rowTitle}>
              <Text style={styles.rowTitleText}>{rowData.name}</Text>
              { this.contactNumbers(rowData.id, rowData.numbers) }
            </View>
          </View>
          <Separator />
        </View>
      </Swipeout>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>{this.props.group.name} {this.props.group.contacts.length}</Text>
        </View>
        <Search
          ref='searchBar'
          placeholder='Search'
          text={this.state.searchText}
          onChangeText={this.setSearchText.bind(this)}
          backgroundColor={shadedOrange}
        />
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.contactsModalVisible}
          >
          <View>
            <ModalHeader
              title="Add Contacts"
              onModalClose={this.cancelContactsModal.bind(this)}
              cta={true}
              onCTA={this.onUpdateGroup.bind(this)}
            />
          </View>
          <ContactsList groupId={this.props.group.id} />
        </Modal>
        <ListView
          scrollEnabled={this.state.scrollEnabled}
          enableEmptySections={true}
          dataSource={this.ds.cloneWithRows(this.state.contacts)}
          renderRow={this.renderRow.bind(this)}
          removeClippedSubviews={false}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 0,
    height: 590,
  },
  header: {
    alignItems: 'center',
    backgroundColor: shadedOrange,
    paddingTop: 7,
    paddingBottom: 2,
  },
  headerText: {
    color: white,
  },
  rowContainer: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 13,
    paddingRight: 15,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  rowTitle: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  rowTitleText: {
    fontSize: 18,
    marginBottom: 3,
  },
  numberRowButton: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 2,
    paddingBottom: 2,
  },
  numberWrap: {
    flex: 1,
    flexDirection: 'row',
  },
  numberDigits: {
    color: disabledText,
    fontSize: 12,
    width: 110,
  },
  numberDigitsActive: {
    color: blue,
  },
  numberLabel: {
    color: disabledText,
    fontSize: 12,
  },
  searchBar: {
    paddingLeft: 30,
    fontSize: 22,
    height: 10,
    flex: .1,
    borderWidth: 5,
    borderColor: '#CCC',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 40/2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    marginLeft: 15,
  },
  circleText: {
  }
});

Group.navigationOptions = (props) => {
  const { navigation } = props;
  return {
    title: 'Group Details',
    headerBackTitle: null,
    headerRight: <TouchableOpacity
    onPress={() => {
      navigation.state.params.handleAddToNewGroup();
    }}
    title="Add"><AddContactsIcon /></TouchableOpacity>
  }
};

Group.propTypes = {
  actions: PropTypes.object,
  group: PropTypes.object,
  myGroups: PropTypes.object,
  contacts: PropTypes.array,
  selectedContacts: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
  return {
    group: state.groups.mygroups[ownProps.navigation.state.params.id],
    myGroups: state.groups.mygroups,
    contacts: state.groups.contacts,
    selectedContacts: state.groups.selectedContacts,
    myKey: state.groups.key,
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(groupsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Group);
