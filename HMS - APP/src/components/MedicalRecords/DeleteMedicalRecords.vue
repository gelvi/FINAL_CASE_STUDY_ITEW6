<template>
    <div>
      <!-- Modal -->
      <div v-if="openClose" class="modal fade show" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style="display:block">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Do you want to delete this medical record?</h5>
              <button type="button" @click="OpenCloseModal()" class="btn-close"></button>
            </div>
            <div class="modal-body">
              <!-- Displaying medical record details -->
              <div class="form-group">
                <label for="patient_name">Patient Name:</label>
                <input type="text" class="form-control" id="patient_name" v-model="this.$store.state.medicalrecord.patient_name" readonly>
              </div>
              <div class="form-group">
                <label for="doctor_name">Doctor Name:</label>
                <input type="text" class="form-control" id="doctor_name" v-model="this.$store.state.medicalrecord.doctor_name" readonly>
              </div>
              <div class="form-group">
                <label for="diagnosis">Diagnosis:</label>
                <input type="text" class="form-control" id="diagnosis" v-model="this.$store.state.medicalrecord.diagnosis" readonly>
              </div>
              <div class="form-group">
                <label for="treatment">Treatment:</label>
                <input type="text" class="form-control" id="treatment" v-model="this.$store.state.medicalrecord.treatment" readonly>
              </div>
              <div class="form-group">
                <label for="prescription">Prescription:</label>
                <input type="text" class="form-control" id="prescription" v-model="this.$store.state.medicalrecord.prescription" readonly>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" @click="OpenCloseModal()" class="btn btn-secondary">Close</button>
              <button type="button" @click="deleteMedicalRecord()" class="btn btn-danger">Delete Medical Record</button>
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
    computed: {
    // Access the patient and doctor details from the store state
    patients() {
        return this.$store.state.patients;
    },
    doctors() {
        return this.$store.state.doctors;
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
      async deleteMedicalRecord() {
        try {
          const response = await axios.delete(this.$store.state.apiUrl + '/deletemedicalrecords/' + this.$store.state.medicalrecord.id);
          if (response.status === 204) {
            this.openClose = !this.openClose;
            this.$emit('update:visible', false); // Emit an event with the new value
            this.$emit('modal-closed'); // Emit an event indicating modal is closed
          }
        } catch (error) {
          console.error("Error deleting medical record:", error);
          if (error.response && error.response.data) {
            alert(error.response.data.message);
          }
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
  /* Add any custom styles for the DeleteMedicalRecords component here */
  </style>
  