<template>
  <div >
    <!-- Modal -->
    <div v-if="openClose" class="modal fade show" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style="display:block">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Patient</h5>                
                    <button type="button" @click="OpenCloseModal()" class="btn-close" ></button>
                </div>
                <div class="modal-body">
                    <!-- Input field for the firstname -->
                    <div class="form-group">
                        <label for="firstname">First Name:</label>
                        
                        <input type="text" class="form-control" id="firstname" v-model="this.$store.state.patient.firstname" @input="updateFirstName" >
                    </div>
                    <!-- Input field for the lastname -->
                    <div class="form-group ">
                        <label for="lastname">Last Name:</label>
                        
                        <input type="text"  class="form-control" id="lastname" v-model="this.$store.state.patient.lastname" @input="updateLastName" >
                    </div>
                    <!-- Input field for the Email -->
                    <div class="form-group ">
                        <label for="price">email:</label>
                        
                        <input type="email"  class="form-control" id="email" v-model="this.$store.state.patient.email" @input="updatePatientEmail" >
                    </div>
                    <div class="form-group ">
                        <label for="date_of_birth">Date of Birth:</label>
                        
                        <input type="date"  class="form-control" id="date_of_birth" v-model="this.$store.state.patient.date_of_birth" @input="updateBirthday" >
                    </div>
                    <div class="form-group ">
                        <label for="gender">Gender:</label>
                        
                        <input type="text"  class="form-control" id="gender" v-model="this.$store.state.patient.gender" @input="updateGender" >
                    </div>
                    <div class="form-group ">
                        <label for="address">Address:</label>
                        
                        <input type="text"  class="form-control" id="address" v-model="this.$store.state.patient.address" @input="updateAddress" >
                    </div>
                    <div class="form-group ">
                        <label for="phone">Phone:</label>
                        
                        <input type="text"  class="form-control" id="phone" v-model="this.$store.state.patient.phone" @input="updatePhone" >
                    </div>
                    <div class="form-group mt-3">
                        <label for="medical_history">Medical History:</label>
                        
                        <textarea type="text"  class="form-control" id="medical_history" rows="3" v-model="this.$store.state.patient.medical_history" @input="updateMedHistory" ></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <!-- the @click="OpenCloseModal()" is used to close the modal when the close button is clicked -->
                    <button type="button"  @click="OpenCloseModal()" class="btn btn-secondary" >Close</button>
                    <!-- the @click="UpdateProduct()" is used to update the post when the save button is clicked -->
                    <button type="button"  @click="updatePatient()" class="btn btn-primary">Save changes</button>
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
        firstname: this.$store.state.patient.firstname,
        lastname: this.$store.state.patient.lastname,
        email: this.$store.state.patient.email,
        date_of_birth: this.$store.state.patient.date_of_birth,
        gender: this.$store.state.patient.gender,
        address: this.$store.state.patient.address,
        phone: this.$store.state.patient.phone,
        medical_history: this.$store.state.patient.medical_history,

    };
  },
  props: {
    visible: Boolean
  },
  methods: {
    updateFirstName() {
      //the updateName method is used to update the title of the product thru dispatching an action to the store
      this.$store.dispatch('updateFirstName', this.$store.state.patient.firstname)
    },
    updateLastName() {
      //the updateDescription method is used to update the content of the product thru dispatching an action to the store
      this.$store.dispatch('updateLastName', this.$store.state.patient.lastname)
    },
    updatePatientEmail() {
      //the updatePrice method is used to update the content of the product thru dispatching an action to the store
      this.$store.dispatch('updatePatientEmail', this.$store.state.patient.email)
    },
    updateBirthday() {
      //the updatePrice method is used to update the content of the product thru dispatching an action to the store
      this.$store.dispatch('updateBirthday', this.$store.state.patient.date_of_birth)
    },
    updateAddress() {
      //the updatePrice method is used to update the content of the product thru dispatching an action to the store
      this.$store.dispatch('updateAddress', this.$store.state.patient.address)
    },
    updateGender() {
      //the updatePrice method is used to update the content of the product thru dispatching an action to the store
      this.$store.dispatch('updateGender', this.$store.state.patient.gender)
    },
    updatePhone() {
      //the updatePrice method is used to update the content of the product thru dispatching an action to the store
      this.$store.dispatch('updatePhone', this.$store.state.patient.phone)
    },
    updateMedHistory() {
      //the updatePrice method is used to update the content of the product thru dispatching an action to the store
      this.$store.dispatch('updateMedHistory', this.$store.state.patient.medical_history)
    },
    OpenCloseModal() {
        this.openClose = !this.openClose
        //emit function is used to trigger custom events on a Vue instance or component. 
        //This allows you to communicate between child and parent components or between sibling components 
        //in a Vue.js application.
        this.$emit('update:visible', false); // Emit an event with the new value
        this.$emit('modal-closed'); // Emit an event indicating modal is closed
    },
    async updatePatient() {
      try {
        const response = await axios.put(this.$store.state.apiUrl +'/updatepatient/'+ this.$store.state.patient.id, {
            firstname: this.$store.state.patient.firstname,
            lastname: this.$store.state.patient.lastname,
            email: this.$store.state.patient.email,
            date_of_birth: this.$store.state.patient.date_of_birth,
            address: this.$store.state.patient.address,
            gender: this.$store.state.patient.gender,
            phone: this.$store.state.patient.phone,
            medical_history: this.$store.state.patient.medical_history,
            user_id: localStorage.getItem('user_id')
        });

        if (response.status === 200) {
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
};
</script>

<style>
/* Add any custom styles for the EditProduct component here */
</style>
