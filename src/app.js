import React, {
    Component
} from "react";

import {
    AppRegistry,
    Navigator,
    View
} from "react-native";

import styles from "./styles/common-styles.js";
import Header from "./components/header"
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup"
import Account from "./pages/account";
const firebaseApp = require('firebase');
import firebaseInit from './firebase';

class App extends Component {

  constructor(props) {
    super(props);

    this.getInitialView();

    this.state = {
      userLoaded: false,
      initialView: null,
      loaded: false
    };

    this.getInitialView = this.getInitialView.bind(this);

  }

  getInitialView() {

    firebaseApp.auth().onAuthStateChanged((user) => {

      if (user){
        alert('user signed in');
      }
      else{
        let initialView = user ? "Home" : "Login";
        alert('initialView');
        this.setState({
          userLoaded: true,
          initialView: initialView
        })
      }
    });


  }

  static renderScene(route, navigator) {

    switch (route.name) {

      case "Home":
        return (<Home navigator={navigator} />);
        break;

      case "Login":
        return (<Login navigator={navigator} />);
        break;

      case "Signup":
        return (<Signup navigator={navigator} />);
        break;

      case "Account":
        return (<Account navigator={navigator} />);
        break;
    }

  }

  static configureScene(route) {

    if (route.sceneConfig) {
      return (route.sceneConfig);
    } else {
      return ({
        ...Navigator.SceneConfigs.HorizontalSwipeJump,
        gestures: {}
      });
    }

  }

  render() {
    if (this.state.userLoaded) {
      return (
          <Navigator
              initialRoute={{name: this.state.initialView}}
              renderScene={App.renderScene}
              configureScene={App.configureScene}
          />);
    } else {
      return (
        <View style={styles.container}>
          <Header text="React Native Firebase Auth" loaded={this.state.loaded} />
          <View style={styles.body}></View>
        </View>);
    }

  }

}

export default App;
