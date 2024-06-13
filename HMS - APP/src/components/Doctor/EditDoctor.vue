<template>
  <div >
    <!-- Modal -->
    <div v-if="openClose" class="modal fade show" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style="display:block">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Doctor</h5>                
                    <button type="button" @click="OpenCloseModal()" class="btn-close" ></button>
                </div>
                <div class="modal-body">
                    <!-- Input field for the firstname -->
                    <div class="form-group">
                        <label for="firstname">First Name:</label>
                        
                        <input type="text" class="form-control" id="firstname" v-model="this.$store.state.doctor.firstname" @input="updateFirstName" >
                    </div>
                    <!-- Input field for the lastname -->
                    <div class="form-group ">
                        <label for="lastname">Last Name:</label>
                        
                        <input type="text"  class="form-control" id="lastname" v-model="this.$store.state.doctor.lastname" @input="updateLastName" >
                    </div>
                    <!-- Input field for the Email -->
                    <div class="form-group ">
                        <label for="price">email:</label>
                        
                        <input type="email"  class="form-control" id="email" v-model="this.$store.state.doctor.email" @input="updateDoctorEmail" >
                    </div>
                    <div class="form-group ">
                        <label for="specialization">Specialization:</label>
                        
                        <input type="text"  class="form-control" id="specialization" v-model="this.$store.state.doctor.specialization" @input="updateSpecialization" >
                    </div>
                    <div class="form-group ">
                        <label for="license_number">License Number:</label>
                        
                        <input type="text"  class="form-control" id="license_number" v-model="this.$store.state.doctor.license_number" @input="updateLicenseNumber" >
                    </div>
                    <div class="form-group ">
                        <label for="years_of_experience">Years of Experience:</label>
                        
                        <input type="text"  class="form-control" id="years_of_experience" v-model="this.$store.state.doctor.years_of_experience" @input="updateYearsOfExperience" >
                    </div>
                </div>
                <div class="modal-footer">
                    <!-- the @click="OpenCloseModal()" is used to close the modal when the close button is clicked -->
                    <button type="button"  @click="OpenCloseModal()" class="btn btn-secondary" >Close</button>
                    <!-- the @click="UpdateProduct()" is used to update the post when the save button is clicked -->
                    <button type="button"  @click="updateDoctor()" class="btn btn-primary">Save changes</button>
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
        firstname: this.$store.state.doctor.firstname,
        lastname: this.$store.state.doctor.lastname,
        email: this.$store.state.doctor.email,
        specialization: this.$store.state.doctor.specialization,
        license_number: this.$store.state.doctor.license_number,
        years_of_experience: this.$store.state.doctor.years_of_experience,
    };
  },
  props: {
    visible: Boolean
  },
  methods: {
    updateFirstName() {
      //the updateName method is used to update the title of the product thru dispatching an action to the store
      this.$store.dispatch('updateFirstName', this.$store.state.doctor.firstname)
    },
    updateLastName() {
      //the updateDescription method is used to update the content of the product thru dispatching an action to the store
      this.$store.dispatch('updateLastName', this.$store.state.doctor.lastname)
    },
    updateDoctorEmail() {
      //the updatePrice method is used to update the content of the product thru dispatching an action to the store
      this.$store.dispatch('updateDoctorEmail', this.$store.state.doctor.email)
    },
    updateSpecialization() {
      //the updatePrice method is used to update the content of the product thru dispatching an action to the store
      this.$store.dispatch('updateSpecialization', this.$store.state.doctor.specialization)
    },
    updateLicenseNumber() {
      //the updatePrice method is used to update the content of the product thru dispatching an action to the store
      this.$store.dispatch('updateLicenseNumber', this.$store.state.doctor.license_number)
    },
    updateYearsOfExperience() {
      //the updatePrice method is used to update the content of the product thru dispatching an action to the store
      this.$store.dispatch('updateYearsOfExperience', this.$store.state.doctor.years_of_experience)
    },
    OpenCloseModal() {
        this.openClose = !this.openClose
        //emit function is used to trigger custom events on a Vue instance or component. 
        //This allows you to communicate between child and parent components or between sibling components 
        //in a Vue.js application.
        this.$emit('update:visible', false); // Emit an event with the new value
        this.$emit('modal-closed'); // Emit an event indicating modal is closed
    },
    async updateDoctor() {
      try {
        const response = await axios.put(this.$store.state.apiUrl +'/updatedoctor/'+ this.$store.state.doctor.id, {
            firstname: this.$store.state.doctor.firstname,
            lastname: this.$store.state.doctor.lastname,
            email: this.$store.state.doctor.email,
            specialization: this.$store.state.doctor.specialization,
            license_number: this.$store.state.doctor.license_number,
            years_of_experience: this.$store.state.doctor.years_of_experience,
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
