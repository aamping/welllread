'use strict';

import React, {
  Component
} from 'react';

import Button from '../components/button';

import styles from '../styles/common-styles.js';

import {
  View,
  AppRegistry,
  Text
} from 'react-native';

export default class home extends Component {
    render(){
      return(
        <View style={styles.body}>
        <Text>
          BLABLA
        </Text>
        <Button
          text="Account"
          onpress={this.goToAccount.bind(this)}
          button_styles={styles.transparent_button}
          button_text_styles={styles.transparent_button_text} />
          </View>
      )
    }
    goToAccount(){
      this.props.navigator.push({
          name: "Account"
      })
    }
}
AppRegistry.registerComponent('home', () => home);
