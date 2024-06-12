<template>
  <div class="container">
      <div class="row mt-2">
        <ul class="col-12 d-flex justify-content-end">
            <router-link to="/logout">Logout</router-link>
        </ul> 
      </div>
      <div class="row mt-2">
        <div class="col-md-6">
          <a @click="toggleCreatePatient" class="btn btn-primary">Add New Patient</a>
          <router-link to="/amedicalrecords">
          <button class="btn btn-primary">View Medical Records</button>
          </router-link>
        </div>
        <div class="col-md-6 d-flex justify-content-end">
          <input type="text" v-model="searchQuery" placeholder="Search..." @keyup.enter="searchPosts"> 
        </div>
      </div>
      <div class="row mt-2 table-container">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th class="text-center" width="25%">First Name</th>
                    <th class="text-center" width="30%">Last Name</th>
                    <th class="text-center" width="20%">Data of Birth</th>
                    <th class="text-center" width="25%">Gender</th>
                    <th class="text-center" width="25%">Address</th>
                    <th class="text-center" width="25%">Phone</th>
                    <th class="text-center" width="25%">Medical History</th>
                </tr>
            </thead>
            <tbody>
                <!-- Loop through the posts and display them in the table -->
                <!-- v-for is a v-for directive that iterates over the paginatedPosts array and displays each post in the table -->
                <tr v-for="patient in paginatedPosts" :key="patient.id">
                    <td class="text-center">{{ patient.firstname }}</td>
                    <td class="text-center">{{ patient.lastname }}</td>
                    <td class="text-center">{{ patient.date_of_birth }}</td>
                    <td class="text-center">{{ patient.gender }}</td>.
                    <td class="text-center">{{ patient.address }}</td>
                    <td class="text-center">{{ patient.phone }}</td>
                    <td class="text-center">{{ patient.medical_history }}</td>
                    <td class="text-center">{{ formatDate(patient.created_at) }}</td>
                    <td class="text-center">
                        <!-- Edit and Delete buttons -->
                        <!-- @click is a v-on directive that binds the click event to the toggleEditPatient function -->
                        <a @click="toggleEditPatient(patient.id)" class="btn btn-primary ms-2">Edit</a>
                        
                        <!-- @click is a v-on directive that binds the click event to the toggleDeletePatient function -->
                        <a @click="toggleDeletePatient(patient.id)" class="btn btn-danger ms-2">Delete</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="pagination-buttons">
          <button class="btn btn-primary" @click="previousPage" :disabled="currentPage === 1">Previous</button>
          <button class="btn btn-primary" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>
      <!-- Modal components -->
      <!-- the create post modal have a prop of visible and a prop of update:visible that is used to toggle the modal -->
      <CreatePatient :visible="showCreatePatient" @update:visible="toggleCreatePatient"/>
      
      <!-- the edit post modal have a prop of visible and a prop of update:visible that is used to toggle the modal -->
      <EditPatient :visible="showEditPatient" @update:visible="toggleEditPatient"/>
      
      <!-- the delete post modal have a prop of visible and a prop of update:visible that is used to toggle the modal -->
      <DeletePatient :visible="showDeletePatient" @update:visible="toggleDeletePatient"/>

    </div>
  <!-- the router view is where all the routes are rendered -->
  <router-view/> 
</template>
  
  <script>
  export default {
    name: 'PatientView'
  };
  </script>
  