<template>
  <div>
    <button @click="toggleProfileDisplay">{{ displayProfile ? 'Hide Profile' : 'Doctor Profile' }}</button>
    <div v-if="displayProfile">
      <h2>Doctor Profile</h2>
      <form @submit.prevent="updateProfile">
        <div>
          <label for="name">Name:</label>
          <input type="text" v-model="profile.name" />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="profile.email" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="profile.password" />
        </div>
        <div>
          <label for="doctorType">Doctor Type:</label>
          <input type="text" v-model="profile.doctorType" />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios'; // Import axios

export default {
  data() {
    return {
      displayProfile: false,
      profile: {
        name: '',
        email: '',
        password: '',
        doctorType: ''
      }
    };
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    toggleProfileDisplay() {
      this.displayProfile = !this.displayProfile;
      if (this.displayProfile) {
        this.fetchProfile();
      }
    },
    fetchProfile() {
      axios.get('/api/user')
        .then(response => {
          const user = response.data;
          if (user) {
            this.profile = { name: user.name, email: user.email, doctorType: user.doctorType };
          }
        })
        .catch(error => {
          console.error('Error fetching user profile: ', error);
        });
    },
    updateProfile() {
      // Implement your logic to update the profile
      // You can use this.profile to access the updated profile data
      // You can then dispatch an action to update the profile in Vuex store
    }
  }
};
</script>

<style scoped>
form div {
  margin-bottom: 1em;
}
label {
  display: block;
  margin-bottom: 0.5em;
}
button {
  display: block;
  padding: 0.5em 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25em;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
