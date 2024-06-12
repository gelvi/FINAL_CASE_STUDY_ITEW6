<template>
    <div>
        <h1>My Appointments</h1>
        <ul>
            <li v-for="appointment in appointments" :key="appointment.id">
                {{ appointment }}
            </li>
        </ul>
        <button @click="bookAppointment">Book Appointment</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            appointments: []
        };
    },
    created() {
        axios.get('/api/appointments')
            .then(response => {
                this.appointments = response.data;
            });
    },
    methods: {
        bookAppointment() {
            axios.post('/api/appointments', {
                doctor_id: 1, // example doctor_id
                appointment_time: '2024-06-15 10:00:00' // example time
            }).then(response => {
                this.appointments.push(response.data);
            });
        }
    }
};
</script>