import firebase from 'firebase';

const fireApp = firebase.initializeApp({
  apiKey: "AIzaSyAZZfHcckxPJ4E24khdDn6gbG8Z_HcvS08",
  authDomain: "todo-app-b5af3.firebaseapp.com",
  projectId: "todo-app-b5af3",
  storageBucket: "todo-app-b5af3.appspot.com",
  messagingSenderId: "847552944140",
  appId: "1:847552944140:web:b1aabbd3c84df806a03629",
  measurementId: "G-GQWYRX8BVD"
});

const db = fireApp.firestore();

export default db;