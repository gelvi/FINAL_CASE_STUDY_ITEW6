<template>
  <div class="container">
    <div class="row mt-2">
      <div class="col-12 d-flex justify-content-end">
        <router-link to="/logout" class="btn btn-danger logout-button">Logout</router-link>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12 col-md-6 mb-2 mb-md-0">
        <button @click="toggleCreateUser" class="btn btn-primary w-100 w-md-auto">Create New User</button>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-end">
        <input type="text" v-model="searchQuery" class="form-control" placeholder="Search..." @keyup.enter="searchUsers">
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12 table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th class="text-center" width="25%">Name</th>
              <th class="text-center" width="30%">Email</th>
              <th class="text-center" width="20%">Created At</th>
              <th class="text-center" width="25%">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in paginatedUsers" :key="user.id">
              <td class="text-center">{{ user.name }}</td>
              <td class="text-center">{{ user.email }}</td>
              <td class="text-center">{{ formatDate(user.created_at) }}</td>
              <td class="text-center">
                <button @click="toggleEditUser(user.id)" class="btn btn-primary ms-2">Edit</button>
                <button @click="toggleDeleteUser(user.id)" class="btn btn-danger ms-2">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-12 pagination-buttons d-flex justify-content-between mt-3">
        <button class="btn btn-primary" @click="previousPage" :disabled="currentPage === 1">Previous</button>
        <button class="btn btn-primary" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
    <!-- Modal components -->
    <CreateUser :visible="showCreateUser" @update:visible="toggleCreateUser"/>
    <EditUser :visible="showEditUser" @update:visible="toggleEditUser"/>
    <DeleteUser :visible="showDeleteUser" @update:visible="toggleDeleteUser"/>
  </div>
  <!-- the router view is where all the routes are rendered -->
  <router-view/>
</template>

  <script>
  import CreateUser from './CreateUser.vue';
  import EditUser from './EditUser.vue';
  import DeleteUser from './DeleteUser.vue';
  
  export default {
    name: 'ViewUser',
    components: {
      CreateUser,
      EditUser,
      DeleteUser
    },
    data() {
      return {
        showCreateUser: false,
        showEditUser: false,
        showDeleteUser: false,
        currentPage: 1,
        itemsPerPage: 10,
        searchQuery: ''
      }
    },
    mounted() {
      this.fetchUsers();
    },
    computed: {
      users() {
        return this.$store.state.users;
      },
      totalPages() {
        return Math.ceil(this.$store.state.users.length / this.itemsPerPage);
      },
      paginatedUsers() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = this.currentPage * this.itemsPerPage;
        return this.$store.state.users.slice(startIndex, endIndex);
      },
    },
    methods: {
      fetchUsers() {
        this.$store.getters.getUsers
          .then(users => {
            this.users = users;
          })
          .catch(error => {
            console.error("Error fetching users:", error);
          });      
      },
      searchUsers() {
        this.$store.dispatch('filteredUsers', this.searchQuery);
        this.currentPage = 1;
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      },
      toggleCreateUser() {
        this.showCreateUser = !this.showCreateUser;
        if (!this.showCreateUser) {
          this.$store.dispatch('refreshUsers');
        }
      },
      toggleEditUser(id) {
        this.$store.getters.getUser(id);
        this.showEditUser = !this.showEditUser;
        if (!this.showEditUser) {
          this.$store.dispatch('refreshUsers');
        }
      },
      toggleDeleteUser(id) {
        this.$store.getters.getUser(id);
        this.showDeleteUser = !this.showDeleteUser;
        if (!this.showDeleteUser) {
          this.$store.dispatch('refreshUsers');
        }
      },
      previousPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
    }
  }
  </script>
  
  <style scoped>
  .table-responsive {
    overflow-x: auto;
  }
  
  .logout-button {
    background-color: red;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    text-decoration: none;
  }
  
  .pagination-buttons button {
    margin: 0 5px;
  }
  
  @media (max-width: 768px) {
    .pagination-buttons {
      flex-direction: column;
    }
  
    .pagination-buttons button {
      margin-bottom: 10px;
    }
  }
  </style>
  