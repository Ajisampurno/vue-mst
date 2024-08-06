import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import TransaksiView from '@/views/TransaksiView.vue'
import DaftarTransaksiView from '@/views/DaftarTransaksiView.vue'
import DaftarCustomerView from '@/views/DaftarCustomerView.vue'
import DaftarBarangView from '@/views/DaftarBarangView.vue'

// Function to check if user is authenticated
function isAuthenticated() {
  // Check if the token exists in localStorage
  return !!localStorage.getItem('token');
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/transaksi',
      name: 'transaksi',
      component: TransaksiView,
      meta: { requiresAuth: true }
    },
    {
      path: '/daftar-transaksi',
      name: 'daftar-transaksi',
      component: DaftarTransaksiView,
      meta: { requiresAuth: true }
    },
    {
      path: '/daftar-customer',
      name: 'daftar-customer',
      component: DaftarCustomerView,
      meta: { requiresAuth: true }
    },
    {
      path: '/daftar-barang',
      name: 'daftar-barang',
      component: DaftarBarangView,
      meta: { requiresAuth: true }
    }
  ]
})

// Navigation guard to check authentication and prevent logged in users from accessing login page
router.beforeEach((to, from, next) => {
  const isAuth = isAuthenticated();

  if (to.meta.requiresAuth && !isAuth) {
    // Redirect to login if the user is not authenticated
    next({ name: 'login' });
  } else if ((to.name === 'login' || to.name === 'register') && isAuth) {
    // Redirect to dashboard if the user is authenticated and tries to access login or register page
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router;
