import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProvinceView from '@/views/ProvinceView.vue'
import RouteView from '@/views/RouteView.vue'
const routes = [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/province/:name', name: 'Province', component: ProvinceView, props: true },
    { path: '/RouteView', name: 'RouteView', component: RouteView }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

