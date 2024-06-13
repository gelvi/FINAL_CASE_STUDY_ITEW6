<template>
    <div>
      <!-- Modal -->
      <div v-if="openClose" class="modal fade show" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style="display:block">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Do you want to delete this appointment?</h5>
              <button type="button" @click="OpenCloseModal()" class="btn-close"></button>
            </div>
            <div class="modal-body">
              <!-- Displaying appointment details -->
              <div class="form-group">
                <label for="patient_name">Patient Name:</label>
                <input type="text" class="form-control" id="patient_name" v-model="this.$store.state.appointment.patient_name" readonly>
              </div>
              <div class="form-group">
                <label for="doctor_name">Doctor Name:</label>
                <input type="text" class="form-control" id="doctor_name" v-model="this.$store.state.appointment.doctor_name" readonly>
              </div>
              <div class="form-group">
                <label for="appointment_date">Appointment Date:</label>
                <input type="datetime" class="form-control" id="appointment_date" v-model="this.$store.state.appointment.appointment_date" readonly>
              </div>
              <div class="form-group">
                <label for="reason">Reason:</label>
                <input type="text" class="form-control" id="reason" v-model="this.$store.state.appointment.reason" readonly>
              </div>
              <div class="form-group">
                <label for="status">Status:</label>
                <input type="text" class="form-control" id="status" v-model="this.$store.state.appointment.status" readonly>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" @click="OpenCloseModal()" class="btn btn-secondary">Close</button>
              <button type="button" @click="deleteAppointment()" class="btn btn-primary">Delete Appointment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
        return {
            openClose: this.visible,
            errors: null,
        };
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

    async deleteAppointment() {
        try {
            const response = await axios.delete(this.$store.state.apiUrl + '/deleteappointment/' +this.$store.state.appointment.id, {
            });
            if (response.status === 204) {
            this.openClose = !this.openClose
            this.$emit('update:visible', false); // Emit an event with the new value
            this.$emit('modal-closed'); // Emit an event indicating modal is closed
            }
        } catch (error) {
            alert(error.response.data.message);
            // this.errors = error.response.data.message;
        }
    },
    },
    watch: { 
      visible: {
        handler(newVal) {
          this.openClose = newVal;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any custom styles for the DeleteAppointment component here */
  </style>
  