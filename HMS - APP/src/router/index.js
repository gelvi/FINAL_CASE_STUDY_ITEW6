import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/LoginPage.vue';
import RegisterPage from '@/components/RegisterPage.vue';
import PatientDashboard from '@/components/PatientDashboard.vue';
import DoctorDashboard from '@/components/DoctorDashboard.vue';
import AdminView from '@/components/Admin/AdminView.vue';
import AppointmentView from '@/components/Appointment/AppointmentView.vue';
import MedicalRecordsView from '@/components/MedicalRecords/MedicalRecordsView.vue'
import DoctorView from '@/components/Doctor/DoctorView.vue';
import PatientView from '@/components/Patient/PatientView.vue';


const routes = [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage
    },
    {
      path: '/patientdashboard',
      name: 'PatientDashboard',
      component: PatientDashboard,
      beforeEnter: (to, from, next) => {
        // Check if user is logged in, if not, redirect to login page
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/') // Redirect to login page
        }
      }
    },
    {
      path: '/doctordashboard',
      name: 'DoctorDashboard',
      component: DoctorDashboard,
      beforeEnter: (to, from, next) => {
        // Check if user is logged in, if not, redirect to login page
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/') // Redirect to login page
        }
      }
    },
    {
      path: '/admin',
      name: 'AdminView',
      component: AdminView,
      beforeEnter: (to, from, next) => {
        // Check if user is logged in, if not, redirect to login page
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/') // Redirect to login page
        }
      }
    },
    {
      path: '/doctors',
      name: 'DoctorView',
      component: DoctorView,
      beforeEnter: (to, from, next) => {
        // Check if user is logged in, if not, redirect to login page
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/') // Redirect to login page
        }
      }
    },
    {
      path: '/patients',
      name: 'PatientView',
      component: PatientView,
      beforeEnter: (to, from, next) => {
        // Check if user is logged in, if not, redirect to login page
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/') // Redirect to login page
        }
      }
    },
    {
      path: '/appointments',
      name: 'AppointmentView',
      component: AppointmentView,
      beforeEnter: (to, from, next) => {
        // Check if user is logged in, if not, redirect to login page
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/') // Redirect to login page
        }
      }
    },
    {
      path: '/medicalRecords',
      name: 'MedicalRecordsView',
      component: MedicalRecordsView,
      beforeEnter: (to, from, next) => {
        // Check if user is logged in, if not, redirect to login page
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/') // Redirect to login page
        }
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: LoginPage,
      beforeEnter: (to, from, next) => {
        console.log('Logging out...');
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        next('/');
      }
    },
  ]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
  
export default router
