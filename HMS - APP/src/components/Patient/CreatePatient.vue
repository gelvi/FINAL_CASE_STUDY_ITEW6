<template>
  <div>
    <!-- Modal -->
    <div v-if="openClose" class="modal fade show" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style="display:block">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Patient</h5>
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
              <label for="date_of_birth">Date of Birth:</label>
              <input type="date" class="form-control" id="date_of_birth" v-model="date_of_birth">
            </div>
            <!-- Dropdown for the gender -->
            <div class="form-group">
              <label for="gender">Gender:</label>
              <select class="form-control" id="gender" v-model="gender">
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <!-- Input field for the address -->
            <div class="form-group">
              <label for="address">Address:</label>
              <input type="text" class="form-control" id="address" v-model="address">
            </div>
            <!-- Input field for the phone -->
            <div class="form-group">
              <label for="phone">Phone:</label>
              <input type="text" class="form-control" id="phone" v-model="phone">
            </div>
            <!-- Input field for the medical history -->
            <div class="form-group mt-3">
              <label for="medical_history">Medical History:</label>
              <textarea class="form-control" id="medical_history" rows="3" v-model="medical_history"></textarea>
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
            <button type="button" @click="SaveNewPatient()" class="btn btn-primary">Save changes</button>
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
      date_of_birth: '',
      gender: '',
      address: '',
      phone: '',
      medical_history: '',
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
    async SaveNewPatient() {
      try {
        // it will call the endpoint /newpatient and create a new patient
        // The data will be sent in the body of the request
        const response = await axios.post(this.$store.state.apiUrl + '/newpatients', {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          date_of_birth: this.date_of_birth,
          gender: this.gender,
          address: this.address,
          phone: this.phone,
          medical_history: this.medical_history,
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
