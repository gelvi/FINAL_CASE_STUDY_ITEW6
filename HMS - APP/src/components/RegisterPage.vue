<template>
  <div class="background-container">
    <div class="container mt-5 ">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6 col-xl-4">
          <div class="registration-card p-4">
            <h4 class="text-center mb-4">Registration Form</h4>
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
                <div class="form-group mb-3">
                  <input type="text" class="form-control" v-model="medical_history" placeholder="Enter medical history" required>
                </div>
              </div>

              <button type="submit" class="btn btn-primary mt-4 w-100">Register</button>
              <router-link to="/" class="btn btn-secondary mt-3 w-100 text-center">Back</router-link>
            </form>
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
      phone: '',
      medical_history: ''
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
            medical_history: this.medical_history
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
      this.medical_history = '';
    },
    clearErrors(field) {
      this.errors[field] = null;
    }
  }
};
</script>

<style scoped>
.background-container {
  background-image: url('@/assets/backgroundPic.jpg'); /* Path to your background image */
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  background-color: rgba(248, 249, 250, 0.9); /* Adjusted for a semi-transparent white background */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.registration-card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h4 {
  font-family: 'Arial', sans-serif;
  color: #333;
  text-align: center;
}

.form-control {
  border-radius: 4px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}

.text-center {
  text-align: center;
}

.mb-3 {
  margin-bottom: 1rem !important;
}

.mt-3 {
  margin-top: 1rem !important;
}

.mt-4 {
  margin-top: 1.5rem !important;
}

.w-100 {
  width: 100% !important;
}

.text-danger {
  color: #dc3545 !important;
}
</style>