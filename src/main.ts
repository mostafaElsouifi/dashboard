import { createApp } from 'vue'
//import i18n from './i18n'
import { createVuestic } from 'vuestic-ui'
import { createGtm } from '@gtm-support/vue-gtm'

import stores from './stores'
import router from './router'
import vuesticGlobalConfig from './services/vuestic-ui/global-config'
import App from './App.vue'
import { auth } from './includes/firebase'

let app: any
auth.onAuthStateChanged(() => {
  if (!app) {
    if (import.meta.env.PROD) {
      navigator.serviceWorker.register('/sw.js')
    }
    let deferredPrompt: any

    // Add event listener for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (event) => {
      // Prevent the default browser prompt from appearing
      event.preventDefault()
      // Store the event for later use
      deferredPrompt = event
      // Optionally, you can show a custom install prompt to the user
    })

    // Later, when you want to show the prompt:
    // Show a button or other UI element to trigger the install prompt
    const button = document.getElementById('install-button')
    if (button) {
      button.addEventListener('click', () => {
        if (deferredPrompt) {
          // Show the browser's install prompt
          deferredPrompt.prompt()
        }
      })
    }
    app = createApp(App)
    app.use(stores)
    app.use(router)
    //app.use(i18n)
    app.use(createVuestic({ config: vuesticGlobalConfig }))

    if (import.meta.env.VITE_APP_GTM_ENABLED) {
      app.use(
        createGtm({
          id: import.meta.env.VITE_APP_GTM_KEY,
          debug: false,
          vueRouter: router,
        }),
      )
    }

    app.mount('#app')
  }
})
