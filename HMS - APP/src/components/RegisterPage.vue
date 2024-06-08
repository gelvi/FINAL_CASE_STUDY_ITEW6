<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6 col-xl-4">
        <h4>Registration Form</h4>
        <form @submit.prevent="registerUser">
          <div class="form-group mb-3">
            <input type="text" class="form-control" id="firstname" v-model="firstname" @input="clearErrors('firstname')" placeholder="Enter first name" required>
          </div>
          <div class="form-group mb-3">
            <input type="text" class="form-control" id="lastname" v-model="lastname" @input="clearErrors('lastname')" placeholder="Enter last name" required>
          </div>
          <div class="form-group mb-3">
            <input type="email" class="form-control" id="email" v-model="email" @input="clearErrors('email')" placeholder="Enter email" required>
            <small class="text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
          </div>
          <div class="form-group mb-3">
            <input type="password" class="form-control" id="password" v-model="password" @input="clearErrors('password')" placeholder="Password" required>
            <small class="text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
          </div>
          <div class="form-group mb-3">
            <input type="password" class="form-control" id="confirm" v-model="confirm" placeholder="Confirm Password" required>
          </div>
          <div class="form-group mb-3">
            <select class="form-control" id="role" v-model="role" @change="clearErrors('role')" required>
              <option value="" disabled>Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Doctor">Doctor</option>
              <option value="Patient">Patient</option>
            </select>
            <small class="text-danger" v-if="errors.role">{{ errors.role[0] }}</small>
          </div>

          <!-- Conditional fields for Doctor -->
          <div v-if="role === 'Doctor'">
            <div class="form-group mb-3">
              <input type="text" class="form-control" v-model="specialization" placeholder="Enter specialization" required>
            </div>
            <div class="form-group mb-3">
              <input type="text" class="form-control" v-model="license_number" placeholder="Enter license number" required>
            </div>
            <div class="form-group mb-3">
              <input type="number" class="form-control" v-model="years_of_experience" placeholder="Enter years of experience" required>
            </div>
          </div>

          <!-- Conditional fields for Patient -->
          <div v-if="role === 'Patient'">
            <div class="form-group mb-3">
              <input type="date" class="form-control" v-model="date_of_birth" placeholder="Enter date of birth" required>
            </div>
            <div class="form-group mb-3">
              <select class="form-control" v-model="gender" required>
                <option value="" disabled>Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div class="form-group mb-3">
              <input type="text" class="form-control" v-model="address" placeholder="Enter address" required>
            </div>
            <div class="form-group mb-3">
              <input type="text" class="form-control" v-model="phone" placeholder="Enter phone number" required>
            </div>
          </div>

          <button type="submit" class="btn btn-primary mt-3 w-100">Register</button>
          <router-link to="/" class="btn btn-secondary mt-3 w-100 text-center">Back</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirm: '',
      role: '', // Add role to data properties
      errors: {},
      // Additional fields for Doctor
      specialization: '',
      license_number: '',
      years_of_experience: '',
      // Additional fields for Patient
      date_of_birth: '',
      gender: '',
      address: '',
      phone: ''
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post(this.$store.state.apiUrl + '/register', {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirm,
          role: this.role,
          ...(this.role === 'Doctor' && {
            specialization: this.specialization,
            license_number: this.license_number,
            years_of_experience: this.years_of_experience,
          }),
          ...(this.role === 'Patient' && {
            date_of_birth: this.date_of_birth,
            gender: this.gender,
            address: this.address,
            phone: this.phone,
          })
        });
        if (response.status === 201) {
          this.resetForm();
          alert('Registration successful');
          this.$router.push('/');
        }
      } catch (error) {
        console.error('Error response:', error.response); // Debugging log
        if (error.response && error.response.data) {
          this.errors = error.response.data;
        } else {
          console.error('Unknown error:', error);
        }
      }
    },

    resetForm() {
      this.firstname = '';
      this.lastname = '';
      this.email = '';
      this.password = '';
      this.confirm = '';
      this.role = '';
      this.specialization = '';
      this.license_number = '';
      this.years_of_experience = '';
      this.date_of_birth = '';
      this.gender = '';
      this.address = '';
      this.phone = '';
    },
    clearErrors(field) {
      this.errors[field] = null;
    }
  }
};
</script>
