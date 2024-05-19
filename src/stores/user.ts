import { defineStore } from 'pinia'
import { auth, usersCollection, firebase } from '../includes/firebase'
interface UserState {
  userLoggedIn: boolean
  userName: string | null | undefined
  theme: string
}

interface AuthValues {
  email: string
  password: string
  name: string
  id: string
}

// interface LoginValues {
//   email: string
//   password: string
// }

// interface UpdateValues {
//   email: string
//   password: string
//   name: string
// }

export default defineStore('user', {
  state: (): UserState => ({
    userLoggedIn: false,
    userName: null,
    theme: 'light',
  }),
  actions: {
    async register(values: AuthValues) {
      const userCred = await auth.createUserWithEmailAndPassword(values.email, values.password)
      usersCollection.doc(userCred.user?.uid).set({
        email: values.email,
        name: values.name,
        theme: this.theme,
      })
      await userCred?.user?.updateProfile({
        displayName: values.name,
      })
      this.userLoggedIn = true
    },

    async login(values: AuthValues) {
      await auth.signInWithEmailAndPassword(values.email, values.password)
      this.userLoggedIn = true
    },
    async signOut() {
      await auth.signOut()
      this.userLoggedIn = false
    },

    async updatePersonalData(id: string, values: AuthValues) {
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
  },
})
