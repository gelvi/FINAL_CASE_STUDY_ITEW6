<template>
    <div>
      <!-- Modal -->
      <div v-if="openClose" class="modal fade show" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style="display:block">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add Medical Record</h5>
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
              <!-- Textarea for diagnosis -->
              <div class="form-group">
                <label for="diagnosis">Diagnosis:</label>
                <textarea class="form-control" id="diagnosis" v-model="diagnosis"></textarea>
              </div>
              <!-- Textarea for treatment -->
              <div class="form-group">
                <label for="treatment">Treatment:</label>
                <textarea class="form-control" id="treatment" v-model="treatment"></textarea>
              </div>
              <!-- Textarea for prescription -->
              <div class="form-group">
                <label for="prescription">Prescription:</label>
                <textarea class="form-control" id="prescription" v-model="prescription"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" @click="OpenCloseModal()" class="btn btn-secondary">Close</button>
              <button type="button" @click="SaveNewMedicalRecord()" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "CreateMedicalRecord",
    data() {
      return {
        openClose: this.visible,
        patient_id: '',
        doctor_id: '',
        diagnosis: '',
        treatment: '',
        prescription: '',
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
      async SaveNewMedicalRecord() {
        try {
          console.log("Saving new medical record...");
          // Get the selected patient and doctor names
          const selectedPatient = this.patients.find(patient => patient.id === this.patient_id);
          const selectedDoctor = this.doctors.find(doctor => doctor.id === this.doctor_id);
          
          // Check if both patient and doctor are selected
          if (!selectedPatient || !selectedDoctor) {
            console.error("Patient or doctor not selected");
            return;
          }
  
          const response = await axios.post(this.$store.state.apiUrl + '/newmedicalrecords', {
            patient_id: this.patient_id,
            doctor_id: this.doctor_id,
            patient_name: `${selectedPatient.firstname} ${selectedPatient.lastname}`,
            doctor_name: `Dr. ${selectedDoctor.firstname} ${selectedDoctor.lastname}`,
            diagnosis: this.diagnosis,
            treatment: this.treatment,
            prescription: this.prescription,
          });
  
          console.log("Medical record saved: ", response.data);
          if (response.status === 201) {
            this.$emit('update:visible', false); // Emit an event with the new value
            this.$emit('modal-closed'); // Emit an event indicating modal is closed
          }
        } catch (error) {
          console.error("Error saving medical record: ", error);
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
  