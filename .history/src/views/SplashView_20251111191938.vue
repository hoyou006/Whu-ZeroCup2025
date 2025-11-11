<template>
  <div class="splash-container" ref="splashContainer">
    <!-- 全屏背景图片 -->
    <div 
      class="splash-background" 
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    ></div>
    
    <!-- 画中画视频元素 -->
    <div class="splash-video-container">
      <video 
        id="splashVideo"
        class="splash-video" 
        autoplay 
        muted 
        loop 
        playsinline 
        preload="metadata"
        @error="handleVideoError"
      >
        <source src="/assets/videos/immersive_water.mp4" type="video/mp4">
        <source src="/assets/videos/immersive_water.webm" type="video/webm">
        <!-- 视频加载失败的备用显示 -->
        <div class="video-fallback"></div>
      </video>
      
      <!-- 视频加载指示器 -->
      <div id="splashVideoLoader" class="video-loader">
        <div class="loader-spinner"></div>
      </div>
    </div>
    
    <!-- 文字提示 -->
    <div class="splash-content">
      <h1 class="splash-title">山河图志</h1>
      <p class="splash-subtitle">向下滑动探索</p>
      <div class="scroll-indicator animate-bounce">
        <i class="fa fa-angle-down text-3xl"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'

const router = useRouter()

// 组件引用
const splashContainer = ref(null)

// 背景图片路径
const backgroundImage = '/img/homePage/bgHome.jpg'

// 动画状态
const animationState = ref({
  isScrolling: false,
  progress: 0
})

// 视频加载完成处理
const handleVideoLoaded = () => {
  const loader = document.getElementById('splashVideoLoader')
  if (loader) {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        loader.style.display = 'none'
      }
    })
  }
}

// 视频错误处理
const handleVideoError = () => {
  console.error('先导页视频加载失败')
  const loader = document.getElementById('splashVideoLoader')
  if (loader) {
    loader.style.display = 'none'
  }
}

// 设置视频事件
const setupVideoEvents = () => {
  const video = document.getElementById('splashVideo')
  if (video) {
    video.addEventListener('loadeddata', handleVideoLoaded)
    video.addEventListener('error', handleVideoError)
    
    // 确保在用户交互后播放视频（针对浏览器自动播放限制）
    const playVideo = () => {
      if (video.paused) {
        video.play().catch(err => {
          console.log('视频自动播放被阻止:', err)
        })
      }
      document.removeEventListener('click', playVideo)
      document.removeEventListener('touchstart', playVideo)
    }
    
    document.addEventListener('click', playVideo)
    document.addEventListener('touchstart', playVideo)
  }
}

// 处理滚动动画
const handleScrollAnimation = (progress) => {
  if (animationState.value.isScrolling) return
  
  // 确保进度在0-1之间
  const clampedProgress = Math.min(Math.max(progress, 0), 1)
  animationState.value.progress = clampedProgress
  
  // 背景图片缩放效果
  const scale = 1 + clampedProgress * 0.2 // 放大到1.2倍
  const opacity = 1 - clampedProgress * 0.8 // 淡出效果
  
  // 直接修改样式以获得更好的性能
  const background = splashContainer.value?.querySelector('.splash-background')
  if (background) {
    background.style.transform = `scale(${scale})`
    background.style.opacity = opacity
  }
  
  // 视频缩小效果
  const videoScale = 1 - clampedProgress * 0.5 // 缩小到0.5倍
  const videoOpacity = 1 - clampedProgress * 0.7 // 视频淡出
  
  const videoContainer = splashContainer.value?.querySelector('.splash-video-container')
  if (videoContainer) {
    videoContainer.style.transform = `scale(${videoScale})`
    videoContainer.style.opacity = videoOpacity
  }
  
  // 文字内容淡出
  const content = splashContainer.value?.querySelector('.splash-content')
  if (content) {
    content.style.opacity = 1 - clampedProgress
  }
  
  // 当滚动进度达到阈值时，完成过渡到首页
  if (clampedProgress >= 0.7 && !animationState.value.isScrolling) {
    completeTransition()
  }
}

// 完成过渡到首页
const completeTransition = () => {
  animationState.value.isScrolling = true
  
  // 创建最终过渡动画
  const tl = gsap.timeline({
    onComplete: () => {
      // 导航到首页并确保页面刷新到顶部
      router.push('/').then(() => {
        window.scrollTo(0, 0)
      })
    }
  })
  
  // 快速淡出所有元素
  const elements = [
    '.splash-background',
    '.splash-video-container',
    '.splash-content'
  ]
  
  elements.forEach((selector, index) => {
    const element = splashContainer.value?.querySelector(selector)
    if (element) {
      tl.to(element, {
        opacity: 0,
        duration: 0.5,
        delay: index * 0.1
      }, 0)
    }
  })
  
  tl.to(splashContainer.value, {
    opacity: 0,
    duration: 0.3
  }, 0.5)
}

// 处理鼠标滚轮事件
let lastWheelTime = 0
const handleWheel = (e) => {
  if (animationState.value.isScrolling) return
  
  // 节流处理
  const currentTime = Date.now()
  const deltaTime = currentTime - lastWheelTime
  if (deltaTime < 16) return // 约60fps
  
  lastWheelTime = currentTime
  e.preventDefault()
  
  // 向下滚动时增加进度
  const scrollDelta = e.deltaY * 0.003
  const newProgress = Math.min(Math.max(animationState.value.progress + scrollDelta, 0), 1)
  
  handleScrollAnimation(newProgress)
}

// 处理触摸事件
const touchStartY = ref(0)
const handleTouchStart = (e) => {
  if (animationState.value.isScrolling) return
  touchStartY.value = e.touches[0].clientY
}

const handleTouchMove = (e) => {
  if (animationState.value.isScrolling || !touchStartY.value) return
  
  e.preventDefault()
  
  const touchY = e.touches[0].clientY
  const deltaY = touchStartY.value - touchY // 向下滑动为正值
  
  // 触摸敏感度
  const scrollFactor = 0.008
  const scrollDelta = deltaY * scrollFactor
  
  const newProgress = Math.min(Math.max(animationState.value.progress + scrollDelta, 0), 1)
  
  handleScrollAnimation(newProgress)
  
  touchStartY.value = touchY
}

// 点击滚动指示器直接过渡
const handleScrollClick = () => {
  if (animationState.value.isScrolling) return
  
  // 快速滚动到阈值位置
  gsap.timeline()
    .to({}, {
      duration: 0.8,
      onUpdate: () => {
        const progress = Math.min(gsap.getProperty('this', 'progress') * 1.5, 1)
        handleScrollAnimation(progress)
      }
    })
    .call(completeTransition, null, 0.6)
}

onMounted(async () => {
  await nextTick()
  
  // 隐藏滚动条
  document.body.style.overflow = 'hidden'
  
  // 设置视频事件
  setupVideoEvents()
  
  // 添加事件监听
  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('touchstart', handleTouchStart, { passive: false })
  window.addEventListener('touchmove', handleTouchMove, { passive: false })
  
  // 滚动指示器点击事件
  const scrollIndicator = splashContainer.value?.querySelector('.scroll-indicator')
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', handleScrollClick)
  }
})

onBeforeUnmount(() => {
  // 恢复滚动条
  document.body.style.overflow = 'auto'
  
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
  
  // 移除点击事件
  const scrollIndicator = splashContainer.value?.querySelector('.scroll-indicator')
  if (scrollIndicator) {
    scrollIndicator.removeEventListener('click', handleScrollClick)
  }
})
</script>

<style scoped>
.splash-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
}

.splash-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.1s ease-out, opacity 0.1s ease-out;
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.splash-video-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  width: 40vw;
  max-width: 500px;
  aspect-ratio: 16 / 9;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
  z-index: 10;
  transition: transform 0.1s ease-out, opacity 0.1s ease-out;
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.splash-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-fallback {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #333;
  background-image: url(https://picsum.photos/id/15/800/450);
  background-size: cover;
  background-position: center;
}

.video-loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
}

.loader-spinner {
  width: 3rem;
  height: 3rem;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.splash-content {
  position: absolute;
  bottom: 10%;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  z-index: 10;
  transition: opacity 0.1s ease-out;
  will-change: opacity;
}

.splash-title {
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.8);
  font-family: var(--font-hei, 'Microsoft YaHei', sans-serif);
}

.splash-subtitle {
  font-size: clamp(1rem, 3vw, 1.5rem);
  margin-bottom: 2rem;
  opacity: 0.9;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
}

.scroll-indicator {
  display: inline-block;
  cursor: pointer;
  padding: 1rem;
  transition: transform 0.2s ease;
  color: white;
}

.scroll-indicator:hover {
  transform: scale(1.1);
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
  .splash-video-container {
    width: 60vw;
  }
  
  .splash-content {
    bottom: 8%;
  }
  
  .splash-title {
    font-size: clamp(2rem, 8vw, 3rem);
  }
}

@media (max-width: 480px) {
  .splash-video-container {
    width: 80vw;
  }
  
  .splash-content {
    bottom: 6%;
  }
}
</style>