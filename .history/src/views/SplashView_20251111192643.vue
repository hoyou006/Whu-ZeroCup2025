<template>
  <div class="splash-container" ref="splashContainer">
    <!-- 全屏背景图片 -->
    <div 
      class="bg-image absolute inset-0" 
      :style="{ 
        backgroundImage: `url(${backgroundImage})`, 
        transform: `scale(${1 + scrollProgress * 0.1})`,
        opacity: 1 - scrollProgress
      }"
    ></div>
    
    <!-- 画中画视频 -->
    <div 
      class="video-container absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" 
      :style="{
        width: `${100 - scrollProgress * 60}%`,
        height: `${80 - scrollProgress * 64}vh`,
        maxWidth: `${900 - scrollProgress * 540}px`,
        maxHeight: `${600 - scrollProgress * 384}px`,
        opacity: 1 - scrollProgress,
        transform: `translate(-50%, -50%) scale(${1 + scrollProgress * 0.1})`
      }"
    >
      <video 
        id="splashVideo"
        class="w-full h-full object-cover rounded-lg"
        autoplay 
        muted 
        loop 
        playsinline
        preload="metadata"
        @error="handleVideoError"
      >
        <source src="/assets/videos/immersive_water.mp4" type="video/mp4">
        <source src="/assets/videos/immersive_water.webm" type="video/webm">
      </video>
      <!-- 视频加载失败时显示的备用图片，始终存在但默认隐藏 -->
      <div 
        class="video-fallback absolute inset-0 bg-cover bg-center rounded-lg"
        :class="{ 'hidden': !showFallback }"
        style="background-image: url('/img/homePage/bgHome.jpg')"
      ></div>
    </div>
    
    <!-- 文字提示 -->
    <div 
      class="text-container absolute bottom-10 left-0 right-0 flex flex-col items-center text-white" 
      :style="{
        opacity: 1 - scrollProgress * 2
      }"
    >
      <p class="text-lg mb-2">向下滑动探索</p>
      <div class="animate-bounce">
        <i class="fa fa-angle-down text-2xl"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'

const router = useRouter()
const splashContainer = ref(null)
const scrollProgress = ref(0)
const backgroundImage = ref('/img/homePage/bgHome.jpg')
const showFallback = ref(false)
let isAnimating = false

// 视频加载处理函数
const handleVideoLoaded = () => {
  console.log('视频加载完成')
  showFallback.value = false
}

// 视频错误处理函数
const handleVideoError = () => {
  console.error('视频加载失败，将使用备用显示')
  showFallback.value = true
}

// 处理滚动/触摸事件
const handleScroll = (delta) => {
  if (isAnimating) return
  
  // 更新滚动进度
  const newProgress = Math.min(Math.max(scrollProgress.value + delta, 0), 1)
  scrollProgress.value = newProgress
  
  // 当滚动进度超过阈值时，导航到首页
  if (newProgress >= 0.7 && !isAnimating) {
    navigateToHome()
  }
}

// 鼠标滚轮事件处理
const handleWheel = (e) => {
  e.preventDefault()
  // 调整滚动敏感度
  const delta = e.deltaY * 0.001
  handleScroll(delta)
}

// 触摸事件处理
const touchStartY = ref(0)
const handleTouchStart = (e) => {
  touchStartY.value = e.touches[0].clientY
}

const handleTouchMove = (e) => {
  e.preventDefault()
  
  const touchY = e.touches[0].clientY
  const deltaY = touchStartY.value - touchY
  
  // 调整滚动敏感度
  const delta = deltaY * 0.002
  handleScroll(delta)
  
  touchStartY.value = touchY
}

// 导航到首页
const navigateToHome = () => {
  if (isAnimating) return
  
  isAnimating = true
  
  // 创建淡出动画
  const tl = gsap.timeline({
    onComplete: () => {
      // 导航到首页路由 '/home'
      router.push('/home')
    }
  })
  
  // 淡出所有元素
  tl.to(splashContainer.value, {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.inOut'
  })
}

// 设置视频元素事件监听
const setupVideoEvents = () => {
  const video = document.getElementById('splashVideo')
  if (video) {
    // 添加加载完成事件
    video.addEventListener('loadeddata', handleVideoLoaded)
    video.addEventListener('canplay', handleVideoLoaded)
    video.addEventListener('error', handleVideoError)
    
    // 尝试加载视频
    setTimeout(() => {
      if (video.readyState === 0) {
        console.log('视频加载超时，显示备用内容')
        showFallback.value = true
      }
    }, 3000)
    
    // 尝试在用户交互后播放视频（针对自动播放限制）
    const playVideo = () => {
      if (video.paused && video.readyState > 0) {
        video.play().catch(err => {
          console.log('视频自动播放被浏览器阻止：', err)
          showFallback.value = true
        })
      }
      document.removeEventListener('click', playVideo)
      document.removeEventListener('touchstart', playVideo)
    }
    
    document.addEventListener('click', playVideo)
    document.addEventListener('touchstart', playVideo)
  } else {
    // 如果找不到视频元素，直接显示备用内容
    showFallback.value = true
  }
}

onMounted(() => {
  // 设置视频事件
  setupVideoEvents()
  
  // 添加滚动事件监听
  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('touchstart', handleTouchStart, { passive: false })
  window.addEventListener('touchmove', handleTouchMove, { passive: false })
  
  // 防止页面默认滚动
  document.body.style.overflow = 'hidden'
})

onBeforeUnmount(() => {
  // 移除事件监听
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchmove', handleTouchMove)
  
  // 清理视频事件
  const video = document.getElementById('splashVideo')
  if (video) {
    video.removeEventListener('loadeddata', handleVideoLoaded)
    video.removeEventListener('error', handleVideoError)
  }
  
  // 恢复页面滚动设置
  document.body.style.overflow = 'auto'
})
</script>

<style scoped>
.splash-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #000;
  transition: opacity 0.8s ease;
}

.bg-image {
  background-size: cover;
  background-position: center;
  transition: transform 0.1s ease-out, opacity 0.1s ease-out;
  will-change: transform, opacity;
}

.video-container {
  transition: width 0.1s ease-out, height 0.1s ease-out, opacity 0.1s ease-out, transform 0.1s ease-out;
  will-change: width, height, opacity, transform;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

#splashVideo {
  transition: transform 0.1s ease-out;
  will-change: transform;
  backface-visibility: hidden;
}

.text-container {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  transition: opacity 0.1s ease-out;
  will-change: opacity;
}

.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .video-container {
    max-width: 90vw !important;
    max-height: 60vh !important;
  }
}

/* 性能优化 */
.splash-container,
.bg-image,
.video-container,
#splashVideo {
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

.video-fallback {
  transition: opacity 0.3s ease;
}

.video-fallback.hidden {
  opacity: 0;
  pointer-events: none;
}
</style>