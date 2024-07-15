// src/stores/userStore.js
import { defineStore } from 'pinia'
import { ref, set, remove, onValue } from 'firebase/database'
import { database } from '@/firebase/init'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [],
    currentUser: null,
  }),

  actions: {
    // Fetch all users
    fetchUsers() {
      const usersRef = ref(database, 'users');
      onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.users = Object.keys(data)
            .filter(key => data[key] !== null)  // Filter out null entries
            .map(key => ({
              id: key,
              ...data[key]
            }));
        } else {
          this.users = [];
        }
      }, (error) => {
        console.error('Error fetching users:', error);
      });
    },

    // Fetch user by fingerprint ID
    fetchUserByFingerprintId(fingerprintId) {
      const user = this.users.find(user => user.fingerprint_id === fingerprintId);
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = { fingerprint_id: fingerprintId };
      }
    },

    // Add a new user
    addUser(user) {
      const newUserRef = ref(database, `users/${user.fingerprint_id}`);
      set(newUserRef, {
        fingerprint_id: user.fingerprint_id,
        name: user.name,
        dob_day: user.dob_day,
        dob_month: user.dob_month,
        dob_year: user.dob_year,
        unique_id: user.unique_id,
        // attendance: user.attendance

      })
      .then(() => {
        console.log('User added successfully');
        this.currentUser = null; // Clear current user after adding
      })
      .catch((error) => {
        console.error('Error adding user:', error);
      });
    },

    // Update an existing user
    updateUser(user) {
      const userRef = ref(database, `users/${user.fingerprint_id}`);
      set(userRef, {
        ...user
      })
      .then(() => {
        console.log('User updated successfully');
        this.currentUser = null; // Clear current user after updating
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
    },

    // Delete a user
    deleteUser(userId) {
      const userRef = ref(database, `users/${userId}`);
      remove(userRef)
      .then(() => {
        console.log('User deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
    }
  },

  getters: {
    getAllUsers(state) {
      return state.users;
    },
    getCurrentUser(state) {
      return state.currentUser;
    },
  },
});
