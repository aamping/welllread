'use strict';

import React, {
  Component
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';

import Login from './login';

import styles from '../styles/common-styles.js';

import firebaseApp from '../firebase';


export default class account extends Component {

  constructor(props){

    super(props);
    this.state = {
      loaded: false,
    }

  }

  componentWillMount(){

      this.setState({
        user: firebaseApp.auth().currentUser,
        loaded: true
      });

  }

  render(){

    return (
      <View style={styles.container}>
        <Header text="Account" loaded={this.state.loaded} />
        <View style={styles.body}>
        {
          this.state.user &&
            <View style={styles.body}>
              <View style={page_styles.email_container}>
                <Text style={page_styles.email_text}>{this.state.user.email}</Text>
              </View>
              <Image
                style={styles.image}
                source={{uri: this.state.user.password.photoURL}}
              />
              <Button
                  text="Logout"
                  onpress={this.logout.bind(this)}
                  button_styles={styles.primary_button}
                  button_text_styles={styles.primary_button_text} />
            </View>
        }
        </View>
      </View>
    );
  }

  logout(){

    firebaseApp.auth().signOut().then(function() {
      // Sign-out successful.
      this.props.navigator.push({
        component: Login
      });
    }).catch(function(error) {
      // An error happened.
      alert('error signout')
    });

  }

}

const page_styles = StyleSheet.create({
  email_container: {
    padding: 20
  },
  email_text: {
    fontSize: 18
  }
});

AppRegistry.registerComponent('account', () => account);
