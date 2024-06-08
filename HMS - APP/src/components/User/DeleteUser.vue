<template>
    <div>
      <!-- Modal -->
      <div v-if="openClose" class="modal fade show" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style="display:block">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Do you want to delete this user?</h5>                
              <button type="button" @click="OpenCloseModal()" class="btn-close"></button>
            </div>
            <div class="modal-body">
              <!-- Display user details to confirm deletion -->
              <div class="form-group">
                <label for="name">Name:</label>
                <!-- Display user name -->
                <input type="text" class="form-control" readonly id="name" :value="this.$store.state.user.name">
              </div>
              <div class="form-group mt-3">
                <label for="email">Email:</label>
                <!-- Display user email -->
                <input type="email" class="form-control" readonly id="email" :value="this.$store.state.user.email">
              </div>
            </div>
            <div class="modal-footer">
              <!-- Close button -->
              <button type="button" @click="OpenCloseModal()" class="btn btn-secondary">Close</button>
              <!-- Delete user button -->
              <button type="button" @click="DeleteUser()" class="btn btn-danger">Delete User</button>
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
      visible: Boolean, // Boolean prop for visibility of modal dialog
    },
    data() {
      return {
        openClose: this.visible, // Initial value for openClose variable based on visible prop
        errors: null,
      }
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
      async DeleteUser() {
        try {
          // Send a DELETE request to delete the user
          const response = await axios.delete(this.$store.state.apiUrl + '/deleteuser/'+this.$store.state.user.id, {
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
        // Watch for changes in the visible prop and update the openClose variable accordingly
        handler(newVal) {
          this.openClose = newVal;
        }
      }
    }
  }
  </script>
  