<template>
  <div >
    <!-- Modal -->
    <div v-if="openClose" class="modal fade show" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style="display:block">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Do you want to delete this patient?</h5>                
                    <button type="button" @click="OpenCloseModal()" class="btn-close" ></button>
                </div>
                <div class="modal-body">
                    <!-- Input field for the firstname -->
                    <div class="form-group">
                      <label for="firstname">First Name:</label>
                      <input type="text" class="form-control" id="firstname" v-model="this.$store.state.patient.firstname">
                    </div>
                    <!-- Input field for the lastname -->
                    <div class="form-group">
                      <label for="lastname">Last Name:</label>
                      <input type="text" class="form-control" id="lastname" v-model="this.$store.state.patient.lastname">
                    </div>
                    <!-- Input field for the email -->
                    <div class="form-group">
                      <label for="email">Email:</label>
                      <input type="email" class="form-control" id="email" v-model="this.$store.state.patient.email">
                    </div>
                    <!-- Input field for the date of birth -->
                    <div class="form-group">
                      <label for="date_of_birth">Date of Birth:</label>
                      <input type="date" class="form-control" id="date_of_birth" v-model="this.$store.state.patient.date_of_birth">
                    </div>
                    <!-- Dropdown for the gender -->
                    <div class="form-group">
                      <label for="gender">Gender:</label>
                      <select class="form-control" id="gender" v-model="this.$store.state.patient.gender">
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <!-- Input field for the address -->
                    <div class="form-group">
                      <label for="address">Address:</label>
                      <input type="text" class="form-control" id="address" v-model="this.$store.state.patient.address">
                    </div>
                    <!-- Input field for the phone -->
                    <div class="form-group">
                      <label for="phone">Phone:</label>
                      <input type="text" class="form-control" id="phone" v-model="this.$store.state.patient.phone">
                    </div>
                    <!-- Input field for the medical history -->
                    <div class="form-group mt-3">
                      <label for="medical_history">Medical History:</label>
                      <textarea class="form-control" id="medical_history" rows="3" v-model="this.$store.state.patient.medical_history"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <!-- v-on:click="OpenCloseModal()" is used to close the modal dialog -->
                    <button type="button"  @click="OpenCloseModal()" class="btn btn-secondary" >Close</button>
                    <!-- v-on:click="DeletePost()" is used to delete the post -->
                    <button type="button"  @click="deletePatient()" class="btn btn-primary">Delete Patient</button>
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
    OpenCloseModal() {
      this.openClose = !this.openClose
      //emit function is used to trigger custom events on a Vue instance or component. 
      //This allows you to communicate between child and parent components or between sibling components 
      //in a Vue.js application.
      this.$emit('update:visible', false); // Emit an event with the new value
      this.$emit('modal-closed'); // Emit an event indicating modal is closed
    },
    async deletePatient() {
      try {
        const response = await axios.delete(this.$store.state.apiUrl + '/deletepatient/' + this.$store.state.patient.id, {
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
          // immediate: !this.openClose,
          handler(newVal) {
              this.openClose = newVal;
          }
      }
  }
};
</script>

<style>
/* Add any custom styles for the DeleteProduct component here */
</style>
