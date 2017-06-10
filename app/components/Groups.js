/*
  #! This is the main Groups Screen with a list of saved groups
      and actions to add or edit groups
  todo: * Move renderRow to it's separate Component
        * Move Modal to it's separate Component
        * Move Search filtering to it's separate Component
*/
import React, { PropTypes, Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as groupsActions from '../actions/groups';
import _, { filter } from 'lodash';
import {
  StyleSheet, View, Text, Modal,
  TouchableHighlight, TouchableOpacity, ListView, AsyncStorage,
} from 'react-native';

import { Icon, Badge } from 'react-native-elements';
import Swipeout from 'react-native-swipeout'
import Search from 'react-native-search-box';

import { red, green, orange, shadedOrange, white } from '../constants/colors';
import { getContacts, getContactsNames, arrayOfObjects } from '../helpers/library';
import { filterSearchByName } from '../helpers/search';
import { sendMessage } from '../helpers/compose';
import ModalHeader from './ModalHeader';
import { DeleteIcon, TextIcon, AddIcon } from './Icons';
import Separator from './Separator';
import NewGroupForm from './NewGroupForm';

class Groups extends Component {
  constructor(props) {
      super(props);

      this.ds = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      });

      this.state = {
        loading: false,
        groups: [],
        searchText: '',
        page: 1,
        seed: 1,
        error: null,
        refreshing: false,
        modalVisible: false,
        scrollEnabled: false,
      }

      this.viewGroup = _.throttle(this.viewGroup, 2000, { 'trailing': false });

      this.openNewGroupModal = this.openNewGroupModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.scrollEnabled = this.scrollEnabled.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem('contacts').then((value) => {
      if (!!value) this.props.actions.contactsSync(JSON.parse(value));
    });

    AsyncStorage.getItem('groups').then((value) => {
      if (!!value) this.props.actions.groupsSync(JSON.parse(value));
    });

    this.props.navigation.setParams({ handleAddNewGroup: this.openNewGroupModal });
  }

  componentWillUpdate(nextProps) {
    const groups = arrayOfObjects(nextProps.myGroups);
    const equals = _.isEqual(groups.sort(), this.state.groups.sort());

    if(!equals){
      this.setState({
        groups
      });
      AsyncStorage.setItem('groups', JSON.stringify(nextProps.myGroups));
    }

  }

  viewGroup(group) {
    const { navigate } = this.props.navigation;
    navigate('ViewGroup', { name: group.name, id: group.id});
  }

  scrollEnabled(enabled) {
    this.setState({ scrollEnabled: enabled })
  }

  removeGroup(item) {
    this.props.actions.removeGroup(item.id);
  }

  sendMessge(item) {
    sendMessage(item.contacts);
  }

  contactsNames(list) {
    const names = getContactsNames(list, this.props.contacts, 4);
    return names.join(', ');
  }

  renderRow(rowData) {
    let swipeBtns = [{
      text: 'Delete',
      component: <DeleteIcon />,
      backgroundColor: red,
      underlayColor: 'rgba(0, 0, 0, 0.6)',
      onPress: () => { this.removeGroup(rowData) }
    }, {
      text: 'SMS',
      component: <TextIcon />,
      backgroundColor: green,
      underlayColor: 'rgba(0, 0, 0, 0.6)',
      onPress: () => { this.sendMessge(rowData) }
    }];

    return (
      <Swipeout right={swipeBtns}
        autoClose={true}
        scroll={(enabled) => {this.scrollEnabled(enabled)}}
        backgroundColor= 'transparent'>
        <TouchableHighlight
          underlayColor='rgba(192,192,192,0.6)'
          onPress={this.viewGroup.bind(this, rowData)} >
          <View>
            <View style={styles.rowContainer}>
              <View style={styles.rowTitle}>
                <Text style={styles.rowTitleText}>{rowData.name}</Text>
                <Text style={styles.rowTitleSubText} numberOfLines={1} ellipsizeMode="middle">{this.contactsNames(rowData.contacts)}</Text>
              </View>
              <Badge containerStyle={styles.badge} value={rowData.contacts.length} />
              <Icon
                style={styles.chevron}
                name="chevron-right"
                type="font-awesome"
                size={20}
                color="black"
              />
            </View>

            <Separator />
          </View>
        </TouchableHighlight>
      </Swipeout>
    );
  }

  setSearchText(value) {
    const originalData = this.props.myGroups;
    const searchText = value;
    this.setState({searchText});

    const filteredData = filterSearchByName(searchText, originalData);
    this.setState({
      groups: filteredData,
    });
  }

  openNewGroupModal() {
    this.props.actions.toggleNewGroupModal(true);
  }

  closeModal() {
    this.props.actions.toggleNewGroupModal(false);
  }

  render() {
    const { navigate } = this.props.navigation;

    let groups = arrayOfObjects(this.props.myGroups);
    if(!!this.state.filtering) groups = this.state.groups;

    return (
      <View style={styles.container} key={this.props.myKey}>
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
          visible={this.props.newGroupModalOpen}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <View>
            <ModalHeader
              title="New Group"
              onModalClose={this.closeModal}
            />

          </View>
          <NewGroupForm
            onGroupSave={this.closeModal}
           />
        </Modal>

        <ListView
          scrollEnabled={this.state.scrollEnabled}
          enableEmptySections={true}
          dataSource={this.ds.cloneWithRows(groups)}
          renderRow={this.renderRow.bind(this)}
          removeClippedSubviews={false}
          />

      </View>
    );
  }
}

Groups.navigationOptions = (props) => {
  const { navigation } = props;
  return {
    title: 'Groups',
    headerBackTitle: null,
    headerRight: <TouchableOpacity
    onPress={() => {
      navigation.state.params.handleAddNewGroup();
    } }
    title="Add"><AddIcon /></TouchableOpacity>
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 0,
    height: 590,
  },
  rowContainer: {
    flex: 1,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  rowTitle: {
    flex: 1,
    paddingLeft: 15,
    height: 70,
    justifyContent: 'center',
  },
  rowTitleText: {
    fontSize: 18,
  },
  rowTitleSubText: {
    color: '#999',
    fontSize: 12,
    marginRight: 30,
  },
  chevron: {
    alignSelf: 'center',
    marginTop: 10,
    width: 30,
    height: 30,
  },
  badge: {
    marginRight: 20,
  }
});

Groups.propTypes = {
  actions: PropTypes.object,
  myGroups: PropTypes.object,
  newGroupModalOpen: PropTypes.bool,
  contacts: PropTypes.array,
  myKey: PropTypes.number,
}

const mapStateToProps = (state) => {
  return {
    myGroups: state.groups.mygroups,
    newGroupModalOpen: state.groups.newGroupModalOpen,
    contacts: state.groups.contacts,
    myKey: state.groups.key,
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(groupsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Groups);
