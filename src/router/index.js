import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import ProvinceView from '@/views/ProvinceView.vue'
import RouteView from '@/views/RouteView.vue'
import ChallengeView from '@/views/ChallengeView.vue'
const routes = [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/province/:name', name: 'Province', component: ProvinceView, props: true },
    { path: '/RouteView', name: 'RouteView', component: RouteView },
    // 过关闯将 -> 子界面：国家地理知识挑战
    { path: '/challenge', name: 'Challenge', component: ChallengeView }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

