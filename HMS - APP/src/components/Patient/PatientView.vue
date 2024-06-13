<template>
  <div>
    
    <div class="container mt-4">
      <div class="row mb-2">
        <ul class="col-12 d-flex justify-content-end">
          <router-link to="/logout" class="btn btn-outline-danger">Logout</router-link>
        </ul>
      </div>
      <div class="row mb-4">
        <div class="col-md-6 d-flex align-items-center">
          <button @click="goBack" class="btn btn-secondary">Back</button>
          <button @click="toggleCreatePatient" class="btn btn-primary ml-2">Add New Patient</button>
        </div>
        <div class="col-md-6 d-flex justify-content-end">
          <input type="text" v-model="searchQuery" class="form-control" placeholder="Search..." @keyup.enter="searchPatients">
        </div>
      </div>
      <div class="row mt-2 table-container">
        <table class="table table-striped table-bordered">
          <thead class="thead-dark">
            <tr>
              <th class="text-center">First Name</th>
              <th class="text-center">Last Name</th>
              <th class="text-center">Email</th>
              <th class="text-center">Date of Birth</th>
              <th class="text-center">Gender</th>
              <th class="text-center">Address</th>
              <th class="text-center">Phone</th>
              <th class="text-center">Medical History</th>
              <th class="text-center">Created At</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="patient in paginatedPatients" :key="patient.id">
              <td class="text-center">{{ patient.firstname }}</td>
              <td class="text-center">{{ patient.lastname }}</td>
              <td class="text-center">{{ patient.email }}</td>
              <td class="text-center">{{ patient.date_of_birth }}</td>
              <td class="text-center">{{ patient.gender }}</td>
              <td class="text-center">{{ patient.address }}</td>
              <td class="text-center">{{ patient.phone }}</td>
              <td class="text-center">{{ patient.medical_history }}</td>
              <td class="text-center">{{ formatDate(patient.created_at) }}</td>
              <td class="text-center">
                <button @click="toggleEditPatient(patient.id)" class="btn btn-primary btn-sm">Edit</button>
                <button @click="toggleDeletePatient(patient.id)" class="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination-buttons">
          <button class="btn btn-primary" @click="previousPage" :disabled="currentPage === 1">Previous</button>
          <button class="btn btn-primary" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>
      <!-- Modal components -->
      <CreatePatient :visible="showCreatePatient" @update:visible="toggleCreatePatient" />
      <EditPatient :visible="showEditPatient" @update:visible="toggleEditPatient" />
      <DeletePatient :visible="showDeletePatient" @update:visible="toggleDeletePatient" />
    </div>
    <router-view />
  </div>
</template>

<script>

import CreatePatient from './CreatePatient.vue';
import EditPatient from './EditPatient.vue';
import DeletePatient from './DeletePatient.vue';

export default {
  name: 'PatientView',
  components: {
    CreatePatient,
    EditPatient,
    DeletePatient,
  
  },
  data() {
    return {
      showCreatePatient: false,
      showEditPatient: false,
      showDeletePatient: false,
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: ''
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    patients() {
      return this.$store.state.patients;
    },
    totalPages() {
      return Math.ceil(this.$store.state.patients.length / this.itemsPerPage);
    },
    paginatedPatients() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = this.currentPage * this.itemsPerPage;
      return this.$store.state.patients.slice(startIndex, endIndex);
    }
  },
  methods: {
    fetchData() {
      this.$store.getters.getPatients
        .then(patients => {
          this.patients = patients;
        })
        .catch(error => {
          console.error("Error fetching patients:", error);
        });
    },
    searchPatients() {
      this.$store.dispatch('filteredPatients', this.searchQuery);
      this.currentPage = 1;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    },
    toggleCreatePatient() {
      this.showCreatePatient = !this.showCreatePatient;
      if (this.showCreatePatient === false) {
        this.$store.dispatch('refreshPatients');
      }
    },
    toggleEditPatient(id) {
      this.$store.getters.getPatient(id);
      this.showEditPatient = !this.showEditPatient;
      if (this.showEditPatient === false) {
        this.$store.dispatch('refreshPatients');
      }
    },
    toggleDeletePatient(id) {
      this.$store.getters.getPatient(id);
      this.showDeletePatient = !this.showDeletePatient;
      if (this.showDeletePatient === false) {
        this.$store.dispatch('refreshPatients');
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goBack() {
      this.$router.go(-1); // Go back to the previous page
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

ul {
  list-style-type: none;
  padding: 0;
}

a.btn {
  margin-left: 10px;
}

.table-container {
  overflow-x: auto;
}

.pagination-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination-buttons button {
  margin: 0 10px;
}

.table {
  margin-bottom: 0;
}

.thead-dark th {
  background-color: #343a40;
  color: white;
}

input[type="text"] {
  max-width: 300px;
}

.btn-primary, .btn-danger, .btn-secondary {
  transition: background-color 0.3s ease;
}

.btn-primary:hover, .btn-danger:hover, .btn-secondary:hover {
  background-color: darken(color, 10%);
}
</style>
