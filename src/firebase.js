// import and configure firebase
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDiZRMOudXpDD9843IRzWYATdmcBy16I3k",
  authDomain: "wellread-42df8.firebaseapp.com",
  databaseURL: "https://wellread-42df8.firebaseio.com",
  projectId: "wellread-42df8",
  storageBucket: "wellread-42df8.appspot.com",
  messagingSenderId: "422230366379"
}


export const firebaseApp = firebase.initializeApp(firebaseConfig)
