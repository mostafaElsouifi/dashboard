<template>
  <div>
    <h1>Automation Systems</h1>
    <button v-if="deferredPrompt" @click="installApp">Install App</button>
  </div>
  <RouterView />
</template>

<script lang="ts" setup>
import { auth } from './includes/firebase'

import useUserStore from './stores/user.js'
import { ref, onMounted } from 'vue'

const deferredPrompt = ref<Event | null>(null)

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault()
    deferredPrompt.value = e
  })
})

const installApp = () => {
  if (deferredPrompt.value) {
    ;(deferredPrompt.value as any).prompt()
    ;(deferredPrompt.value as any).userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt')
      } else {
        console.log('User dismissed the A2HS prompt')
      }
      deferredPrompt.value = null
    })
  }
}

const userStore = useUserStore()

if (auth.currentUser) {
  userStore.userLoggedIn = true
  userStore.userName = auth.currentUser.displayName?.toUpperCase()
}
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
