import Vuex from 'vuex'
import axios from 'axios'

export const store = new Vuex.Store({
  name: 'store',
  state: {
    apiUrl: 'http://127.0.0.1:8000/api',
    // users: [],
    // user: [],
    patients: [],
    patient: [],
    doctors: [],
    doctor: [],
    appointments: [],
    appointment: [],
    medicalrecords: [],
    medicalrecord: [],
    searchQuery: '',
  },
  getters: {
    //==================== PATIENT ===========================
    //this getter will return all of the users
    getPatients: state => {
      return axios.get(state.apiUrl + '/patients')
        .then(response => {
            state.patients = response.data; //store all users in the state
        })
        .catch(error => {   
            console.error("Error fetching patient:", error);
        });
    },
    //this getter will return a single user and is triggered when the user clicks on a edit or delete user
    getPatient: (state) => (id) => {
      return axios.get(state.apiUrl + '/patient/' + id)
        .then(response => {
            state.patient = response.data; //store all patient in the state
        })
        .catch(error => {   
          //handle error as needed

          alert(error.message)
      });
    },

     //==================== DOCTOR ===========================
    //this getter will return all of the users
    getDoctors: state => {
      return axios.get(state.apiUrl + '/doctors')
        .then(response => {
            state.doctors = response.data; //store all users in the state
        })
        .catch(error => {   
            console.error("Error fetching doctor:", error);
        });
    },
    //this getter will return a single user and is triggered when the user clicks on a edit or delete user
    getDoctor: (state) => (id) => {
      return axios.get(state.apiUrl + '/doctor/' + id)
        .then(response => {
            state.doctor = response.data; //store all patient in the state
        })
        .catch(error => {   
          //handle error as needed

          alert(error.message)
      });
    },
    
    //==================== APPOINTMENTS ===========================
    getAppointments: state => {
      return axios.get(state.apiUrl + '/appointments')
        .then(response => {
            state.appointments = response.data;
        })
        .catch(error => {   
            console.error("Error fetching appointments:", error);
        });
    },
    getAppointment: (state) => (id) => {
      return axios.get(state.apiUrl + '/appointment/' + id)
        .then(response => {
            state.appointment = response.data;
        })
        .catch(error => {   
          alert(error.message)
      });
    },
    
   
    //==================== Medical Records ===========================
    getMedicalRecords: state => {
      return axios.get(state.apiUrl + '/medicalrecords')
        .then(response => {
          state.medicalrecords = response.data;
        })
        .catch(error => {   
          console.error("Error fetching medical records:", error);
        });
    },
    // Get a single medical record by ID
    getMedicalRecord: (state) => (id) => {
      return axios.get(state.apiUrl + '/medicalrecord/' + id)
        .then(response => {
          state.medicalrecord = response.data;
        })
        .catch(error => {   
          console.error("Error fetching medical record:", error);
        });
    },
  },
  mutations: {
    //==================== Patient ===========================
    async refreshPatients(state, patients) {
      // this mutation will refresh the patients that display on the page
      // its triggered every time the patient adds, edits, or deletes a user
      await axios.get(state.apiUrl + '/patients')
          .then(response => {
            patients = response.data;
          })
          .catch(error => {   
              alert(error.message)
          });
      state.patients = patients;
    },
    async filteredPatients(state, searchQuery) {
        await axios.get(state.apiUrl + '/searchpatient/' + searchQuery)
            .then(response => {
                state.patients = response.data; //store all users in the state that match the searchQuery
            })
            .catch(error => {   
                alert(error.message)
                state.patients= []; //reset the state if an error occurs
            });
         //state.patients = patients;
    },
    updatePatientFirstName(state, firstname) {
      state.patient.firstname = firstname; 
    },
    updatePatientLastName (state, lastname) {
        state.patient.lastname = lastname; 
    },
    updatePatientEmail (state, email) {
      state.patient.email = email; 
    },
    updateBirthday (state, date_of_birth) {
      state.patient.date_of_birth = date_of_birth; 
    },
    updateAddress (state, address) {
      state.patient.address = address; 
    },
    updateGender (state, gender) {
      state.patient.gender = gender;
    },
    updatePhone (state, phone) {
      state.patient.phone = phone; 
    },
    updateMedHistory (state, medical_history) {
      state.patient.medical_history = medical_history; 
    },


    //==================== Doctor ===========================
    async refreshDoctors(state, doctors) {
      // this mutation will refresh the patients that display on the page
      // its triggered every time the patient adds, edits, or deletes a user
      await axios.get(state.apiUrl + '/doctors')
          .then(response => {
            doctors = response.data;
          })
          .catch(error => {   
              alert(error.message)
          });
      state.doctors = doctors;
    },
    async filteredDoctors(state, searchQuery) {
        await axios.get(state.apiUrl + '/searchdoctor/' + searchQuery)
            .then(response => {
                state.doctors = response.data; //store all users in the state that match the searchQuery
            })
            .catch(error => {   
                alert(error.message)
                state.doctors= []; //reset the state if an error occurs
            });
         //state.patients = patients;
    },
    updateDoctorFirstName(state, firstname) {
      state.doctor.firstname = firstname; 
    },
    updateDoctorLastName (state, lastname) {
      state.doctor.lastname = lastname; 
    },
    updateDoctorEmail (state, email) {
      state.doctor.email = email; 
    },
    updateSpecialization (state, specialization) {
      state.doctor.specialization = specialization; 
    },
    updateLicenseNumber (state, license_number) {
      state.doctor.license_number = license_number; 
    },
    updateYearsOfExperience (state, years_of_experience) {
      state.doctor.years_of_experience = years_of_experience; 
    },

    async refreshAppointments(state, appointments) {
      // this mutation will refresh the posts that display on the page
      // its triggered every time the user adds, edits, or deletes a post
      await axios.get(state.apiUrl + '/appointments')
          .then(response => {
            appointments = response.data;
          })
          .catch(error => {   
              alert(error.message)
          });
      state.appointments = appointments;
    },
    async filteredAppointments(state, searchQuery) {
      await axios.get(state.apiUrl + '/searchappointment/' + searchQuery)
          .then(response => {
              state.appointments = response.data; //store all products in the state that match the searchQuery
          })
          .catch(error => {   
              alert(error.message)
              state.appointments= []; //reset the state if an error occurs
          });
      // state.products = products;
    },

    updateAppointmentPatientName(state, patient_name) {
      state.appointment.patient_name = patient_name; 
    },
    updateAppointmentDoctorName(state, doctor_name) {
      state.appointment.doctor_name = doctor_name; 
    },
    updateAppointmentDate(state, appointment_date) {
      state.appointment.appointment_date = appointment_date; 
    },
    updateAppointmentReason(state, reason) {
      state.appointment.reason = reason; 
    },
    updateAppointmentStatus(state, status) {
      state.appointment.status = status; 
    },
    
     //==================== Medical Records ===========================
     async filteredMedicalRecords(state, searchQuery) {
      await axios.get(state.apiUrl + '/searchmedicalrecord/' + searchQuery)
          .then(response => {
              state.medicalrecords = response.data; //store all products in the state that match the searchQuery
          })
          .catch(error => {   
              alert(error.message)
              state.medicalrecords= []; //reset the state if an error occurs
          });
      // state.products = products;
    },
    // Refresh medical records
    
    async refreshMedicalRecords(state, medicalrecords) {
      await axios.get(state.apiUrl + '/medicalrecords')
        .then(response => {
          medicalrecords = response.data;
        })
        .catch(error => {   
          console.error("Error fetching medical records:", error);
        });
      state.medicalrecords = medicalrecords;
    },

  },
  actions: {
    //==================== Patient ===========================
    refreshPatients({ commit }) {
      commit('refreshPatients'); //call the refreshProduct mutation
    },
    updatePatientFirstName({ commit }, firstname) {
        commit('updatePatientFirstName', firstname); //call the updateUserName mutation and pass in the name
    },
    updatePatientLastName({ commit }, lastname) {
        commit('updatePatientLastName', lastname); //call the updateUserEmail mutation and pass in the email
    },
    updatePatientEmail({ commit }, email) {
      commit('updatePatientEmail', email); //call the updateUserEmail mutation and pass in the email
    },
    updateBirthday({ commit }, date_of_birth) {
      commit('updateBirthday', date_of_birth); //call the updateUserEmail mutation and pass in the email
    },
    updateAddress({ commit }, address) {
      commit('updateAddress', address);
    },
    updateGender({ commit }, gender) {
      commit('updateGender', gender); 
    },
    updatePhone({ commit }, phone) {
      commit('updatePhone', phone); 
    },
    updateMedHistory({ commit }, medical_history) {
      commit('updateMedHistory', medical_history); 
    },
    filteredPatients({ commit }, searchQuery) {
      if (searchQuery === '') {
          commit('refreshPatients'); //call the refreshProduct mutation if the searchQuery is empty
      }else{
          commit('filteredPatients', searchQuery); //call the filteredProducts mutation and pass in the searchQuery
      }
    },
 //==================== Doctor ===========================
   
    refreshDoctors({ commit }) {
      commit('refreshDoctors'); //call the refreshProduct mutation
    },
    updateDoctorFirstName({ commit }, firstname) {
        commit('updateDoctorFirstName', firstname); //call the updateUserName mutation and pass in the name
    },
    updateDoctorLastName({ commit }, lastname) {
        commit('updateDoctorLastName', lastname); //call the updateUserEmail mutation and pass in the email
    },
    updateDoctorEmail({ commit }, email) {
      commit('updateDoctorEmail', email); //call the updateUserEmail mutation and pass in the email
    },
    updateSpecialization({ commit }, specialization) {
      commit('updateSpecialization', specialization); //call the updateUserEmail mutation and pass in the email
    },
    updateLicenseNumber({ commit }, license_number) {
      commit('updateLicenseNumber', license_number);
    },
    updateYearsOfExperience({ commit }, years_of_experience) {
      commit('updateYearsOfExperience', years_of_experience); 
    },
    filteredDoctors({ commit }, searchQuery) {
      if (searchQuery === '') {
          commit('refreshDoctors'); //call the refreshProduct mutation if the searchQuery is empty
      }else{
          commit('filteredDoctors', searchQuery); //call the filteredProducts mutation and pass in the searchQuery
      }
    },



     //==================== APPOINTMENTS ===========================
    refreshAppointments({ commit }) {
      commit('refreshAppointments');
    },
    updateAppointmentPatientName({ commit }, patient_name) {
      commit('updateAppointmentPatientName', patient_name);
    },
    updateAppointmentDoctorName({ commit }, doctor_name) {
      commit('updateAppointmentDoctorName', doctor_name);
    },
    updateAppointmentDate({ commit }, appointment_date) {
      commit('updateAppointmentDate', appointment_date);
    },
    updateAppointmentReason({ commit }, reason) {
      commit('updateAppointmentReason', reason);
    },
    updateAppointmentStatus({ commit }, status) {
      commit('updateAppointmentStatus', status);
    },
    filteredAppointments({ commit }, searchQuery) {
      if (searchQuery === '') {
          commit('refreshAppointments'); //call the refreshProduct mutation if the searchQuery is empty
      }else{
          commit('filteredAppointments', searchQuery); //call the filteredProducts mutation and pass in the searchQuery
      }
    },

     //==================== MEDICAL RECORDS ===========================



    refreshMedicalRecords({ commit }) {
      commit('refreshMedicalRecords');
    },

    filteredMedicalRecords({ commit }, searchQuery) {
      if (searchQuery === '') {
          commit('refreshMedicalRecords'); //call the refreshProduct mutation if the searchQuery is empty
      }else{
          commit('filteredMedicalRecords', searchQuery); //call the filteredProducts mutation and pass in the searchQuery
      }
    },
  }
})