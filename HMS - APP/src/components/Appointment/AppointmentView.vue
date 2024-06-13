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
          <button @click="toggleCreateAppointment" class="btn btn-primary ml-2">Add New Appointment</button>
        </div>
        <div class="col-md-6 d-flex justify-content-end">
          <input type="text" v-model="searchQuery" class="form-control" placeholder="Search..." @keyup.enter="searchAppointment">
        </div>
      </div>
      <div class="row mt-2 table-container">
        <table class="table table-striped table-bordered">
          <thead class="thead-dark">
            <tr>
              <th class="text-center" width="20%">Patient Name</th>
              <th class="text-center" width="20%">Doctor Name</th>
              <th class="text-center" width="20%">Appointment Date</th>
              <th class="text-center" width="20%">Reason</th>
              <th class="text-center" width="10%">Status</th>
              <th class="text-center" width="10%">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="appointment in paginatedAppointments" :key="appointment.id">
              <td class="text-center">{{ appointment.patient_name }}</td>
              <td class="text-center">{{ appointment.doctor_name }}</td>
              <td class="text-center">{{ formatDate(appointment.appointment_date) }}</td>
              <td class="text-center">{{ appointment.reason }}</td>
              <td class="text-center">{{ appointment.status }}</td>
              <td class="text-center">
                <button @click="toggleEditAppointment(appointment.id)" class="btn btn-primary btn-sm">Edit</button>
                <button @click="toggleDeleteAppointment(appointment.id)" class="btn btn-danger btn-sm">Delete</button>
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
      <CreateAppointment :visible="showCreateAppointment" @update:visible="toggleCreateAppointment" />
      <EditAppointment :visible="showEditAppointment" @update:visible="toggleEditAppointment" />
      <DeleteAppointment :visible="showDeleteAppointment" @update:visible="toggleDeleteAppointment" />
    </div>
    <router-view />
  </div>
</template>

<script>
import CreateAppointment from './CreateAppointment.vue';
import EditAppointment from './EditAppointment.vue';
import DeleteAppointment from './DeleteAppointment.vue';

export default {
  name: 'AppointmentView',
  components: {
    CreateAppointment,
    EditAppointment,
    DeleteAppointment,
    
  },
  data() {
    return {
      showCreateAppointment: false,
      showEditAppointment: false,
      showDeleteAppointment: false,
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: ''
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    appointments() {
      return this.$store.state.appointments;
    },
    totalPages() {
      return Math.ceil(this.$store.state.appointments.length / this.itemsPerPage);
    },
    paginatedAppointments() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = this.currentPage * this.itemsPerPage;
      return this.$store.state.appointments.slice(startIndex, endIndex);
    }
  },
  methods: {
    fetchData() {
      this.$store.getters.getAppointments
        .then(appointments => {
          this.appointments = appointments;
        })
        .catch(error => {
          console.error("Error fetching appointments:", error);
        });
    },
    async searchAppointment() {
      await this.$store.dispatch('filteredAppointments', this.searchQuery);
      this.currentPage = 1;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    },
    toggleCreateAppointment() {
      this.showCreateAppointment = !this.showCreateAppointment;
      if (this.showCreateAppointment === false) {
        this.$store.dispatch('refreshAppointments');
      }
    },
    toggleEditAppointment(id) {
      this.$store.getters.getAppointment(id);
      this.showEditAppointment = !this.showEditAppointment;
      if (this.showEditAppointment === false) {
        this.$store.dispatch('refreshAppointments');
      }
    },
    toggleDeleteAppointment(id) {
      this.$store.getters.getAppointment(id);
      this.showDeleteAppointment = !this.showDeleteAppointment;
      if (this.showDeleteAppointment === false) {
        this.$store.dispatch('refreshAppointments');
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
