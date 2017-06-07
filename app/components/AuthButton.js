/*
  #! email signin/signup not working yet
/*/
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from "firebase";

class AuthButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'me@test1.com',
      password: '123456',
    }
    this.signup = this.signup.bind(this);
  }

  async signup() {
        try {
            await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
            // this.setState({
            //     response: "account created"
            // });
            // setTimeout(() => {
            //     this.props.navigator.push({
            //         name: "Home"
            //     })
            // }, 1500);

        } catch (error) {
            // this.setState({
            //     response: error.toString()
            // })
        }

    }

  async login() {
    const email = 'me@me.com';
    const pass = '123';
      try {
          await firebase.auth().signInWithEmailAndPassword(email, pass);
      } catch (error) {
          // console.log(error.toString())
      }
  }

  render() {
    return (
      <Button
        title={this.props.isLoggedIn ? 'Log Out' : 'Log In'}
        onPress={this.signup}
      />
    )
  }
}

AuthButton.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: 'Logout' }),
  login: () => dispatch(NavigationActions.navigate({ routeName: 'Login' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
