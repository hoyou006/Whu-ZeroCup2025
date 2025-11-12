import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SplashView from '../views/SplashView.vue'
import RouteView from '../views/RouteView.vue'
import ChallengeView from '../views/ChallengeView.vue'

const routes = [
  {
    path: '/',
    name: 'splash',
    component: SplashView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/route',
    name: 'RouteView',
    component: RouteView
  },
  {
    path: '/challenge',
    name: 'Challenge',
    component: ChallengeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

