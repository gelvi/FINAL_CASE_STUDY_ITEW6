<template>
    <div>
      <!-- Modal -->
      <div v-if="openClose" class="modal fade show" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style="display:block">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit User</h5>                
              <button type="button" @click="OpenCloseModal()" class="btn-close"></button>
            </div>
            <div class="modal-body">
              <!-- Input field for the name -->
              <div class="form-group">
                <label for="name">Name:</label>
                <!-- Input field for the name with v-model to bind to user's name -->
                <input type="text" class="form-control" id="name" v-model="this.$store.state.user.name" @input="updateUserName">
              </div>
              <!-- Input field for the email -->
              <div class="form-group mt-3">
                <label for="email">Email:</label>
                <!-- Input field for the email with v-model to bind to user's email -->
                <input type="email" class="form-control" id="email" v-model="this.$store.state.user.email" @input="updateUserEmail">
              </div>
              <div class="form-group mt-3">
                <label for="new-password">New Password:</label>
                <!-- Input field for the password with v-model to bind to user's password -->
                <input type="password" class="form-control" id="new-password" v-model="newPassword" @input="newpassword">
              </div>
              <div class="form-group mt-3">
                <label for="confirm-Password">Confirm Password:</label>
                <!-- Input field for the password with v-model to bind to user's password -->
                <input type="password" class="form-control" id="confirm-password" v-model="confirmPassword">
              </div>
            </div>
            <div class="modal-footer">
              <!-- Close button -->
              <button type="button" @click="OpenCloseModal()" class="btn btn-secondary">Close</button>
              <!-- Save changes button -->
              <button type="button" @click="UpdateUser()" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      visible: Boolean, // Prop for the visibility of the modal
      
    },
    data() {
      return {
        openClose: this.visible, // Initial value for openClose variable based on visible prop
        name: this.$store.state.user.name,
        email: this.$store.state.user.email,
        newPassword: '',
        confirmPassword: '',
        errors: null,
      }
    },
    methods: {
      updateUserName() {
          //the updateTitle method is used to update the title of the post thru dispatching an action to the store
          this.$store.dispatch('updateUserName', this.$store.state.user.name)
      },
      updateUserEmail() {
          //the updateContent method is used to update the content of the post thru dispatching an action to the store
          this.$store.dispatch('updateUserEmail', this.$store.state.user.email)
      },
      // updateUserPassword() {
      //     //the updateContent method is used to update the content of the post thru dispatching an action to the store
      //     this.$store.dispatch('updateUserPassword', this.$store.state.user.password)
      // },
      OpenCloseModal() {
        // Toggle modal visibility
        this.openClose = !this.openClose;
        // Emit an event indicating modal is closed
        this.$emit('update:visible', false);
      },
      async UpdateUser() {
        try {
          // Validate new password and confirmation match
          if (this.newPassword !== this.confirmPassword) {
            alert('Passwords do not match.');
            return;
          }
          // Send a PUT request to update the user
          const response = await axios.put(this.$store.state.apiUrl +'/updateuser/'+ this.$store.state.user.id, {
            name: this.$store.state.user.name,
            email: this.$store.state.user.email,
            password: this.newPassword,
            user_id: localStorage.getItem('user_id')
          });
          if (response.status === 200) {
            console.log(this.name, this.email)
            this.openClose = !this.openClose
            this.$emit('update:visible', false); // Emit an event with the new value
            this.$emit('modal-closed'); // Emit an event indicating modal is closed
          }
        } catch (error) {
            alert(error.response.data.message);
            // this.errors = error.response.data.message;
        }
      }
    },
    watch: {
      visible: {
          // immediate: !this.openClose,
          handler(newVal) {
              this.openClose = newVal;
          }
      }
    }
  }
  </script>
  