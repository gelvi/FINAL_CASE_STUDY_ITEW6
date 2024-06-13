<template>
  <div>
    <!-- Modal -->
    <div v-if="openClose" class="modal fade show" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style="display:block">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Doctor</h5>
            <button type="button" @click="OpenCloseModal()" class="btn-close"></button>
          </div>
          <div class="modal-body">
            <!-- Input field for the firstname -->
            <div class="form-group">
              <label for="firstname">First Name:</label>
              <input type="text" class="form-control" id="firstname" v-model="firstname">
            </div>
            <!-- Input field for the lastname -->
            <div class="form-group">
              <label for="lastname">Last Name:</label>
              <input type="text" class="form-control" id="lastname" v-model="lastname">
            </div>
            <!-- Input field for the email -->
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" class="form-control" id="email" v-model="email">
            </div>
            <!-- Input field for the date of birth -->
            <div class="form-group">
              <label for="specialization">Specialization:</label>
              <input type="text" class="form-control" id="specialization" v-model="specialization">
            </div>
            <!-- Input field for the address -->
            <div class="form-group">
              <label for="license_number">License Number:</label>
              <input type="text" class="form-control" id="license_number" v-model="license_number">
            </div>
            <!-- Input field for the phone -->
            <div class="form-group">
              <label for="years_of_experience">Years of experience:</label>
              <input type="text" class="form-control" id="years_of_experience" v-model="years_of_experience">
            </div>
            <!-- Input field for the password -->
            <div class="form-group mt-3">
                <label for="email">Password:</label>
                <!-- Input field for the email -->
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" @click="OpenCloseModal()" class="btn btn-secondary">Close</button>
            <button type="button" @click="SaveNewDoctor()" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "CreatePatient",
  data() {
    return {
      openClose: this.visible,
      firstname: '',
      lastname: '',
      email: '',
      specialization: '',
      license_number: '',
      years_of_experience: '',
      password: '',
      errors: null
    }
  },
  props: {
    visible: Boolean
  },
  methods: {
    OpenCloseModal() {
      this.openClose = !this.openClose
      this.$emit('update:visible', false); // Emit an event with the new value
      this.$emit('modal-closed'); // Emit an event indicating modal is closed
    },
    async SaveNewDoctor() {
      try {
        // it will call the endpoint /newpatient and create a new patient
        // The data will be sent in the body of the request
        const response = await axios.post(this.$store.state.apiUrl + '/newdoctors', {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          specialization: this.specialization,
          license_number: this.license_number,
          years_of_experience: this.years_of_experience,
          password: this.password,
          user_id: localStorage.getItem('user_id')
        });
        // if the response status is 201 (created), it means the patient was created successfully
        if (response.status === 201) {
          this.openClose = !this.openClose
          this.$emit('update:visible', false); // Emit an event with the new value
          this.$emit('modal-closed'); // Emit an event indicating modal is closed
        }
      } catch (error) {
        // Handle error, show error message to the user
        alert(error.response.data.message);
        this.errors = error.response.data.message;
      }
    }
  },
  watch: {
    // watch for changes in the visible prop
    // and update the openClose variable accordingly
    visible: {
      handler(newVal, oldVal) {
        this.openClose = newVal;
        console.log('new ' + newVal + '==' + oldVal)
      }
    }
  }
}
</script>

<style scoped>

</style>
