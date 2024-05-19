import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
const firebaseConfig = {
  apiKey: 'AIzaSyCHH8lu5_5A0RYkI6n7iJL98X09QBIl0yc',
  authDomain: 'dashboard-d98c9.firebaseapp.com',
  databaseURL: 'https://dashboard-d98c9-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: 'dashboard-d98c9',
  storageBucket: 'dashboard-d98c9.appspot.com',
  messagingSenderId: '11902328956',
  appId: '1:11902328956:web:0f6a6f9b836651a11ca9f9',
}

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const db = firebase.firestore()
const realtimeDB = firebase.database()
const usersCollection = db.collection('users')
export { auth, db, usersCollection, firebase, realtimeDB }
