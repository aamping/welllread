'use strict';

import React, {
  Component
} from 'react';

import {
  AppRegistry,
  Text,
  TextInput,
  View
} from 'react-native';

import DismissKeyboard from 'react-native-dismiss-keyboard';

import Button from '../components/button';
import Header from '../components/header';

import Login from './login';

const firebaseApp = require('firebase');

import styles from '../styles/common-styles.js';

export default class signup extends Component {

  constructor(props){
    super(props);

    this.state = {
      loaded: true,
      email: '',
      password: '',
      response: ''
    };
  }

  async signup() {
         this.setState({
               loaded: false
         });

         DismissKeyboard();

         try {
             await firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

             this.setState({
                 response: "account created"
             });

             setTimeout(() => {
                 this.props.navigator.push({
                     name: "Home"
                 })
             }, 1500);

         } catch (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode == 'auth/weak-password') {
               alert('The password is too weak.');
              } else {
               alert(errorMessage);
              }
         }
         this.setState({
             email: '',
             password: '',
             loaded: true
         });

     }

  goToLogin(){
    this.props.navigator.push({
        name: "Login"
    })
  }

  render() {
    return (

      <View style={styles.container}>
        <Header text="Signup" loaded={this.state.loaded} />
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
            text="Signup"
            onpress={this.signup.bind(this)}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text} />

          <Button
            text="Got an Account?"
            onpress={this.goToLogin.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />
      </View>
    );
  }
}

AppRegistry.registerComponent('signup', () => signup);
