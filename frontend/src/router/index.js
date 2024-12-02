import { createRouter, createWebHistory } from 'vue-router'
import ProductView from '../views/ProductView.vue'
import CheckView from '@/views/CheckView.vue'

const routes = [
  {
    path: '/',
    name: 'Products',
    component: ProductView
  },
  {
    path: '/Check',
    name: 'check',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: CheckView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
