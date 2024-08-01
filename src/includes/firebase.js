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

const firebaseConfig2 = {
  apiKey: 'AIzaSyAMUZ2b3QR7dOzlmkTRK3o_J7E9RdSMgO0',
  authDomain: 'dashboard2-cb05d.firebaseapp.com',
  databaseURL: 'https://dashboard2-cb05d-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'dashboard2-cb05d',
  storageBucket: 'dashboard2-cb05d.appspot.com',
  messagingSenderId: '833042907538',
  appId: '1:833042907538:web:a088ed35906ddbc83fc14b',
}
// Initialize the first Firebase app if it hasn't been initialized yet
const firebaseApp1 = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

// Initialize the second Firebase app with a unique name if it hasn't been initialized yet
const firebaseApp2 = !firebase.apps.some((app) => app.name === 'secondaryApp')
  ? firebase.initializeApp(firebaseConfig2, 'secondaryApp')
  : firebase.app('secondaryApp')

const auth = firebaseApp1.auth()
const db = firebaseApp1.firestore()
const realtimeDB = firebaseApp1.database()
const realtimeDB2 = firebaseApp2.database()
const usersCollection = db.collection('users')
const functions = firebaseApp1.functions()

export { auth, db, usersCollection, firebase, realtimeDB, realtimeDB2, functions }
