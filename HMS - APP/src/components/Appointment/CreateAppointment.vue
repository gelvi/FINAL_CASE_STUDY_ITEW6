<template>
    <div>
      <!-- Modal -->
      <div v-if="openClose" class="modal fade show" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style="display:block">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add Appointment</h5>
              <button type="button" @click="OpenCloseModal()" class="btn-close"></button>
            </div>
            <div class="modal-body">
             
              <!-- Dropdown for selecting patient -->
              <div class="form-group">
                <label for="patient_id">Patient:</label>
                <select class="form-control" id="patient_id" v-model="patient_id">
                  <option v-for="patient in patients" :key="patient.id" :value="patient.id">
                    {{ patient.firstname }} {{ patient.lastname }}
                  </option>
                </select>
              </div>
              <!-- Dropdown for selecting doctor -->
              <div class="form-group">
                <label for="doctor_id">Doctor:</label>
                <select class="form-control" id="doctor_id" v-model="doctor_id">
                  <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
                    {{ 'Dr. ' + doctor.firstname + ' ' + doctor.lastname }}

                  </option>
                </select>
              </div>
              <!-- Input field for the appointment date -->
              <div class="form-group">
                <label for="appointment_date">Appointment Date:</label>
                <input type="date" class="form-control" id="appointment_date" v-model="appointment_date">
              </div>
              <!-- Input field for the reason -->
              <div class="form-group">
                <label for="reason">Reason:</label>
                <input type="text" class="form-control" id="reason" v-model="reason">
              </div>
              <!-- Dropdown for the status -->
              <div class="form-group">
                <label for="status">Status:</label>
                <select class="form-control" id="status" v-model="status">
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" @click="OpenCloseModal()" class="btn btn-secondary">Close</button>
              <button type="button" @click="SaveNewAppointment()" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "CreateAppointment",
    data() {
      return {
        openClose: this.visible,
        patient_id: '',
        doctor_id: '',
        patient_name: '',
        doctor_name: '',
        appointment_date: '',
        reason: '',
        status: '',
        errors: null,
        patients: [],
        doctors: []
      }
    },
    props: {
      visible: Boolean
    },
    methods: {
      async OpenCloseModal() {
        console.log("OpenCloseModal called");
        this.openClose = !this.openClose;
        this.$emit('update:visible', this.openClose);
        if (!this.openClose) {
          console.log("Modal closed");
          this.$emit('modal-closed');
        }
      },
      async fetchPatientsAndDoctors() {
        try {
          console.log("Fetching patients...");
          const patientResponse = await axios.get(this.$store.state.apiUrl + '/patients');
          console.log("Patients fetched: ", patientResponse.data);
          
          console.log("Fetching doctors...");
          const doctorResponse = await axios.get(this.$store.state.apiUrl + '/doctors');
          console.log("Doctors fetched: ", doctorResponse.data);
          
          this.patients = patientResponse.data;
          this.doctors = doctorResponse.data;
        } catch (error) {
          console.error("Error fetching patients and doctors: ", error);
        }
      },
      async SaveNewAppointment() {
        try {
            // Find the selected patient and doctor based on the selected IDs
            const selectedPatient = this.patients.find(patient => patient.id === this.patient_id);
            const selectedDoctor = this.doctors.find(doctor => doctor.id === this.doctor_id);

            // Update patient_name and doctor_name with the selected names
            this.patient_name = selectedPatient ? `${selectedPatient.firstname} ${selectedPatient.lastname}` : '';
            this.doctor_name = selectedDoctor ? `${selectedDoctor.firstname} ${selectedDoctor.lastname}` : '';

            console.log("Saving new appointment...");
            const response = await axios.post(this.$store.state.apiUrl + '/newappointments', {
              patient_id: this.patient_id,
              doctor_id: this.doctor_id,
              patient_name: this.patient_name,
              doctor_name: this.doctor_name,
              appointment_date: this.appointment_date,
              reason: this.reason,
              status: this.status,
              user_id: localStorage.getItem('user_id')
            });
            
          console.log("Appointment saved: ", response.data);
          if (response.status === 201) {
            this.$emit('update:visible', false); // Emit an event with the new value
            this.$emit('modal-closed'); // Emit an event indicating modal is closed
          }
        } catch (error) {
          console.error("Error saving appointment: ", error);
          alert(error.response.data.message);
          this.errors = error.response.data.message;
        }
      }
    },
    watch: {
      visible: {
        handler(newVal) {
          console.log("Visible prop changed: ", newVal);
          this.openClose = newVal;
          if (newVal) {
            this.fetchPatientsAndDoctors(); // Fetch data when modal is opened
          }
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  