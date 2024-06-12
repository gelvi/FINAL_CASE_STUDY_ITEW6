<template>
    <div>
      <h2>Edit Patient</h2>
      <ul>
        <li v-for="patient in patients" :key="patient.id">
          {{ patient.name }} - {{ patient.age }}
          <button @click="editPatient(patient)">Edit</button>
        </li>
      </ul>
      <div v-if="selectedPatient">
        <h3>Edit Details for {{ selectedPatient.name }}</h3>
        <form @submit.prevent="updatePatient">
          <div>
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="selectedPatient.name" required />
          </div>
          <div>
            <label for="age">Age:</label>
            <input type="number" id="age" v-model="selectedPatient.age" required />
          </div>
          <div>
            <label for="medicalHistory">Medical History:</label>
            <textarea id="medicalHistory" v-model="selectedPatient.medicalHistory" required></textarea>
          </div>
          <button type="submit">Update Patient</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        patients: [
          { id: 1, name: 'John Doe', age: 30, medicalHistory: 'History 1' },
          { id: 2, name: 'Jane Smith', age: 25, medicalHistory: 'History 2' }
        ], // Sample data, replace with data from your server
        selectedPatient: null
      }
    },
    methods: {
      editPatient(patient) {
        this.selectedPatient = { ...patient }
      },
      updatePatient() {
        // Logic to update the patient record (e.g., send data to the server)
        const index = this.patients.findIndex(p => p.id === this.selectedPatient.id)
        if (index !== -1) {
          this.$set(this.patients, index, this.selectedPatient)
        }
        console.log('Patient updated:', this.selectedPatient)
        this.selectedPatient = null
      }
    }
  }
  </script>