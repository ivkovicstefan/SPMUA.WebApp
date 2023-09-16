import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/public/Home.vue'
import AdminHome from '../views/admin/AdminHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/admin',
      name: 'admin-home',
      component: AdminHome
    }
  ]
})

export default router
