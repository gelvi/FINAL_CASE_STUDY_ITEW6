<template>
    <div>
        <h1>All Appointments</h1>
        <ul>
            <li v-for="appointment in appointments" :key="appointment.id">
                {{ appointment }}
            </li>
        </ul>
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
    }
};
</script>