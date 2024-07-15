// src/stores/summaryStore.js
import { defineStore } from 'pinia';
import { ref, onValue } from 'firebase/database';
import { database } from '@/firebase/init';

export const useSummaryStore = defineStore('summary', {
  state: () => ({
    totalStudents: 0,
    totalPresent: 0,
    totalAbsent: 0,
  }),
  actions: {
    fetchStudents() {
      const studentsRef = ref(database, 'students');
      onValue(studentsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const students = Object.values(data);
          this.totalStudents = students.length;
          this.totalPresent = students.filter(student => student.attendance?.present).length;
          this.totalAbsent = students.filter(student => student.attendance && !student.attendance.present).length;
        } else {
          this.totalStudents = 0;
          this.totalPresent = 0;
          this.totalAbsent = 0;
        }
      }, (error) => {
        console.error('Error fetching students:', error);
      });
    }
  },
  getters: {
    getTotalStudents: (state) => state.totalStudents,
    getTotalPresent: (state) => state.totalPresent,
    getTotalAbsent: (state) => state.totalAbsent,
  }
});
