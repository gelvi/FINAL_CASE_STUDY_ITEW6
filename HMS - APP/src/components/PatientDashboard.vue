<template>
    <div class="patient-dashboard">
      <PatientNavbar />
      <div class="header">
        <div class="row mt-2">
          <ul class="col-12 d-flex justify-content-end">
            <router-link to="/logout" class="logout-link">Logout</router-link>
          </ul>
        </div>
        <div class="intro">
          <h1>Welcome, {{ patientName }}</h1>
          <p class="subtitle">View Your Appointments and Profile Information.</p>
        </div>
      </div>
      <div class="content">
        <div class="container mt-4">
          <div class="row mb-4">
            <div class="col-md-2 d-flex flex-column">
              <h3>Appointments</h3>
              <button @click="toggleCreateAppointment" class="btn btn-primary ml-2">Add New Appointment</button>

            </div>
          </div>
          <div class="row mt-2 table-container">
            <table class="table table-striped table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th class="text-center" width="20%">Doctor Name</th>
                  <th class="text-center" width="20%">Appointment Date</th>
                  <th class="text-center" width="20%">Reason</th>
                  <th class="text-center" width="10%">Status</th>
                  <th class="text-center" width="10%">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="appointment in filteredAppointments" :key="appointment.id">
                  <td class="text-center">{{ appointment.doctor_name }}</td>
                  <td class="text-center">{{ formatDate(appointment.appointment_date) }}</td>
                  <td class="text-center">{{ appointment.reason }}</td>
                  <td class="text-center">{{ appointment.status }}</td>
                  <td class="text-center">
                    <button @click="toggleEditAppointment(appointment.id)" class="btn btn-primary btn-sm">Edit</button>
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
          <EditAppointment  :visible="showEditAppointment" @update:visible="toggleEditAppointment" />
        </div>




        <div class="profiling-dashboard">
          <div class="content">
            <div class="container mt-4">
              <div class="row mb-4">
                <div class="col-md-6 d-flex align-items-center">
                  <h3>Profile</h3>
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
                      <th class="text-center">Phone Number</th>
                      <th class="text-center">Created At</th>
                      <th class="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="patient in filteredPatients" :key="patient.id">
                      <td class="text-center">{{ patient.firstname }}</td>
                      <td class="text-center">{{ patient.lastname }}</td>
                      <td class="text-center">{{ patient.email }}</td>
                      <td class="text-center">{{ formatDate(patient.date_of_birth) }}</td>
                      <td class="text-center">{{ patient.phone }}</td>
                      <td class="text-center">{{ formatDate(patient.created_at) }}</td>
                      <td class="text-center">
                        <button @click="toggleEditPatient(patient.id)" class="btn btn-primary btn-sm">Edit</button>
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
              
              <EditPatient v-if="showEditPatient" :visible="showEditPatient" @update:visible="toggleEditPatient" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import PatientNavbar from '@/components/Patient/PatientNavbar.vue';

  import CreateAppointment from '@/components/Appointment/CreateAppointment.vue';
  import EditAppointment from '@/components/Appointment/EditAppointment.vue';
  
  import EditPatient from '@/components/Patient/EditPatient.vue';
    
  export default {
    name: 'PatientDashboard',
    components: {
      PatientNavbar, EditAppointment, CreateAppointment ,EditPatient
    },
    data() {
      return {
        showCreateAppointment: false,
        showEditAppointment: false,

        showEditPatient: false,
        showDeletePatient: false,

        currentPage: 1,
        itemsPerPage: 10,
        searchQuery: '', // Initialize searchQuery
        patientName: '', // Store the patient's name
        appointmentsArray: [],
        appointmentId: '',
        patients: [], // Initialize patients array
      };
    },
    mounted() {
      this.fetchPatientName();
      this.fetchDataAppointment();
      this.fetchDataPatients();
    },
    computed: {
      appointments() {
        return this.$store.getters.appointments;
      },
      patientS() {
        return this.$store.getters.patients;
      },
      totalPages() {
        return Math.ceil(this.$store.state.appointment.length / this.itemsPerPage);
      },
      paginatedAppointments() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = this.currentPage * this.itemsPerPage;
        return this.$store.state.appointment.slice(startIndex, endIndex);
      },
      filteredAppointments() {
        return this.$store.state.appointments.filter(appointment => appointment.patient_name == this.patientName);
      },
      filteredPatients() {
        return this.$store.state.patients.filter(patient => patient.firstname + ' ' + patient.lastname == this.patientName);
      }
    },
    methods: {
      async fetchPatientName() {
        try {
          const patientResponse = await axios.get(this.$store.state.apiUrl + '/patients');
          this.patients = patientResponse.data;
          
          const user_id = localStorage.getItem('user_id');
          const patient = this.patients.find(patient => patient.user_id == user_id);
  
          if (patient) {
            this.patientName = `${patient.firstname} ${patient.lastname}`;
          } else {
            console.error('Patient not found for the given user_id');
          }
        } catch (error) {
          console.error('Error fetching patient details:', error);
        }
      },
      async fetchDataAppointment() {
        this.$store.getters.getAppointments
          .then(appointment => {
            this.appointments = appointment;
          })
          .catch(error => {
            console.error("Error fetching appointment:", error);
          });
      },
      async fetchDataPatients() {
        this.$store.getters.getPatients
          .then(patient => {
            this.patientS = patient;
          })
          .catch(error => {
            console.error("Error fetching patient:", error);
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
      toggleEditPatient(id) {
        this.$store.getters.getPatient(id);
        this.showEditPatient = !this.showEditPatient;
        if (this.showEditPatient === false) {
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
  .patient-dashboard {
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
  