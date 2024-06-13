<template>
  <div>
    <!-- Modal -->
    <div v-if="openClose" class="modal fade show" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style="display:block">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Appointment</h5>
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
              <input type="datetime-local" class="form-control" id="appointment_date" v-model="appointment_date">
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
            <button type="button" @click="updateAppointment()" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    visible: Boolean, // Prop for the visibility of the modal
  },
  data() {
    return {
      openClose: this.visible,
      patient_id: '',
      doctor_id: '',
      appointment_date: '',
      reason: '',
      status: '',
      errors: null,
      patients: [],
      doctors: []
    }
  },
  methods: {
    async fetchPatientsAndDoctors() {
      try {
        const patientResponse = await axios.get(this.$store.state.apiUrl + '/patients');
        const doctorResponse = await axios.get(this.$store.state.apiUrl + '/doctors');
        this.patients = patientResponse.data;
        this.doctors = doctorResponse.data;

        // Set initial values for dropdowns
        const appointment = this.$store.state.appointment;
        this.patient_id = appointment.patient_id;
        this.doctor_id = appointment.doctor_id;
        this.appointment_date = appointment.appointment_date;
        this.reason = appointment.reason;
        this.status = appointment.status;
      } catch (error) {
        console.error("Error fetching patients and doctors: ", error);
      }
    },
    OpenCloseModal() {
      this.openClose = !this.openClose;
      this.$emit('update:visible', false); // Emit an event with the new value
      this.$emit('modal-closed'); // Emit an event indicating modal is closed
    },
    async updateAppointment() {
      try {
        const patient = this.patients.find(patient => patient.id === this.patient_id);
        const doctor = this.doctors.find(doctor => doctor.id === this.doctor_id);
        

        // console.log(`Updating appointment with ID: ${appointmentId}`); // Log the appointment ID
        const response = await axios.put(this.$store.state.apiUrl + '/updateappointment/' + this.$store.state.appointment.id, {
          patient_id: this.patient_id,
          doctor_id: this.doctor_id,
          patient_name: patient ? `${patient.firstname} ${patient.lastname}` : '',
          doctor_name: doctor ? `${doctor.firstname} ${doctor.lastname}` : '',
          appointment_date: this.appointment_date,
          reason: this.reason,
          status: this.status,
          user_id: localStorage.getItem('user_id')
        });
        console.log(`Response status: ${response.status}`); // Log the response status
        if (response.status === 200) {
          this.openClose = !this.openClose;
          this.$emit('update:visible', false); // Emit an event with the new value
          this.$emit('modal-closed'); // Emit an event indicating modal is closed
        }
      } catch (error) {
        console.error("Error updating appointment:", error);
        if (error.response && error.response.data) {
          alert(error.response.data.message);
        }
      }
    }
  },
  watch: {
    visible: {
      handler(newVal) {
        this.openClose = newVal;
        if (newVal) {
          this.fetchPatientsAndDoctors(); // Fetch data when modal is opened
        }
      }
    }
  }
}
</script>

