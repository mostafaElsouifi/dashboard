import { defineStore } from 'pinia'
import { realtimeDB2 } from '../includes/firebase'

interface ActiveMachine {
  currentMachine: any
}

export default defineStore('database', {
  state: (): ActiveMachine => ({
    currentMachine: 1,
  }),
  actions: {
    async fetchRealtimeData(reference: string) {
      try {
        const snapshot = await realtimeDB2.ref(reference).once('value')
        return snapshot.val()
      } catch (error) {
        console.error('Error fetching Realtime Database data:', error)
        throw error
      }
    },
    updateCurrentMachine(newMachine: any) {
      this.currentMachine = newMachine
    },
    // updateRealtimeData(reference: string, data: any) {
    //     realtimeDB
    //     .ref(reference)
    //     .set(data)
    //     .catch((error) => {
    //       console.error('Error updating Realtime Database data:', error)
    //     })
    //},
  },
})
