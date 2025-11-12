import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import ProvinceView from '@/views/ProvinceView.vue'
import RouteView from '@/views/RouteView.vue'
import ChallengeView from '@/views/ChallengeView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/RouteView',
    name: 'RouteView',
    component: RouteView
  },
  {
    path: '/Challenge',
    name: 'Challenge',
    component: ChallengeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

