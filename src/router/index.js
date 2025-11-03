import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProvinceView from '@/views/ProvinceView.vue'

const routes = [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/province/:name', name: 'Province', component: ProvinceView, props: true }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

