/*
  Profile Screen. Currently renders a profile picture and FB Logout option.
*/
import React, { PropTypes, Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../actions/user';

import FbLogin from '../components/FbLogin';

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      picture: this.props.photo,
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={ require('../images/splash.jpg')} style={styles.backgroundImage}>
          <View style={styles.content}>
            <Image source={{ uri: this.state.picture}} style={styles.profileImage} />
            <FbLogin onLogOut={( {navigation} ) => navigation.dispatch({ type: 'Logout' })} />
          </View>
        </Image>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: 'white',
  },
});

Profile.propTypes = {
  actions: PropTypes.object,
  navigation: PropTypes.object,
  loggedIn: PropTypes.bool,
  userName: PropTypes.string,
  photo: PropTypes.string,
  picture: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    userName: state.user.displayName,
    photo: state.user.photo,
    picture: state.user.picture,
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(userActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
