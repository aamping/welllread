'use strict';

import React, {
  Component
} from 'react';

import {
  AppRegistry,
  View,
  ToolbarAndroid,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import { Header,Title,Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';

import DismissKeyboard from 'react-native-dismiss-keyboard';

import Login from './login';

import styles from '../styles/common-styles.js';

export default class signup extends Component {

  constructor(props){
    super(props);

    this.state = {
      loading: false,
      email: '',
      password: '',
      response: ''
    };
  }

  async signup() {
         this.setState({
               loading: true
         });

         DismissKeyboard();

         try {
             await this.props.firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

             this.setState({
                 response: "account created",
                 loading: false
             });

             setTimeout(() => {
                 this.props.navigator.push({
                     component: Login
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
              this.setState({
                  response: "Error Signup",
                  loading: false
              });
         }


     }

  goToLogin(){
    this.props.navigator.push({
        name: "Login"
    })
  }
  render() {
    // The content of the screen should be inputs for a username, password and submit button.
    // If we are loading then we display an ActivityIndicator.
    const content = this.state.loading ? <ActivityIndicator size="large"/> :
           <Content>
                <List>
                 <ListItem>
                     <InputGroup>
                     <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                     <Input
                      onChangeText={(text) => this.setState({email: text})}
                      value={this.state.email}
                      placeholder={"Email Address"} />
                      </InputGroup>
                </ListItem>
                <ListItem>
                    <InputGroup>
                      <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
                    <Input
                      onChangeText={(text) => this.setState({password: text})}
                      value={this.state.password}
                      secureTextEntry={true}
                      placeholder={"Password"} />
                    </InputGroup>
               </ListItem>
              </List>
              <Button style={styles_primaryButton} onPress={this.signup.bind(this)}>
                <Text>
                Signup
                </Text>
              </Button>
              <Button onPress={this.goToLogin.bind(this)} style={styles_primaryButton}>
                <Text>
                Go to Login
                </Text>
              </Button>
      </Content>
    ;
    // A simple UI with a toolbar, and content below it.
        return (
                  <Container>
                  <Header>
                     <Title>Sign Up</Title>
                  </Header>
                  {content}
                  </Container>
                )
  }
}
const styles_primaryButton = StyleSheet.flatten(styles.primaryButton);

AppRegistry.registerComponent('signup', () => signup);
