'use strict';

import React, {
  Component
} from 'react';

import {
  AppRegistry,
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ToolbarAndroid
} from 'react-native';

import { Header,Container,Title, Content, List, ListItem, InputGroup, Input, Icon, Picker, Button } from 'native-base';

import Login from './login';

import styles from '../styles/common-styles.js';

const accountStyles = StyleSheet.create({
  email_container: {
    padding: 20
  },
  email_text: {
    fontSize: 18
  }
});


export default class account extends Component {

  constructor(props){

    super(props);
    this.state = {
      user: this.props.user,
      loading: true
    }

  }

  componentWillMount(){
      this.setState({
        //user: this.props.firebaseApp.auth().currentUser,
        loading: false
      });
  }

  async logout() {
    this.setState({
      loading: true
    });
    // logout, once that is complete, return the user to the login screen.
    try{
      await this.props.firebaseApp.auth().signOut();

      this.setState({
        response: "Logged out"
      });
        // Sign-out successful.
        setTimeout(() => {
            this.props.navigator.push({
                component: Login
            })
         }, 1500);

    }
    catch(error) {
      // An error happened.
      this.setState({
        loading: false,
        response: "Error Logged out"
      });
      alert ('signed out error', error);

    }
  }

  render() {
      // If we are loading then we display the indicator, if the account is null and we are not loading
      // Then we display nothing. If the account is not null then we display the account info.
      const content = this.state.loading ?
      <ActivityIndicator size="large"/> :
         this.state.user &&
                   <Content>
                      <View style={accountStyles.email_container}>
                        <Text style={accountStyles.email_text}>{this.state.user.email}</Text>
                      </View>
                      <Image
                        style={styles.image}
                        source={{uri: this.state.user.photoURL}} />
                      <Button onPress={this.logout.bind(this)} style={styles_primaryButton}>
                        <Text>
                        Logout
                        </Text>
                      </Button>
                  </Content>
        ;
        // console.log("loading user",this.state.user,this.state.loading);
      return (
          <Container>
          <Header>
              <Title>Header</Title>
          </Header>
            {content}
        </Container>
      );
    }

}

const styles_primaryButton = StyleSheet.flatten(styles.primaryButton);

AppRegistry.registerComponent('account', () => account);
