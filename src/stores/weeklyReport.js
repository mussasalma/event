// src/stores/reportStore.js
import { defineStore } from 'pinia';
import { ref, onValue } from 'firebase/database';
import { database } from '@/firebase/init';

export const useReportStore = defineStore('reportStore', {
  state: () => ({
    users: [],
    totalPresentDays: 0,
    totalAbsentDays: 0,
  }),

  actions: {
    // Fetch all users with their attendance data
    fetchUsers() {
      const usersRef = ref(database, 'users');
      onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.users = Object.keys(data)
            .filter(key => data[key] !== null)
            .map(key => {
              const user = data[key];
              let presentDays = 0;
              let absentDays = 0;
              if (user.attendance) {
                Object.values(user.attendance).forEach(status => {
                  if (status) presentDays += 1;
                  else absentDays += 1;
                });
              }
              return {
                id: key,
                ...user,
                presentDays,
                absentDays,
              };
            });

          // Calculate total present and absent days
          this.totalPresentDays = this.users.reduce((acc, user) => acc + user.presentDays, 0);
          this.totalAbsentDays = this.users.reduce((acc, user) => acc + user.absentDays, 0);
        } else {
          this.users = [];
          this.totalPresentDays = 0;
          this.totalAbsentDays = 0;
        }
      }, (error) => {
        console.error('Error fetching users:', error);
      });
    },
  },

  getters: {
    getUsers(state) {
      return state.users;
    },
    getTotalPresentDays(state) {
      return state.totalPresentDays;
    },
    getTotalAbsentDays(state) {
      return state.totalAbsentDays;
    },
  },
});
