'use strict';

import React, {
  Component
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import DismissKeyboard from 'react-native-dismiss-keyboard';

import Button from '../components/button';
import Header from '../components/header';
import FireAuth from 'react-native-firebase-auth'; //https://github.com/SolidStateGroup/react-native-firebase-auth

import Signup from './signup';
import Account from './account';

const firebaseApp = require('firebase');
//import firebaseApp from '../firebase';

import styles from '../styles/common-styles.js';

export default class login extends Component {

  constructor(props){
    super(props);
    FireAuth.init();

    this.state = {
      email: '',
      password: '',
      response: "",
      loaded: true
    }
  }

  componentDidMount() {
  FireAuth.setup(this.onLogin, this.onUserChange, this.onLogout, this.emailVerified, this.onError);
  }


  render(){
    return (
      <View style={styles.container}>
        <Header text="Login" loaded={this.state.loaded} />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholder={"Email Address"}
          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password"}
          />

          <Button
            text="Login"
            onpress={this.login.bind(this)}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text} />

          <Button
            text="Facebook"
            onpress={this.loginFacebook.bind(this)}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text} />

            <Button
              text="Google"
              onpress={this.loginGoogle.bind(this)}
              button_styles={styles.primary_button}
              button_text_styles={styles.primary_button_text} />

          <Button
            text="New here?"
            onpress={this.goToSignup.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />

      </View>
    );
  }

  async login() {

        DismissKeyboard();

        try {
            await firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password);

            this.setState({
                response: "Logged In!",
                loaded: false
            });

            setTimeout(() => {
                this.props.navigator.push({
                    name: "Home"
                })
            }, 1500);

        } catch (error) {
            this.setState({
                response: error.toString()
            })
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
            } else {
              alert(errorMessage);
            }
        }

    }

  async loginFacebook(){
      await FireAuth.facebookLogin();
  }
  async loginGoogle(){
      await FireAuth.googleLogin();
  }

  goToSignup(){
    this.props.navigator.push({
        name: "Signup"
    })
  }

}

AppRegistry.registerComponent('login', () => login);
