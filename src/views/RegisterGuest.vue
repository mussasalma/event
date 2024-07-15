<template>
  <div class="wrapper">
    <!-- Sidebar component -->
    <Sidebar />

    <div class="main">
      <!-- TopBar component -->
      <TopBar />

      <!-- Main content -->
      <main class="content">
        <div class="container-fluid p-0">
          <h1 class="h3 mb-3"><strong>Add</strong> Guest</h1>

          <!-- User Registration section -->
          <div class="row mt-4">
            <div class="col-12">
              <div class="card border-0 flex-fill">
                <div class="card-header">
                  <h5 class="card-title mb-0">User Registration</h5>
                </div>
                <div class="card-body">
                  <!-- Form to Add User -->
                  <form @submit.prevent="handleSubmit" class="mb-4">
                    <div class="row mb-3">
                      <div class="col-md-4">
                        <label for="fingerprint_id" class="form-label">Fingerprint ID</label>
                        <input
                          id="fingerprint_id"
                          v-model="form.fingerprint_id"
                          placeholder="Scan Fingerprint ID"
                          class="form-control"
                          @blur="handleScan"
                          required
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="name" class="form-label">Name</label>
                        <input
                          id="name"
                          v-model="form.name"
                          placeholder="Name"
                          class="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-md-2">
                        <label for="dob_day" class="form-label">Date of Birth (Day)</label>
                        <input
                          id="dob_day"
                          v-model="form.dob_day"
                          placeholder="DD"
                          class="form-control"
                          required
                          @input="updateUniqueId"
                        />
                      </div>
                      <div class="col-md-2">
                        <label for="dob_month" class="form-label">Date of Birth (Month)</label>
                        <input
                          id="dob_month"
                          v-model="form.dob_month"
                          placeholder="MM"
                          class="form-control"
                          required
                          @input="updateUniqueId"
                        />
                      </div>
                      <div class="col-md-2">
                        <label for="dob_year" class="form-label">Date of Birth (Year)</label>
                        <input
                          id="dob_year"
                          v-model="form.dob_year"
                          placeholder="YYYY"
                          class="form-control"
                          required
                          @input="updateUniqueId"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="unique_id" class="form-label">Unique ID</label>
                        <input
                          id="unique_id"
                          v-model="form.unique_id"
                          placeholder="Unique ID"
                          class="form-control"
                          required
                          readonly
                        />
                      </div>
                    </div>
                    <button class="btn btn-outline-secondary" type="submit">Register User</button>
                  </form>

                  <!-- Display current user details if available -->
                  <div v-if="currentUser" class="mb-4">
                    <h3>Current User Details</h3>
                    <p>Fingerprint ID: {{ currentUser.fingerprint_id }}</p>
                    <p>Date of Birth: {{ currentUser.dob_day }}-{{ currentUser.dob_month }}-{{ currentUser.dob_year }}</p>
                    <p>Unique ID: {{ currentUser.unique_id }}</p>
                  </div>

                  <!-- User List Table -->
                  <h3>Registered Guests</h3>
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th>Fingerprint ID</th>
                        <th>Name</th>
                        <th>Date of Birth</th>
                        <th>Unique ID</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="user in users" :key="user.id">
                        <td>{{ user.fingerprint_id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.dob_day }}-{{ user.dob_month }}-{{ user.dob_year }}</td>
                        <td>{{ user.unique_id }}</td>
                        <td>
                          <button class="btn btn-outline-primary btn-sm" @click="editUser(user)">Edit</button>
                          <button class="btn btn-outline-danger btn-sm" @click="deleteUser(user.id)">Delete</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Footer section -->
      <FooterSection />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Sidebar from '@/components/NavBar/SideBar.vue'
import TopBar from '@/components/NavBar/TopBar.vue'
import FooterSection from '@/components/FooterSection.vue'
import { useUserStore } from '@/stores/userStore'

// Create an instance of the user store
const userStore = useUserStore()

// Form data
const form = ref({
  fingerprint_id: '',
  name: '',
  dob_day: '',
  dob_month: '',
  dob_year: '',
  unique_id: ''
})

// Handle fingerprint scan (blur event)
const handleScan = () => {
  const fingerprintId = form.value.fingerprint_id;
  if (fingerprintId) {
    userStore.fetchUserByFingerprintId(fingerprintId)
  }
}

// Handle form submission
const handleSubmit = () => {
  const userData = {
    fingerprint_id: form.value.fingerprint_id,
    name: form.value.name,
    dob_day: form.value.dob_day,
    dob_month: form.value.dob_month,
    dob_year: form.value.dob_year,
    unique_id: generateUniqueId() // Generate unique_id
  };

  if (userStore.currentUser) {
    userStore.updateUser(userData);
  } else {
    userStore.addUser(userData);
  }

  resetForm();
}

// Reset form
const resetForm = () => {
  form.value = {
    fingerprint_id: '',
    name: '',
    dob_day: '',
    dob_month: '',
    dob_year: '',
    unique_id: ''
  }
}

// Function to pad number with leading zeros
const padNumber = (num, size) => {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

// Computed property to generate unique_id
const generateUniqueId = () => {
  if (form.value.dob_day && form.value.dob_month && form.value.dob_year) {
    const dob = `${form.value.dob_day}${form.value.dob_month}${form.value.dob_year}`;
    const counter = userStore.getAllUsers.length + 1; // Replace with your own logic to maintain uniqueness
    const paddedCounter = padNumber(counter, 10); // Ensure counter is 10 digits
    return `${dob}${paddedCounter}`;
  }
  return '';
}

// Fetch users data when the component is mounted
onMounted(() => {
  userStore.fetchUsers();
});

// Display current user details if available
const currentUser = computed(() => userStore.getCurrentUser)

// User list
const users = computed(() => userStore.getAllUsers)

// Edit a user
const editUser = (user) => {
  form.value = { ...user }
}

// Delete a user
const deleteUser = (userId) => {
  userStore.deleteUser(userId)
}

</script>

<style scoped>
/* Add any scoped styles here if needed */
.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}

/* Adjust form layout for small screens */
@media (max-width: 768px) {
  .form-group {
    margin-bottom: 1rem;
  }
}
</style>
