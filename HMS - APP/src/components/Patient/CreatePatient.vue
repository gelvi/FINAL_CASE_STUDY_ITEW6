<template>
    <div>
      <h2>Create New Patient</h2>
      <form @submit.prevent="createPatient">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="patient.name" required />
        </div>
        <div>
          <label for="age">Age:</label>
          <input type="number" id="age" v-model="patient.age" required />
        </div>
        <div>
          <label for="medicalHistory">Medical History:</label>
          <textarea id="medicalHistory" v-model="patient.medicalHistory" required></textarea>
        </div>
        <button type="submit">Create Patient</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        patient: {
          name: '',
          age: '',
          medicalHistory: ''
        }
      }
    },
    methods: {
      createPatient() {
        // Logic to add the patient record (e.g., send data to the server)
        console.log('Patient created:', this.patient)
        // Reset the form after submission
        this.patient.name = ''
        this.patient.age = ''
        this.patient.medicalHistory = ''
      }
    }
  }
  </script>