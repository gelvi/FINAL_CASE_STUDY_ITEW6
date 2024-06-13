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
          <button @click="toggleCreateDoctor" class="btn btn-primary ml-2">Add New Doctor</button>
        </div>
        <div class="col-md-6 d-flex justify-content-end">
          <input type="text" v-model="searchQuery" class="form-control" placeholder="Search..." @keyup.enter="searchDoctor">
        </div>
      </div>
      <div class="row mt-2 table-container">
        <table class="table table-striped table-bordered">
          <thead class="thead-dark">
            <tr>
              <th class="text-center">First Name</th>
              <th class="text-center">Last Name</th>
              <th class="text-center">Email</th>
              <th class="text-center">Specialization</th>
              <th class="text-center">License Number</th>
              <th class="text-center">Years of Experience</th>
              <th class="text-center">Created At</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="doctor in paginatedDoctors" :key="doctor.id">
              <td class="text-center">{{ doctor.firstname }}</td>
              <td class="text-center">{{ doctor.lastname }}</td>
              <td class="text-center">{{ doctor.email }}</td>
              <td class="text-center">{{ doctor.specialization }}</td>
              <td class="text-center">{{ doctor.license_number }}</td>
              <td class="text-center">{{ doctor.years_of_experience }}</td>
              <td class="text-center">{{ formatDate(doctor.created_at) }}</td>
              <td class="text-center">
                <button @click="toggleEditDoctor(doctor.id)" class="btn btn-primary btn-sm">Edit</button>
                <button @click="toggleDeleteDoctor(doctor.id)" class="btn btn-danger btn-sm">Delete</button>
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
      <CreateDoctor :visible="showCreateDoctor" @update:visible="toggleCreateDoctor" />
      <EditDoctor  :visible="showEditDoctor" @update:visible="toggleEditDoctor" />
      <DeleteDoctor :visible="showDeleteDoctor" @update:visible="toggleDeleteDoctor" />
    </div>
    <router-view />
  </div>
</template>

<script>
import CreateDoctor from './CreateDoctor.vue';
import EditDoctor from './EditDoctor.vue';
import DeleteDoctor from './DeleteDoctor.vue';

export default {
  name: 'DoctorView',
  components: {
    CreateDoctor,
    EditDoctor,
    DeleteDoctor,
   
  },
  data() {
    return {
      showCreateDoctor: false,
      showEditDoctor: false,
      showDeleteDoctor: false,
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: ''
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    doctors() {
      return this.$store.state.doctors;
    },
    totalPages() {
      return Math.ceil(this.$store.state.doctors.length / this.itemsPerPage);
    },
    paginatedDoctors() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = this.currentPage * this.itemsPerPage;
      return this.$store.state.doctors.slice(startIndex, endIndex);
    }
  },
  methods: {
    fetchData() {
      this.$store.getters.getDoctors
        .then(doctors => {
          this.doctors = doctors;
        })
        .catch(error => {
          console.error("Error fetching patients:", error);
        });
    },
    searchDoctor() {
      this.$store.dispatch('filteredDoctors', this.searchQuery);
      this.currentPage = 1;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    },
    toggleCreateDoctor() {
      this.showCreateDoctor = !this.showCreateDoctor;
      if (this.showCreateDoctor === false) {
        this.$store.dispatch('refreshDoctors');
      }
    },
    toggleEditDoctor(id) {
      this.$store.getters.getDoctor(id);
      this.showEditDoctor = !this.showEditDoctor;
      if (this.showEditDoctor === false) {
        this.$store.dispatch('refreshDoctors');
      }
    },
    toggleDeleteDoctor(id) {
      this.$store.getters.getDoctor(id);
      this.showDeleteDoctor = !this.showDeleteDoctor;
      if (this.showDeleteDoctor === false) {
        this.$store.dispatch('refreshDoctors');
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
