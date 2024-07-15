// stores/guest.js
import { defineStore } from 'pinia'
import { ref, set, onValue } from 'firebase/database'
import { database } from '@/firebase/init'

export const useguestStore = defineStore('guest', {
  state: () => ({
    guests: []
  }),
  actions: {
    addguest(guest) {
      const guestRef = ref(database, `guests/${guest.id}`)
      set(guestRef, {
        name: guest.name,
        Class: guest.Class,
        attendance: false, // Default attendance status
        entryDate: getCurrentDate(),
        entryTime: getCurrentTime()
      })
    },
    updateAttendance(guestId, attendanceStatus) {
      const guestRef = ref(database, `guests/${guestId}`)
      const newStatus = attendanceStatus === 'Present' ? true : false
      guestRef.update({
        attendance: newStatus,
        timestamp: getCurrentTimestamp()
      })
    },
    fetchguests() {
      const guestsRef = ref(database, 'guests')
      onValue(guestsRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          this.guests = Object.values(data)
        } else {
          this.guests = []
        }
      })
    }
  }
})

// Helper function to get current date in YYYY-MM-DD format
function getCurrentDate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Helper function to get current time in HH:mm AM/PM format
function getCurrentTime() {
  const now = new Date()
  let hours = now.getHours()
  let minutes = now.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes
  const strTime = hours + ':' + minutes + ' ' + ampm
  return strTime
}

// Helper function to get current timestamp (UNIX timestamp)
function getCurrentTimestamp() {
  return Math.floor(new Date().getTime() / 1000)
}
