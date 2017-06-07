/*
  Email login button.
  Todo: Make functional
*/
import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import firebase from "firebase";
import * as userActions from '../actions/user';
import { buttonDivider, buttonIcon } from  '../stylesheets/form';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

class Login extends Component {

  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    alert('Sign up with Facebook');
  }

  render () {

    return (
      <TouchableHighlight
        style={styles.container}
        onPress={this.onPress}>
        <View style={styles.button}>
          <Icon
            style={styles.icon}
            name="envelope-o"
            type='font-awesome'
            size={20}
            color="#555"
          />
          <View style={styles.divider} />
          <Text style={styles.buttonText}>Sign up using email</Text>
        </View>
      </TouchableHighlight>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    height: 50,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 300,
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgb(255,255,255)',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },
  buttonText: {
    flex: 4,
    color: '#333',
    fontWeight: '600',
    fontFamily: 'Helvetica neue',
    fontSize: 15,
  },
  divider: buttonDivider('rgba(0,0,0, .3)'),
  icon: buttonIcon,
});

Login.propTypes = {
  actions: PropTypes.object,
  loggedIn: PropTypes.bool,
  userName: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    userName: state.user.displayName,
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(userActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
