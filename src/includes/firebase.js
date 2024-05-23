import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/functions'
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'dashboard-d98c9.firebaseapp.com',
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
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
const functions = firebase.functions()
export { auth, db, usersCollection, firebase, realtimeDB, functions }
