<template>
    <div class="doctor-dashboard">
      <DoctorNavbar />
      <div class="header">
        <div class="row mt-2">
          <ul class="col-12 d-flex justify-content-end">
            <router-link to="/logout" class="logout-link">Logout</router-link>
          </ul>
        </div>
        <div class="intro">
          <h1>Welcome, Dr. {{ doctorName }}</h1>
          <p class="subtitle">View Patient Records, View Appointments, and Profiling.</p>
        </div>
      </div>
      <div class="content">
        <div>
          <div class="container mt-4">
            <div class="row mb-4">
              <div class="col-md-6 d-flex flex-column ">
                <h3>Appointments</h3>
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
                  <tr v-for="appointment in filteredAppointments" :key="appointment.id">
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
            <EditAppointment :visible="showEditAppointment" @update:visible="toggleEditAppointment" />
            <DeleteAppointment :visible="showDeleteAppointment" @update:visible="toggleDeleteAppointment" />
          </div>
          <router-view />
        </div>
      </div>
    </div>

     <div class="profiling-dashboard">
      <div class="content">
        <div>
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
                    <th class="text-center">Specialization</th>
                    <th class="text-center">License Number</th>
                    <th class="text-center">Years of Experience</th>
                    <th class="text-center">Created At</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="doctor in filteredDoctors" :key="doctor.id">
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
            <EditDoctor  :visible="showEditDoctor" @update:visible="toggleEditDoctor" />
            <DeleteDoctor :visible="showDeleteDoctor" @update:visible="toggleDeleteDoctor" />
          <router-view />
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import axios from 'axios';
  import DoctorNavbar from '@/components/Doctor/DoctorNavbar.vue';
  import EditAppointment from '@/components/Appointment/EditAppointment.vue';
  import DeleteAppointment from '@/components/Appointment/DeleteAppointment.vue';
  
  import EditDoctor from '@/components/Doctor/EditDoctor.vue';
  import DeleteDoctor from '@/components/Doctor/DeleteDoctor.vue';

  export default {
    name: 'DoctorDashboard',
    components: {
      DoctorNavbar, EditAppointment, DeleteAppointment, EditDoctor, DeleteDoctor
    },
    data() {
      return {
        showEditAppointment: false,
        showDeleteAppointment: false,

        showEditDoctor: false,
        showDeleteDoctor: false,

        currentPage: 1,
        itemsPerPage: 10,
        searchQuery: '', // Initialize searchQuery
        doctorName: '', // Store the doctor's name
        appointmentsArray: [],
        appointmentId: '',
        doctors: [], // Initialize doctors array
      };
    },
    mounted() {
      this.fetchDoctorName();
      this.fetchDataDoctors();
      this.fetchDataAppointment();
      
    },
    computed: {
      appointments() {
        return this.$store.getters.appointments;
      },
      doctorS() {
        return this.$store.getters.doctors;
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
        return this.$store.state.appointments.filter(appointment => appointment.doctor_name == this.doctorName);
      },
      filteredDoctors() {
        return this.$store.state.doctors.filter(doctor => doctor.firstname +' '+ doctor.lastname == this.doctorName);
      }
    },
    methods: {
        
      async fetchDoctorName() {
        try {
            const doctorResponse = await axios.get(this.$store.state.apiUrl + '/doctors');
            this.doctors = doctorResponse.data;

            
            const user_id = localStorage.getItem('user_id');
            const doctor = this.doctors.find(doctor => doctor.user_id == user_id);
        

            if (doctor) {
                this.doctorName = `${doctor.firstname} ${doctor.lastname}`;
            } else {
                console.error('Doctor not found for the given user_id');
            }
        } catch (error) {
          console.error('Error fetching doctor details:', error);
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

      async fetchDataDoctors() {
        this.$store.getters.getDoctors
        .then(doctor => {
          this.doctorS = doctor;
        })
        .catch(error => {
          console.error("Error fetching doctor:", error);
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
  