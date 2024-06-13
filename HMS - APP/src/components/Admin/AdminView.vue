<template>
  <div class="admin-dashboard">
    <AdminNavbar />
    <div class="header">
      <div class="row mt-2">
        <ul class="col-12 d-flex justify-content-end">
          <router-link to="/logout" class="logout-link">Logout</router-link>
        </ul>
      </div>
      <div class="intro">
        <h1>Welcome to the Admin Dashboard</h1>
        <p class="subtitle">Manage users, medical records, and other administrative tasks efficiently.</p>
      </div>
    </div>
    <div class="content">
      <!-- Admin specific content -->
    </div>
  </div>
</template>

<script>
import AdminNavbar from '@/components/Admin/AdminNavbar.vue';

export default {
  name: 'AdminView',
  components: {
    AdminNavbar
  }
};
</script>

<style scoped>
.admin-dashboard {
  font-family: 'Arial', sans-serif;
  color: #333;
}

.header {
  background-color: #f8f9fa;
  padding: 20px;
  border-bottom: 1px solid #dee2e6;
}

.header .row {
  margin-bottom: 10px;
}

.logout-link {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.logout-link:hover {
  text-decoration: underline;
}

.intro {
  text-align: center;
  margin-top: 20px;
}

.intro h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.intro .subtitle {
  font-size: 1.2rem;
  color: #6c757d;
}

.content {
  padding: 20px;
}
</style>
