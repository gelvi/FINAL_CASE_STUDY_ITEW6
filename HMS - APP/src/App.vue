<template>
  <div id="app">
    <title>HMS gelvi</title>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Login</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-5">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // Assign in root component to easily change the API URL in the production environment
      // It can be accessed using this.$root.$data.apiUrl in any component
      apiUrl: 'http://127.0.0.1:8000/api'
    }
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.footer {
  background-color: #f1f1f1;
  text-align: center;
  padding: 1rem;
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>