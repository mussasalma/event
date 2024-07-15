// stores/summary.js
import { defineStore } from 'pinia'
import { ref, onValue } from 'firebase/database'
import { database } from '@/firebase/init'

export const useSummaryStore = defineStore('summary', {
  state: () => ({
    totalguests: 0,
    totalPresent: 0,
    totalAbsent: 0,
    guests: []
  }),
  getters: {
    getTotalguests: (state) => state.totalguests,
    getTotalPresent: (state) => state.totalPresent,
    getTotalAbsent: (state) => state.totalAbsent
  },
  actions: {
    fetchguests() {
      const guestsRef = ref(database, 'guest')
      onValue(guestsRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          this.guests = []
          let presentCount = 0
          let absentCount = 0
          for (const key in data) {
            const guestStatus = data[key].attendance || 'N/A'
            this.guests.push({
              id: key,
              name: data[key].name,
              Class: data[key].Class,
              status: guestStatus,
              timestamp: data[key].timestamp || 'N/A'
            })
            if (guestStatus === true) {
              presentCount++
            } else if (guestStatus === false) {
              absentCount++
            }
          }
          this.totalguests = this.guests.length
          this.totalPresent = presentCount
          this.totalAbsent = absentCount
        }
      })
    }
  }
})
