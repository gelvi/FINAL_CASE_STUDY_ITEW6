import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/LoginPage.vue';
import RegisterPage from '@/components/RegisterPage.vue';
import AdminView from '@/components/Admin/AdminView.vue';
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
  ]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
  
export default router
