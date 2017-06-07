/*
  authenticate using FBSDK
*/
import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
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

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(!!user) this.loginSuccess(user);
    });
  }

  loginSuccess(user) {
    this.props.actions.login(user);
  }

  onPress() {
    !!this.props.loggedIn ? this.logOut() : this.facebookLogin();
  }

  facebookLogin () {
    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends', 'user_events', 'user_photos']).then((result) => {
        if (result.isCancelled) {
          console.log('Login cancelled')
        } else {
          AccessToken.getCurrentAccessToken().then((accessTokenData) => {
            const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken);
            firebase.auth().signInWithCredential(credential).then((user) => {
                // console.log('USER=====>', user);
                this.loginSuccess(user);
            }, (error => {
              console.log('error', error);
            }));
          }, (error) => {
            console.log('Login error: ' + error);
          });

        }
      },
      (error) => {
        console.log('Login fail with error: ' + error);
      }
    )
  }

  logOut () {
    firebase.auth().signOut().then(() => {
      this.props.actions.logOut();
    }).catch((error) => {
      alert('Something went wrong. Please try again.', error);
    });
  }

  render () {
    const text = this.props.loggedIn ? `Logged in as ${this.props.userName}` : 'Continue with Facebook';

    return (
      <TouchableHighlight
        style={styles.container}
        onPress={this.onPress}>
        <View style={styles.button}>
          <Icon
            style={styles.icon}
            name="facebook"
            type='font-awesome'
            size={20}
            color="white"
          />
          <View style={styles.divider} />
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      </TouchableHighlight>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    height: 50,
    marginBottom: 13,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 300,
    backgroundColor: 'rgb(66,93,174)',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgb(66,93,174)',
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
    color: 'rgb(255,255,255)',
    fontWeight: '600',
    fontFamily: 'Helvetica neue',
    fontSize: 15,
  },
  divider: buttonDivider('rgba(255,255,255, .3)'),
  icon: buttonIcon,
});

Login.propTypes = {
  actions: PropTypes.object,
  loggedIn: PropTypes.bool,
  userName: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.isLoggedIn,
    userName: state.user.name,
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(userActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
