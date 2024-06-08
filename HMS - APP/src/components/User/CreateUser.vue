<template>
    <div>
      <!-- Modal -->
      <div v-if="openClose" class="modal fade show" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style="display:block">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Create User</h5>                
              <button type="button" @click="OpenCloseModal()" class="btn-close"></button>
            </div>
            <div class="modal-body">
              <!-- Input field for the name -->
              <div class="form-group">
                <label for="name">Name:</label>
                <!-- Input field for the name -->
                <input type="text" class="form-control" id="name" v-model="name">
              </div>
              <!-- Input field for the email -->
              <div class="form-group mt-3">
                <label for="email">Email:</label>
                <!-- Input field for the email -->
                <input type="email" class="form-control" id="email" v-model="email">
              </div>
              <div class="form-group mt-3">
                <label for="email">Password:</label>
                <!-- Input field for the email -->
                <input type="password" class="form-control" id="password" v-model="password">
              </div>
            </div>
            <div class="modal-footer">
              <!-- Close button -->
              <button type="button" @click="OpenCloseModal()" class="btn btn-secondary">Close</button>
              <!-- Save changes button -->
              <button type="button" @click="SaveNewUser()" class="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "CreateUser",
    data() {
      return {
        openClose: this.visible, // Initial value for openClose variable based on visible prop
        name: '', // Name input field value
        email: '', // Email input field value
        password: '', // Email input field value
        errors: null // Error messages
      }
    },
    props: {
      visible: Boolean // Prop for the visibility of the modal
    },
    methods: {
      OpenCloseModal() {
        this.openClose = !this.openClose
        this.$emit('update:visible', false); // Emit an event with the new value
        this.$emit('modal-closed'); // Emit an event indicating modal is closed
        // console.log("child " +this.openClose)
      },
      async SaveNewUser() {
        try {
          // Send a POST request to create a new user
          const response = await axios.post(this.$store.state.apiUrl + '/newusers', {
            name: this.name,
            email: this.email,
            password: this.password,
            user_id: localStorage.getItem('user_id')
          });
          if (response.status === 201) {
              this.openClose = !this.openClose
              this.$emit('update:visible', false); // Emit an event with the new value
              this.$emit('modal-closed'); // Emit an event indicating modal is closed
          }
        } catch (error) {
            // Handle login error, show error message to the user
            // the errors will be displayed in the template using v-if directives
            alert(error.response.data.message);
            this.errors = error.response.data.message;
        }
      }
    },
    watch: {
      // watch for changes in the visible prop
      // and update the openClose variable accordingly
      visible: {
          // immediate: !this.openClose,
          handler(newVal, oldVal) {
              this.openClose = newVal;
              console.log('new ' +newVal+ '==' +oldVal)
          }
      }
    }
  }
  </script>
  