import React, {
    Component
} from "react";

import {
    AppRegistry,
    ActivityIndicator,
    AsyncStorage,
    StyleSheet,
    Text,
    View,
    ToolbarAndroid
} from "react-native";

import styles from "./styles/common-styles.js";
import Header from "./components/header"
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup"
import Account from "./pages/account";
import * as firebase from 'firebase';  // Initialize Firebase
var firebaseConfig = require ('./firebaseData.json');
import NavigationExperimental from 'react-native-deprecated-custom-components';

  // firebase.initializeApp(fireBaseconfig);
const firebaseApp = firebase.initializeApp(firebaseConfig);

var user;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      openingPage: null,
      loading: false
    };

  }
  componentWillMount(){
    //Check if userData is stored on device else open Login

    firebaseApp.auth().onAuthStateChanged((user) => {
      let openingPage = {openingPage: Login};
      if(user != null){
        this.user = user;
        this.setState({openingPage:Account});
      }else{
        this.setState(openingPage);
      }
    });
  }

  static renderScene(route, navigator) {

    if(route.component){
              // Pass the navigator the the page so it can navigate as well.
              // Pass firebaseApp so it can make calls to firebase.
              return React.createElement(route.component, { navigator, firebaseApp, user});
    }
  }

  static configureScene(route) {

    if (route.sceneConfig) {
      return (route.sceneConfig);
    } else {
      return ({
        ...NavigationExperimental.Navigator.SceneConfigs.HorizontalSwipeJump,
        gestures: {}
      });
    }

  }

  render() {
    if (this.state.openingPage) {
      return (
          <NavigationExperimental.Navigator
              initialRoute={{component: this.state.openingPage}}
              renderScene={App.renderScene}
              configureScene={App.configureScene}
          />);
    } else {
      return (
        // Our default loading view while waiting to hear back from firebase
       <View style={styles.container}>
         <ToolbarAndroid title="Login" />
         <View style={styles.body}>
           <ActivityIndicator size="large" />
         </View>
       </View>
     );
   }
 }
}
AppRegistry.registerComponent('app', () => APP);
export default App;
