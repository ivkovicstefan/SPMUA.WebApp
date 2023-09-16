import { createRouter, createWebHistory } from 'vue-router'
import PublicLayout from '../layouts/PublicLayout.vue'
import HomeView from '../views/public/HomeView.vue'
import AdminHomeView from '../views/admin/AdminHomeView.vue'

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
      name: 'admin-home',
      component: AdminHomeView
    }
  ]
})

export default router
