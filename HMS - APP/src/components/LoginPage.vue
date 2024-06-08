<template>
  <div class="container mt-5 col-3">
    <div class="row">
      <h4>Enter your email and password</h4>
      <form @submit.prevent="loginUser" class="col-12">
        <div class="form-group mt-3">
          <input type="email" class="form-control" id="email" v-model="email" placeholder="Enter email" required @input="clearErrors">
          <small class="text-danger" v-if="errors">{{ errors }}</small>
        </div>
        <div class="form-group mt-3">
          <input type="password" class="form-control" id="password" v-model="password" placeholder="Password" required @input="clearErrors">

        </div>
        <button type="submit" class="btn btn-primary mt-3 w-100">Login</button>
      </form>
    </div>
    <div class="row">
      <div class="col-12">
          <p class="mt-3 text-left">Don't have an account? <router-link to="/register">Register here!</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      errors: null
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post(this.$store.state.apiUrl + '/login', {
          email: this.email,
          password: this.password
        });

        // Check if the response status is 200 (OK) instead of 201 (Created)
        if (response.status === 200) {
          const { user_id, token, redirect } = response.data;

          localStorage.setItem('user_id', user_id);
          localStorage.setItem('token', token);

          // Redirect based on user role
          this.$router.push(redirect);
        } else {
          this.errors = 'Login failed. Please check your credentials.';
        }
      } catch (error) {
        this.errors = error.response.data.message;
      }
    },


    clearErrors() {
      this.errors = null;
    }
  }
};
</script>
