/*
  This Component gets contacts from device and
  creates a grouped list with search filtering.
  Items in list are selectable.
*/
import React, { PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, Text, TouchableOpacity, ListView, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import AtoZListView from 'react-native-atoz-listview';
import Search from 'react-native-search-box';
import Contacts from 'react-native-unified-contacts';

import _, { filter } from 'lodash';
import * as groupsActions from '../actions/groups';
import { orange, shadedOrange } from '../helpers/colors';
import { LIST_STYLE } from '../helpers/constants';
import { listStyles } from '../stylesheets/list';
import { getObjectsIds, getANumber } from '../helpers/library';

class ContactsList extends Component {

  constructor(props) {
      super(props);

      this.state = {
        rawData: [],
        groupedContacts: {},
        selectedContacts: [],
      }

      this.ds = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      });

      this.renderRow = this.renderRow.bind(this);
      this.onSearchCancel = this.onSearchCancel.bind(this);
  }

  componentDidMount() {
    this.setState({
      fromGroup: !!this.props.group && this.props.group.hasOwnProperty('contacts')
    });

    this.accessContacts();
  }

  groupedContacts(contacts) {
    // Group list by Letter
    return _.groupBy(contacts, (contact) => {
      if (!!contact.name && !!contact.name[0]) return contact.name[0].toUpperCase();
      return {};
    });
  }

  contactsSync(contacts) {
    this.props.actions.contactsSync(contacts);
  }

  accessContacts() {
    const allContacts = [];

    Contacts.getContacts((error, contacts) => {
      if (error) {
        console.log('error', error);
      } else {
        contacts.forEach((contact, key) => {
          if (!!contact.hasOwnProperty('phoneNumbers')) {

            let selected = false;

            if (!!this.state.fromGroup && getObjectsIds(this.props.group.contacts).indexOf(contact.identifier) > -1) selected = true;

            allContacts.push({
              name: contact.fullName,
              numbers: contact.phoneNumbers,
              id: contact.identifier,
              key: key,
              selected: selected,
            });
          }
        });

        this.setState({
          rawData: allContacts,
          groupedContacts: allContacts
        });

        this.contactsSync(allContacts);
        AsyncStorage.setItem('contacts', JSON.stringify(allContacts));
      }
    });
  }

  toggleSelect(item) {

    const selected = !item.selected;

    let list = !!this.state.fromGroup ? getObjectsIds(this.props.group.contacts): this.props.selectedContacts;

    const rawData = this.state.rawData;
    const contacts = this.state.groupedContacts;
    const index = list.indexOf(item.id);
    const exists = index > -1;

    const contactInFilter = contacts.filter((obj) => {
      return obj.id === item.id;
    })[0];

    const contactInRawList = contacts.filter((obj) => {
      return obj.id === item.id;
    })[0];

    contactInFilter.selected = selected;
    contactInRawList.selected = selected;

    this.setState({
      rawData: rawData,
      groupedContacts: contacts,
    });

    if(!!this.state.fromGroup) {
      const groupContactsList = this.props.group.contacts;

      if(!!selected && !exists) groupContactsList.push({
        id: item.id,
        selectedNumbers: [getANumber(item.id, this.state.rawData)],
      });

      if(!selected && !!exists) groupContactsList.splice(index, 1);

      this.props.actions.updateGroupContacts(this.props.group.id, groupContactsList);
    } else {

      if(!!selected && !exists) list.push(item.id);
      if(!selected && !!exists) list.splice(index, 1);

      this.props.actions.selectedContacts(list);
    }

  }

  filterSearch(searchText, data) {
    const text = searchText.toLowerCase();
    return filter(data, (i) => {
      if(!!i.name) {
        const item = i.name.toLowerCase();

        return item.search(text) !== -1;
      }
    });
  }

  setSearchText(searchText) {
    this.setState({searchText});

    const filteredData = this.filterSearch(searchText, this.state.rawData);
    const contacts = filteredData;

    this.setState({
      groupedContacts: contacts,
    });
  }

  onSearchCancel() {
    this.setState({
      groupedContacts: this.state.rawData,
    })
  }

  onDelete() {
    // todo: setup delete action
  }

  renderRow(item, sectionId, index) {

    return (
      <View>
        <TouchableOpacity
          style={listStyles.row}
          onPress={() => this.toggleSelect(item)}
        >
          <Text style={listStyles.rowText}>
            {item.name}
          </Text>
          { !!item.selected &&
            <Icon
              style={listStyles.rightIcon}
              name="check-circle"
              type="font-awesome"
              size={30}
              color={orange}
            />
          }
        </TouchableOpacity>
      </View>
    );
  }

  render() {

    return (
      <View style={listStyles.container}>
        <Search
          ref="search_box"
          text={this.state.searchText}
          onChangeText={this.setSearchText.bind(this)}
          onCancel={this.onSearchCancel}
          onDelete={this.onSearchCancel}
          backgroundColor={shadedOrange}
        />
        <AtoZListView
          data={this.groupedContacts(this.state.groupedContacts)}
          renderRow={this.renderRow}
          rowHeight={LIST_STYLE.rowHeight}
          sectionHeaderHeight={180}
          style={listStyles.viewStyle}
          sectionListStyle={listStyles.sectionListStyle}
        />
      </View>
    );
  }
}

ContactsList.propTypes = {
  actions: PropTypes.object,
  group: PropTypes.object,
  selectedContacts: PropTypes.array,
}

const mapStateToProps = (state, ownProps) => {
  console.log('ownProps????', ownProps)
  return {
    group: state.groups.mygroups[ownProps.groupId],
    selectedContacts: state.groups.selectedContacts
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(groupsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContactsList);
