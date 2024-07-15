<template>
  <div class="container mt-4">
    <h1>guests Data</h1>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addguestModal">
      Add/Update guest
    </button>

    <!-- Modal -->
    <div class="modal fade" id="addguestModal" tabindex="-1" aria-labelledby="addguestModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addguestModalLabel">Add/Update guest</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addguest">
              <div class="mb-3">
                <label for="selectedguest" class="form-label">Select guest:</label>
                <select v-model="selectedguest" id="selectedguest" class="form-select" required>
                  <option v-for="(guest, key) in guestOptions" :key="key" :value="key">
                    {{ guest.name ? guest.name : key }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <input type="text" v-model="newguestName" class="form-control" placeholder="Enter guest name"
                  required />
              </div>
              <div class="mb-3">
                <input type="text" v-model="newguestClass" class="form-control" placeholder="Enter guest Class"
                  required />
              </div>
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <ol class="list-group list-group-numbered mt-4">
      <li v-for="(guest, index) in guests" :key="index" class="list-group-item">
        Name: {{ guest.name }} and Class: {{ guest.Class }}
      </li>
    </ol>
  </div>
</template>

<script>
import { database } from '@/firebase/init'
import { ref, onValue, set } from 'firebase/database'

export default {
  data() {
    return {
      guests: [],
      newguestName: '',
      newguestClass: '',
      selectedguest: 'guest1',
      guestOptions: {
        guest1: { ID: '63e3601a' },
        guest2: { ID: '93c6c40e' }
      }
    }
  },
  created() {
    this.fetchguests()
  },
  methods: {
    fetchguests() {
      const guestsRef = ref(database, 'guest')
      onValue(guestsRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          for (const key in data) {
            if (data[key].name && data[key].Class) {
              this.guests.push({
                id: key,
                name: data[key].name,
                Class: data[key].Class
              })
            }
          }
        }
      })
    },
    addguest() {
      const guestRef = ref(database, `guest/${this.selectedguest}`)
      set(guestRef, {
        ID: this.guestOptions[this.selectedguest].ID,
        name: this.newguestName,
        Class: this.newguestClass
      })
        .then(() => {
          this.newguestName = ''
          this.newguestClass = ''
        })
        .catch((error) => {
          console.error('Error adding guest: ', error)
        })
    }
  }
}
</script>

<style>
/* Add any additional styling if needed */
</style>
