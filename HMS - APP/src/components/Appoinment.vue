<template>
    <div class="header">
        <h1>Appointments</h1>
    </div>

    <div class="content">
        <div class="content-header">
            <h2>Scheduled Appointments</h2>
        </div>

        <div class="item-group">
            <table class="styled-table">
                <thead>
                    <tr>
                        <th>Appointment Name</th>
                        <th>Appointment Description</th>
                        <th>Appointment Doctor</th>
                        <th>Appointment Patient</th>
                        <th>Appointment Schedule</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="appointmentList.length === 0">
                        <tr>
                            <td colspan="5" style="text-align: center">There is No Appointments 💫</td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr v-for="appointment in appointmentList" :key="appointment.id">
                            <td>{{ appointment.name }}</td>
                            <td>{{ appointment.description }}</td>
                            <td>{{ appointment.doctor }}</td>
                            <td>{{ appointment.patient }}</td>
                            <td>{{ appointment.schedule }}</td>
                            <template v-if="role === '2'">
                                <td>
                                    <button class="edit-btn" @click="toDiagnose(appointment.id)">Diagnose</button>
                                    <template v-if="role != '1'">
                                        <button class="delete-btn" @click="toDelete(appointment.id)">Cancel</button>
                                    </template>
                                </td>
                            </template>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AppointmentComponent',
    data() {
        return {
            id: '',
            name: '',
            email: '',
            role: '',
            appointmentList: [],
            userData: {}
        };
    },

    mounted() {
        this.loadUserData();

        if (this.userData) {
            this.extractUserData(this.userData);
        }

        if (this.role != '1') {
            this.fetchAppointmentOwn(this.id);
        } else {
            this.fetchAppointmentList();
        }
    },

    methods: {
        loadUserData() {
            axios.get('/api/user-data') 
                .then(response => {
                    this.userData = response.data;
                    this.extractUserData(this.userData);
                })
                .catch(error => {
                    console.error('Failed to load user data:', error);
                });
        },

        extractUserData(userData) {
            this.id = userData.id;
            this.name = userData.name;
            this.email = userData.email;
            this.role = userData.role;
        },

        fetchAppointmentOwn(userId) {
            axios.get() // Adjust the endpoint to your actual appointments endpoint
                .then(response => {
                    this.appointmentList = response.data;
                })
                .catch(error => {
                    console.error('Failed to fetch own appointments:', error);
                });
        },

        fetchAppointmentList() {
            axios.get('/api/appointments') // Adjust the endpoint to your actual appointments endpoint
                .then(response => {
                    this.appointmentList = response.data;
                })
                .catch(error => {
                    console.error('Failed to fetch appointments:', error);
                });
        },

        toDiagnose(appointmentId) {
            this.$router.push('patient-diagnose' + appointmentId);
        },

        toDelete(appointmentId) {
            axios.delete() // Adjust the endpoint to your actual delete appointment endpoint
                .then(response => {
                    this.fetchAppointmentList(); // Refresh the appointment list after deletion
                })
                .catch(error => {
                    console.error('Failed to delete appointment:', error);
                });
        }
    }
};
</script>