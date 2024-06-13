<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light custom-navbar">
      <div class="container">
        <router-link class="navbar-brand" to="/doctordashboard">Patient Dashboard</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/medicalRecords">Medical Records</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'PatientNavbar'
  };
  </script>
  
  <style scoped>
  .custom-navbar {
    background-color: #343a40 !important;
  }
  
  .navbar-brand {
    color: #fff !important;
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .navbar-brand:hover {
    color: #f8f9fa !important;
  }
  
  .nav-link {
    color: #f8f9fa !important;
    font-size: 1.1rem;
    margin-left: 1rem;
  }
  
  .nav-link:hover {
    color: #ffc107 !important;
    text-decoration: underline;
  }
  
  .nav-item:last-child .nav-link {
    margin-right: 0;
  }
  </style>
  