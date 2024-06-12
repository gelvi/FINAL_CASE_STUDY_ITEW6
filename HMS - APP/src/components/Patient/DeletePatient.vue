<template>
    <div>
      <h2>Delete Patient</h2>
      <ul>
        <li v-for="patient in patients" :key="patient.id">
          {{ patient.name }} - {{ patient.age }}
          <button @click="deletePatient(patient.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        patients: [
          { id: 1, name: 'John Doe', age: 30 },
          { id: 2, name: 'Jane Smith', age: 25 }
        ] // Sample data, replace with data from your server
      }
    },
    methods: {
      deletePatient(patientId) {
        // Logic to delete the patient record (e.g., send request to the server)
        this.patients = this.patients.filter(patient => patient.id !== patientId)
        console.log(`Patient with ID ${patientId} deleted`)
      }
    }
  }
  </script>