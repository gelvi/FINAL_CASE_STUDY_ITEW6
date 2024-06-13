<template>
  <div>
    <div class="container mt-4">
      <div class="row mt-2">
        <ul class="col-12 d-flex justify-content-end">
          <router-link to="/logout" class="btn btn-outline-danger">Logout</router-link>
        </ul>
      </div>
      <div class="row mt-4">
        <div class="col-md-6 d-flex align-items-center">
          <button @click="goBack" class="btn btn-secondary">Back</button>
          <button @click="toggleCreateMedicalRecord" class="btn btn-primary ml-2">Add New Medical Record</button>
        </div>
        <div class="col-md-6 d-flex justify-content-end align-items-center">
          <input type="text" class="form-control w-50" v-model="searchQuery" placeholder="Search..." @keyup.enter="searchMedicalRecord">
        </div>
      </div>
      <div class="row mt-4 table-container">
        <div class="col-12 table-responsive">
          <table class="table table-striped table-bordered">
            <thead class="thead-dark">
              <tr>
                <th class="text-center">Patient ID</th>
                <th class="text-center">Doctor ID</th>
                <th class="text-center">Diagnosis</th>
                <th class="text-center">Treatment</th>
                <th class="text-center">Prescription</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in paginatedMedicalRecords" :key="record.id">
                <td class="text-center">{{ record.patient_id }}</td>
                <td class="text-center">{{ record.doctor_id }}</td>
                <td class="text-center">{{ record.diagnosis }}</td>
                <td class="text-center">{{ record.treatment }}</td>
                <td class="text-center">{{ record.prescription }}</td>
                <td class="text-center">
                  <button @click="toggleEditMedicalRecord(record.id)" class="btn btn-primary ms-2">Edit</button>
                  <button @click="toggleDeleteMedicalRecord(record.id)" class="btn btn-danger ms-2">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination-buttons">
          <button class="btn btn-primary mx-2" @click="previousPage" :disabled="currentPage === 1">Previous</button>
          <button class="btn btn-primary mx-2" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>
      <CreateMedicalRecord :visible="showCreateMedicalRecord" @update:visible="toggleCreateMedicalRecord" />
      <EditMedicalRecord :visible="showEditMedicalRecord" @update:visible="toggleEditMedicalRecord" />
      <DeleteMedicalRecord :visible="showDeleteMedicalRecord" @update:visible="toggleDeleteMedicalRecord" />
    </div>
  </div>
</template>

<script>

import CreateMedicalRecord from './CreateMedicalRecords.vue';
import EditMedicalRecord from './EditMedicalRecords.vue';
import DeleteMedicalRecord from './DeleteMedicalRecords.vue';

export default {
  name: 'MedicalRecordsView',
  components: {
    CreateMedicalRecord,
    EditMedicalRecord,
    DeleteMedicalRecord,
    
  },
  data() {
    return {
      showCreateMedicalRecord: false,
      showEditMedicalRecord: false,
      showDeleteMedicalRecord: false,
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: ''
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    medicalrecords() {
      return this.$store.state.medicalrecords;
    },
    totalPages() {
      return Math.ceil(this.$store.state.medicalrecords.length / this.itemsPerPage);
    },
    paginatedMedicalRecords() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = this.currentPage * this.itemsPerPage;
      return this.$store.state.medicalrecords.slice(startIndex, endIndex);
    }
  },
  methods: {
    fetchData() {
      this.$store.getters.getMedicalRecords
        .then(medicalrecords => {
          this.medicalrecords = medicalrecords;
        })
        .catch(error => {
          console.error("Error fetching medical records:", error);
        });
    },
    async searchMedicalRecord() {
      await this.$store.dispatch('filteredMedicalRecords', this.searchQuery);
      this.currentPage = 1;
    },
    toggleCreateMedicalRecord() {
      this.showCreateMedicalRecord = !this.showCreateMedicalRecord;
      if (!this.showCreateMedicalRecord) {
        this.$store.dispatch('refreshMedicalRecords');
      }
    },
    toggleEditMedicalRecord(id) {
      this.$store.getters.getMedicalRecord(id);
      this.showEditMedicalRecord = !this.showEditMedicalRecord;
      if (!this.showEditMedicalRecord) {
        this.$store.dispatch('refreshMedicalRecords');
      }
    },
    toggleDeleteMedicalRecord(id) {
      this.$store.getters.getMedicalRecord(id);
      this.showDeleteMedicalRecord = !this.showDeleteMedicalRecord;
      if (!this.showDeleteMedicalRecord) {
        this.$store.dispatch('refreshMedicalRecords');
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
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

ul {
  list-style-type: none;
  padding: 0;
}

a.btn {
  margin-left: 10px;
}

.table-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination-buttons button {
  margin: 0 10px;
}

.table {
  margin-bottom: 0;
}

.thead-dark th {
  background-color: #343a40;
  color: white;
}

input[type="text"] {
  max-width: 300px;
}

.btn-primary, .btn-danger, .btn-secondary {
  transition: background-color 0.3s ease;
}

.btn-primary:hover, .btn-danger:hover, .btn-secondary:hover {
  background-color: darken(color, 10%);
}
</style>
