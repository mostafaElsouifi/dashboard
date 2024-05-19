<template>
  <RouterView />
</template>

<script lang="ts" setup>
import { auth } from './includes/firebase'

import useUserStore from './stores/user.js'

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
