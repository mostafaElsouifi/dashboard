import { defineStore } from 'pinia'
import { auth, usersCollection, firebase, functions } from '../includes/firebase'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY
const REGISTER_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`

interface UserState {
  userLoggedIn: boolean
  userName: string | null | undefined
  theme: string
  isAdmin: boolean
}
// enum UserRole {
//   Admin = 'admin',
//   User = 'user',
// }
interface AuthValues {
  email: string
  role: string
  password: string
  name: string
  id: string
  admin: boolean
  active: boolean
}

interface PersonalData {
  name: string
  password: string
  email: string
}
export default defineStore('user', {
  state: (): UserState => ({
    userLoggedIn: false,
    userName: null,
    theme: 'light',
    isAdmin: false,
  }),
  actions: {
    async register(values: AuthValues) {
      const userCred = await auth.createUserWithEmailAndPassword(values.email, values.password)
      usersCollection.doc(userCred.user?.uid).set({
        email: values.email,
        name: values.name,
        role: values.role,
        theme: this.theme,
      })
      await userCred?.user?.updateProfile({
        displayName: values.name,
      })
      this.userLoggedIn = true
    },
    // async addUser(values: AuthValues) {
    //   const userCred = await auth.createUserWithEmailAndPassword(values.email, values.password)
    //   usersCollection.doc(userCred.user?.uid).set({
    //     email: values.email,
    //     name: values.name,
    //     role: values.role,
    //     theme: this.theme,
    //   })
    //   await userCred?.user?.updateProfile({
    //     displayName: values.name,
    //   })
    // },
    async login(email: string, password: string) {
      const credential = await auth.signInWithEmailAndPassword(email, password)
      this.userLoggedIn = true
      const userData = await usersCollection.doc(credential?.user?.uid).get()
      this.userName = userData?.data()?.name
    },
    async signOut() {
      this.userName = ''
      await auth.signOut()
      this.userLoggedIn = false
    },

    async updatePersonalData(id: string, values: PersonalData) {
      const currentUser = auth.currentUser
      if (!currentUser || !currentUser.email) {
        throw new Error('User not authenticated or email is null/undefined')
      }
      const credential = firebase.auth.EmailAuthProvider.credential(currentUser.email, values.password)
      await auth.currentUser?.reauthenticateWithCredential(credential)

      await auth.currentUser?.verifyBeforeUpdateEmail(values.email)
      await auth.currentUser?.updateProfile({
        displayName: values.name,
      })
      await usersCollection.doc(id).update({ name: values.name, email: values.email })
    },

    async updateUserTheme(themeValue: string) {
      const currentUser = auth.currentUser
      if (!currentUser) return
      try {
        const userDoc = await usersCollection.doc(currentUser.uid).get()
        if (userDoc.exists) {
          await usersCollection.doc(currentUser.uid).update({ theme: themeValue })
        } else {
          await usersCollection.doc(currentUser.uid).set({ theme: themeValue })
        }
      } catch (error) {
        console.error('Error updating theme in database:', error)
      }
    },
    async getAllUsers() {
      try {
        const userDoc = await usersCollection.get()
        const data = userDoc.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        return data
      } catch (error) {
        console.error('Error updating theme in database:', error)
        return []
      }
    },
    async addUser(values: AuthValues) {
      try {
        let admin = false
        const response = await axios.post(REGISTER_URL, {
          email: values.email,
          password: values.password,
          returnSecureToken: false,
        })
        if (values.role === 'admin') admin = true
        usersCollection.doc(response.data.localId).set({
          email: values.email,
          name: values.name,
          role: values.role,
          theme: this.theme,
          admin: admin,
        })
        console.log('Successfully registered new user:', response.data)
        return response.data
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Axios-specific error handling
          console.error('Error registering new user:', error.response?.data || error.message)
        } else {
          // Generic error handling
          console.error('An unknown error occurred:', error)
        }
        throw error
      }
    },

    async deleteAccount() {
      try {
        const user = auth.currentUser
        user?.delete()
        const userDoc = usersCollection.doc(user?.uid)
        userDoc.delete()
      } catch (error) {
        console.log(error)
      }
    },
    // delete user unsing cloud functions
    async deleteUser(uid: string) {
      const deleteUser = functions.httpsCallable('deleteUser')

      deleteUser({ uidToDelete: uid })
        .then((result) => {
          console.log(result.data.message) // Output success message
        })
        .catch((error) => {
          console.error('Error deleting user:', error)
        })
    },
  },
})
