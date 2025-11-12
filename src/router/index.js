import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import ProvinceView from '@/views/ProvinceView.vue'
import RouteView from '@/views/RouteView.vue'
import ChallengeView from '@/views/ChallengeView.vue'
import CommentView from '@/views/CommentView.vue'
const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/province/:name', name: 'Province', component: ProvinceView, props: true },
  { path: '/RouteView', name: 'RouteView', component: RouteView },
  // 过关闯将 -> 子界面：国家地理知识挑战
  { path: '/challenge', name: 'Challenge', component: ChallengeView },
  // 评论区
  { path: '/comment', name: 'Comment', component: CommentView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  }
})

// 全局前置守卫，在路由切换前执行
router.beforeEach((to, from, next) => {
  // 强制移除body的overflow限制
  document.body.style.overflow = 'auto';
  // 立即滚动到顶部
  window.scrollTo({ top: 0, behavior: 'auto' });
  next();
})

// 全局后置守卫，在路由切换后执行，确保DOM渲染完成后再次滚动
router.afterEach(() => {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, 0);
})

export default router

