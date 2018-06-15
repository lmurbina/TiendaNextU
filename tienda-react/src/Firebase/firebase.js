import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: "AIzaSyDBvR3WANsuSWLwcK7EbV1DXuE3xtOAWBA",
  authDomain: "tienda-react-481bf.firebaseapp.com",
  databaseURL: "https://tienda-react-481bf.firebaseio.com",
  projectId: "tienda-react-481bf",
  storageBucket: "tienda-react-481bf.appspot.com",
  messagingSenderId: "302154780767"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const db   = firebase.database();