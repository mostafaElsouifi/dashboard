<template>
  <!-- <div>
    <button v-if="deferredPrompt" @click="installApp">Install App</button>
  </div> -->

  <!-- <div v-if="showInstallPrompt" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <p>Do you want to install this app?</p>
      <button @click="installApp">Install</button>
    </div>
    <div>
      <button @click="notify">Notify Me!</button>
    </div>
  </div> -->
  <RouterView />
</template>

<script lang="ts" setup>
import { auth, usersCollection } from './includes/firebase'

import useUserStore from './stores/user.js'
import { ref, onMounted } from 'vue'
//import { listenForNewData, requestNotificationPermission } from './notify'

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

const showInstallPrompt = ref(false)
let deferredPrompt: any

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
    deferredPrompt = event
    // Check if the user is on a mobile device
    let isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (isMobile) {
      showInstallPrompt.value = true
    }
    // Fallback for other browsers or if `beforeinstallprompt` is not triggered
    isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (isMobile && !deferredPrompt) {
      showInstallPrompt.value = true
    }
  })

  // requestNotificationPermission()
  // listenForNewData()
})

// const closeModal = () => {
//   showInstallPrompt.value = false
// }

// const installApp = async () => {
//   if (deferredPrompt) {
//     console.log('Prompting installation')
//     deferredPrompt.prompt()
//     const { outcome } = await deferredPrompt.userChoice
//     if (outcome === 'accepted') {
//       console.log('User accepted the install prompt')
//     } else {
//       console.log('User dismissed the install prompt')
//     }
//     deferredPrompt = null
//     showInstallPrompt.value = false
//   } else {
//     console.error('Deferred prompt not available')
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

// const notify = () => {
//   // Trigger a manual notification if needed
// }
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

/* Modal styles */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}

button {
  padding: 10px 20px;
  background-color: #154ec1;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
