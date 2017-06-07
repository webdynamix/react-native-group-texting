import React, { PropTypes } from 'react';
import {
  StyleSheet, Text, View, Image } from 'react-native';

import FbLogin from './FbLogin';
import EmailLogin from './EmailLogin';

const bgimage = '';

const LoginScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Image source={require('../images/splash3.jpg')} style={styles.backgroundImage}>
      <View style={styles.logoContainer}>
        <Image source={require('../images/oneapp.png')} style={styles.logo} />
      </View>
      <View style={styles.loginContainer}>
        <FbLogin />
        <EmailLogin />
        <Text style={styles.loginText} onPress={() => alert('Login with Facebook')}>Have an Account? Log In</Text>
      </View>
    </Image>
  </View>
);

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

LoginScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  loginText: {
    color: '#ffffff',
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: 20,
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  logo: {
    width: 255,
    height: 75,
  },
  loginContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default LoginScreen;
