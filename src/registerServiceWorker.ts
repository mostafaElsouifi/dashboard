import { registerSW } from 'virtual:pwa-register'

// Register the service worker
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
})
