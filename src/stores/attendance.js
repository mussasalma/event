// attendanceStore.js

import { defineStore } from 'pinia'
import { ref, set, onValue } from 'firebase/database'
import { database } from '@/firebase/init'

export const useAttendanceStore = defineStore('attendance', {
  state: () => ({
    attendanceData: []
  }),
  actions: {
    markAttendance(guestId) {
      const guestRef = ref(database, `guest/${guestId}`)

      // Listen for changes in the attendance boolean
      onValue(guestRef, (snapshot) => {
        const guest = snapshot.val()

        if (guest && guest.attendance === false) {
          // Update attendance to true and store timestamp
          set(guestRef, {
            ...guest,
            attendance: true,
            attendanceTimestamp: getCurrentDateTime()
          })
        }
      })
    }
  }
})

// Helper function to get current date and time
function getCurrentDateTime() {
  const now = new Date()
  return now.toLocaleString() // Adjust format as needed
}
