import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/LoginPage.vue';
import RegisterPage from '@/components/RegisterPage.vue';
import AdminView from '@/components/Admin/AdminView.vue';
import DoctorView from '@/components/Doctor/DoctorView.vue';
import PatientView from '@/components/Patient/PatientView.vue';
import AMedicalRecords from '@/components/Admin/AMedicalRecords.vue';
import DMedicalRecords from '@/components/Doctor/DMedicalRecords.vue';
import PMedicalRecords from '@/components/Patient/PMedicalRecords.vue';
import CreatePatient from '@/components/Patient/CreatePatient.vue';
import DeletePatient from '@/components/Patient/DeletePatient.vue'
import EditPatient from '@/components/Patient/EditPatient.vue'

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
      path: '/admin',
      name: 'AdminView',
      component: AdminView
    },
    {
      path: '/doctor',
      name: 'DoctorView',
      component: DoctorView
    },
    {
      path: '/patient',
      name: 'PatientView',
      component: PatientView
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
    {
      path: '/Admin',
      name: 'AMedRecords',
      component: AMedicalRecords
    },
    {
      path: '/Doctor',
      name: 'DMedRecords',
      component: DMedicalRecords
    },
    {
      path: '/Patient',
      name: 'PMedRecords',
      component: PMedicalRecords
    },
    {
      path: '/patient/create-patient',
      name: 'CreatePatient',
      component: CreatePatient
    },
    {
      path: '/patient/delete-patient',
      name: 'DeletePatient',
      component: DeletePatient
    },  
    {
      path: '/patient/edit-patient',
      name: 'EditPatient',
      component: EditPatient
    },
  ]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
  
export default router
