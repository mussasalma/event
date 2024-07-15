<template>
  <div class="wrapper">
    <Sidebar />
    <div class="main">
      <TopBar />
      <main class="content">
        <div class="container-fluid p-0">
          <h1 class="h3 mb-3"><strong>ALL</strong> Users</h1>
          <div class="row">
            <div class="col-12 col-lg-12 col-xxl-12">
              <div class="card border-0 flex-fill">
                <div class="card-header">
                  <h5 class="card-title mb-0">User Information</h5>
                </div>
                <div v-if="users && users.length > 0">
                  <table class="table table-hover my-0">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>DOB</th>
                        <th>Unique ID</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(user, key) in users" :key="key">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.dob_day }}-{{ user.dob_month }}-{{ user.dob_year }}</td>
                        <td>{{ user.unique_id }}</td>
                        <td>
                          <span :class="statusBadgeClass(user.attendance)">{{ statusText(user.attendance) }}</span>
                        </td>
                        <td>
                          <button class="btn btn-sm" :class="{'btn-success': user.attendance, 'btn-danger': !user.attendance}" @click="toggleAttendance(user)">
                            {{ user.attendance ? 'Mark Absent' : 'Mark Present' }}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else>
                  Loading users...
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  </div>
</template>

<script setup>
// import { ref, computed, onMounted } from 'vue'
import Sidebar from '@/components/NavBar/SideBar.vue'
import TopBar from '@/components/NavBar/TopBar.vue'
import FooterSection from '@/components/FooterSection.vue'
import { useUserStore } from '@/stores/userStore'

const $store = useUserStore();
const users = $store.users; // Ensure users are properly retrieved from store

// Function to toggle attendance status
const toggleAttendance = (user) => {
  user.attendance = !user.attendance;
  $store.updateUser(user); // Update user in store and database
};

// Function to determine the CSS class for status badges based on attendance status
const statusBadgeClass = (status) => {
  return {
    'badge bg-success': status === true,
    'badge bg-danger': status === false,
  };
};

// Function to convert status value to text
const statusText = (status) => {
  return status ? 'Present' : 'Absent';
};
</script>

<style>
/* Add any additional styling if needed */
</style>
