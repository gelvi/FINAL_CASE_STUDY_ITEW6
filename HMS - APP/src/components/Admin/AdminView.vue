<template>
    <div>
      <div class="row mt-2">
        <ul class="col-12 d-flex justify-content-end">
            <router-link to="/logout">Logout</router-link>
        </ul> 
      </div>
      <h1>Admin Dashboard</h1>
      <!-- Admin specific content -->
      <div class="row mt-3">
      <div class="col-12 d-flex justify-content-start">
        <router-link to="/amedicalrecords">
          <button class="btn btn-primary">View Medical Records</button>
        </router-link>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminView'
  };
  </script>
  