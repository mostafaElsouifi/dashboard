import { defineStore } from 'pinia'
import { realtimeDB } from '../includes/firebase'

interface State {
  realtimeData: any
}

export default defineStore('database', {
  state: (): State => ({
    realtimeData: null,
  }),
  actions: {
    fetchRealtimeData(reference: string) {
      realtimeDB.ref(reference).on(
        'value',
        (snapshot) => {
          this.realtimeData = snapshot.val()
          console.log(snapshot.val())
        },
        (error) => {
          console.error('Error fetching Realtime Database data:', error)
        },
      )
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
