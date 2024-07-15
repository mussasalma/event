<template>
  <div class="wrapper">
    <Sidebar />
    <div class="main">
      <TopBar />
      <main class="content">
        <div class="container-fluid p-0">
          <h1 class="h3 mb-3"><strong>Attendance</strong> Report</h1>
          <div class="row">
            <div class="col-12 col-lg-12 col-xxl-12">
              <div class="card border-0 flex-fill">
                <div class="card-header">
                  <h5 class="card-title mb-0">General Attendance Report</h5>
                </div>
                <div class="card-body">
                  <table class="table table-hover my-0">
                    <thead>
                      <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Total Present Days</th>
                        <th>Total Absent Days</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(user, index) in users" :key="index">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.presentDays }}</td>
                        <td>{{ user.absentDays }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-12">
              <div class="card border-0 flex-fill">
                <div class="card-header">
                  <h5 class="card-title mb-0">Summary</h5>
                </div>
                <div class="card-body">
                  <p>Total Users: {{ users.length }}</p>
                  <p>Total Present Days: {{ totalPresentDays }}</p>
                  <p>Total Absent Days: {{ totalAbsentDays }}</p>
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
import Sidebar from '@/components/NavBar/SideBar.vue';
import TopBar from '@/components/NavBar/TopBar.vue';
import FooterSection from '@/components/FooterSection.vue';
import { useUserStore } from '@/stores/userStore';
// import { useRouter } from 'vue-router';
import { computed } from 'vue';

const userStore = useUserStore();
const users = computed(() => {
  return userStore.getAllUsers.map(user => {
    let presentDays = 0;
    let absentDays = 0;
    if (user.attendance) {
      Object.values(user.attendance).forEach(status => {
        if (status) presentDays += 1;
        else absentDays += 1;
      });
    }
    return {
      ...user,
      presentDays,
      absentDays,
    };
  });
});

const totalPresentDays = computed(() => {
  return users.value.reduce((acc, user) => acc + user.presentDays, 0);
});

const totalAbsentDays = computed(() => {
  return users.value.reduce((acc, user) => acc + user.absentDays, 0);
});
</script>

<style scoped>
/* Add any additional styling if needed */
.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}
</style>
