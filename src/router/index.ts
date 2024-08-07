import { createRouter, createWebHistory } from 'vue-router'
import PublicLayout from '../layouts/PublicLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import HomeView from '../views/public/HomeView.vue'
import GalleryView from '../views/public/GalleryView.vue'
import AboutMeView from '../views/public/AboutMeView.vue'
import AdminLoginView from '../views/admin/AdminLoginView.vue'
import AdminDashboardView from '../views/admin/AdminDashboardView.vue'
import AdminCalendarView from '../views/admin/AdminCalendarView.vue'
import AdminReservationsView from '../views/admin/AdminReservationsView.vue'
import AdminServicesView from '../views/admin/AdminServicesView.vue'
import AdminWorkingHoursView from '../views/admin/AdminWorkingHoursView.vue'
import AdminVacationsView from '../views/admin/AdminVacationsView.vue'
import { useAuthStore } from '@/stores/auth.store'
import { storeToRefs } from 'pinia'

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
        },
        {
          path: '/gallery',
          name: 'gallery',
          component: GalleryView
        },
        {
          path: '/about',
          name: 'about-me',
          component: AboutMeView
        }
      ]
    },
    {
      path: '/login',
      name: 'admin-login',
      component: AdminLoginView
    },
    {
      path: '/admin',
      component: AdminLayout,
      redirect: () => {
        return '/admin/dashboard'
      },
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
          path: 'calendar',
          name: 'admin-calendar',
          component: AdminCalendarView,
          meta: {
            isAuthRequired: true
          }
        },
        {
          path: 'reservations',
          name: 'admin-reservations',
          component: AdminReservationsView,
          meta: {
            isAuthRequired: true
          }
        },
        {
          path: 'services',
          name: 'admin-services',
          component: AdminServicesView,
          meta: {
            isAuthRequired: true
          }
        },
        {
          path: 'working-hours',
          name: 'admin-working-hours',
          component: AdminWorkingHoursView,
          meta: {
            isAuthRequired: true
          }
        },
        {
          path: 'vacations',
          name: 'admin-vacations',
          component: AdminVacationsView,
          meta: {
            isAuthRequired: true
          }
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  const { admin } = storeToRefs(authStore)

  if (to.meta && to.meta.isAuthRequired) {
    if (!admin.value.isAuthenticated) {
      return { name: 'admin-login' }
    }
  }
})

export default router
