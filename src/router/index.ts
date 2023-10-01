import { createRouter, createWebHistory } from 'vue-router'
import PublicLayout from '../layouts/PublicLayout.vue'
import HomeView from '../views/public/HomeView.vue'
import AdminLoginView from '../views/admin/AdminLoginView.vue'
import AdminDashboardView from '../views/admin/AdminDashboardView.vue'
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: PublicLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        }
      ]
    },
    {
      path: '/admin',
      children: [
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: AdminDashboardView,
          meta: {
            isAuthRequired: true
          }
        },
        {
          path: 'login',
          name: 'admin-login',
          component: AdminLoginView
        }
      ]
    }
  ]
})

router.beforeEach((to, from) => {
  const authStore = useAuthStore()

  if (to.meta && to.meta.isAuthRequired) {
    if (!authStore.admin.isAuthenticated) {
      return { name: 'admin-login' }
    }
  }
})

export default router
