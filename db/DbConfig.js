import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD5Ha8fSPEBkjqMchNVy8zU6vB-WvcGYTM",
    authDomain: "herkyles-85e8e.firebaseapp.com",
    databaseURL: "https://herkyles-85e8e.firebaseio.com",
    projectId: "herkyles-85e8e",
    storageBucket: "herkyles-85e8e.appspot.com",
    messagingSenderId: "812934741247"
}
export const firebaseApp = firebase.initializeApp(firebaseConfig); 
var databaseRef = firebase.database();