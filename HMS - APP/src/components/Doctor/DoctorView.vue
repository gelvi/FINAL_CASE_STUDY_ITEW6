<template>
  <div>
    <div class="row mt-2">
      <ul class="col-12 d-flex justify-content-end">
        <li class="nav-item">
          <button @click="logout" class="logout-button">Logout</button>
        </li>
      </ul> 
    </div>
    <h1>Doctor Dashboard</h1>
    <!-- Doctor specific content -->
    <div class="row mt-3">
      <div class="col-12 d-flex justify-content-start">
        <router-link to="/DMedicalRecords">
          <button class="btn btn-primary">View Medical Records</button>
        </router-link>
      </div>
    </div>
    <Profile />
  </div>
</template>

<script>
import Profile from './ProfileView.vue';

export default {
  name: 'DoctorView',
  components: {
    Profile
  },
  methods: {
    logout() {
      // Implement your logout functionality here
      // For example, redirect to the logout route
      this.$router.push('/logout');
    }
  }
};
</script>

<style scoped>
.logout-button {
  background-color: red;
  color: white;
  border: none;
  padding: 0.5em 1em;
  border-radius: 0.25em;
  cursor: pointer;
}

.logout-button:hover {
  background-color: darkred;
}
</style>
