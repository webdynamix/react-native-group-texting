/*
  #! not really a Splash Screen. This is a landing Screen width a
     background image and signup/login options.
  todo: create a separate constants file to configure
  colors, fonts, ...
*/
import React, { PropTypes } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import FbLogin from './FbLogin';

const Splash = ({ navigation }) => (
  <View style={styles.container}>
    <Image source={require('../images/splash3.jpg')} style={styles.backgroundImage}>
      <View style={styles.logoContainer}>
        <Image source={require('../images/oneapp.png')} style={styles.logo} />
      </View>
      <View style={styles.loginContainer}>
        <FbLogin onLoginSuccess={() => navigation.dispatch({ type: 'Login' })} />

        <Text style={styles.loginText}>Have an Account? Log In</Text>
      </View>
    </Image>
  </View>
);

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
    marginTop: 50,
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
    marginBottom: 50,
  },
});

export default Splash;
