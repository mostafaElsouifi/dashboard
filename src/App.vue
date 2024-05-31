<template>
  <!-- <div>
    <button v-if="deferredPrompt" @click="installApp">Install App</button>
  </div> -->
  <RouterView />
</template>

<script lang="ts" setup>
import { auth, usersCollection } from './includes/firebase'

import useUserStore from './stores/user.js'
//import { ref, } from 'vue'

//const deferredPrompt = ref<Event | null>(null)

// onMounted(() => {
//   window.addEventListener('beforeinstallprompt', (e: Event) => {
//     e.preventDefault()
//     deferredPrompt.value = e
//   })
// })

// const installApp = () => {
//   if (deferredPrompt.value) {
//     ;(deferredPrompt.value as any).prompt()
//     ;(deferredPrompt.value as any).userChoice.then((choiceResult: { outcome: string }) => {
//       if (choiceResult.outcome === 'accepted') {
//         console.log('User accepted the A2HS prompt')
//       } else {
//         console.log('User dismissed the A2HS prompt')
//       }
//       deferredPrompt.value = null
//     })
//   }
// }

const userStore = useUserStore()

const getUserData = async () => {
  if (auth.currentUser) {
    const userData = await usersCollection.doc(auth.currentUser.uid).get()
    userStore.userName = userData?.data()?.name.toUpperCase()
    userStore.isAdmin = userData?.data()?.admin
  }
}
getUserData()
</script>
<style lang="scss">
@import 'scss/main.scss';

#app {
  font-family: 'Inter', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  min-width: 20rem;
}
</style>
