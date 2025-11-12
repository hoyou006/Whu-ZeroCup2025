<template>
  <div class="app-container">
    <!-- 导航栏 - 固定在顶部 -->
    <nav id="navbar" class="fixed top-0 left-0 right-0 z-[1000]">
        <div class="nav-links">
          <router-link to="/" class="nav-item active">首页</router-link>
          <router-link to="/RouteView" class="nav-item">山河漫游</router-link>
          <router-link to="/Challenge" class="nav-item">过关闯将</router-link>
          <router-link to="#" class="nav-item">云锦书来</router-link>
        </div>
    </nav>

    <!-- 视频背景 - 可滚动扩大的区域 -->
    <section class="relative w-full h-screen overflow-hidden" ref="heroSection">
      <!-- 背景图片层 -->
      <div class="absolute inset-0 z-0 w-full h-full bg-cover bg-center" id="backgroundImage" style="background-image: url(/img/homePage/bgHome.jpg)"></div>
      
      <!-- 前景视频层 -->
      <div class="absolute inset-0 z-10 flex items-center justify-center">
        <div class="relative w-[60vw] h-[40vh] max-w-[800px] max-h-[450px] transition-all duration-1000 ease-out" id="videoContainer">
          <video 
            id="heroVideo"
            class="w-full h-full object-cover rounded-lg"
            autoplay 
            muted 
            loop 
            playsinline
            preload="metadata"
            @error="handleVideoError"
          >
            <!-- 视频源 - 实际项目中需要替换为真实的视频文件 -->
            <source src="/assets/videos/immersive_water.mp4" type="video/mp4">
            <!-- 备用视频格式 -->
            <source src="/assets/videos/immersive_water.webm" type="video/webm">
            <!-- 浏览器不支持视频标签时的降级显示 -->
            <div class="absolute inset-0 bg-cover bg-center rounded-lg" style="background-image: url(https://picsum.photos/id/15/800/450)"></div>
          </video>
          
          <!-- 视频加载占位符 -->
          <div id="videoPlaceholder" class="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
            <div class="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>

      <!-- 文字介绍 - 居中显示 -->
      <div class="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
        <div class="mb-10 transform translate-y-10 opacity-0" id="mainTitle">
          <h2 class="text-white text-[clamp(2rem,8vw,3.5rem)] font-hei font-bold text-shadow-lg tracking-wider leading-tight">山河图志</h2>
        </div>
        
        <!-- 副标题 -->
        <div class="transform translate-y-10 opacity-0" id="subtitle">
          <p class="text-white text-[clamp(0.9rem,2vw,1.1rem)]">Natural Journey</p>
          <p class="text-white/80 text-sm">Rivers and Mountains in Verse</p>
        </div>
      </div>
      
      <!-- 向下滚动指示器 -->
      <div class="absolute bottom-8 left-0 right-0 z-20 flex justify-center animate-bounce" id="scrollIndicator">
        <div class="text-white/80 cursor-pointer hover:text-white transition-colors" @click="scrollToNextSection">
          <i class="fa fa-angle-down text-2xl"></i>
        </div>
      </div>
    </section>

    <!-- 中国地图区域 -->
    <section class="py-20" style="background-color: #549688;">
      <div class="container mx-auto px-4">
        <div class="relative" style="height:70vh;">
          <!-- 左侧竖向文字介绍 - 绝对定位确保可见 -->
          <div style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); z-index: 10;">
            <div style="writing-mode: vertical-rl; text-orientation: mixed; white-space: nowrap; color: white; font-size: 48px; font-weight: bold; letter-spacing: 30px; text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">
              一览华夏
              
            </div>
          </div>
          <!-- 地图区域 - 适当偏移避免文字覆盖 -->
          <div id="map-section" style="width:100%;height:100%; padding-left: 120px;"></div>
        </div>
      </div>
    </section>

    <!-- 精选景点预览 -->
    <section class="py-20 bg-primary/5">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-[clamp(1.8rem,5vw,3rem)] font-hei text-primary mb-6">精选景点</h2>
          <div class="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- 景点卡片 -->
          <div class="relative group overflow-hidden rounded-lg shadow-lg h-80">
            <img src="https://picsum.photos/id/10/800/1200" alt="黄山" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 class="text-white text-xl font-hei">黄山</h3>
              <p class="text-white/80 text-sm">安徽省南部</p>
            </div>
          </div>

          <div class="relative group overflow-hidden rounded-lg shadow-lg h-80">
            <img src="https://picsum.photos/id/15/800/1200" alt="长江三峡" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 class="text-white text-xl font-hei">长江三峡</h3>
              <p class="text-white/80 text-sm">湖北、重庆</p>
            </div>
          </div>

          <div class="relative group overflow-hidden rounded-lg shadow-lg h-80">
            <img src="https://picsum.photos/id/29/800/1200" alt="长城" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 class="text-white text-xl font-hei">长城</h3>
              <p class="text-white/80 text-sm">北京市</p>
            </div>
          </div>

          <div class="relative group overflow-hidden rounded-lg shadow-lg h-80">
            <img src="https://picsum.photos/id/30/800/1200" alt="桂林山水" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 class="text-white text-xl font-hei">桂林山水</h3>
              <p class="text-white/80 text-sm">广西壮族自治区</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer >
      <div class="foot_box">
        <div class="theme">
            <div >方寸之间，万里山河</div>
        </div>
        <div class="copyright">
          武汉大学2025零杯网页设计大赛 网页设计这一块小组作品
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import 'echarts-gl'
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'

let chart = null
const router = useRouter()

// 动画控制器
const animationController = ref({
  isExpanded: false,
  isScrolling: false,
  progress: 0,
  timeline: null
})

// 元素引用
const heroSection = ref(null)

// 视频加载处理函数
const handleVideoLoaded = () => {
  const videoPlaceholder = document.getElementById('videoPlaceholder')
  if (videoPlaceholder) {
    gsap.to(videoPlaceholder, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        if (videoPlaceholder) {
          videoPlaceholder.style.display = 'none'
        }
      }
    })
  }
}

// 视频错误处理函数
const handleVideoError = () => {
  console.error('视频加载失败，将使用备用显示')
  const videoPlaceholder = document.getElementById('videoPlaceholder')
  if (videoPlaceholder) {
    videoPlaceholder.style.display = 'none'
  }
}

// 初始化入场动画
const initEntryAnimation = () => {
  // 创建GSAP时间线
  const tl = gsap.timeline({
    defaults: {
      duration: 1,
      ease: 'power2.out'
    }
  })
  
  // 标题动画
  const mainTitle = document.getElementById('mainTitle')
  if (mainTitle) {
    tl.to(mainTitle, {
      y: 0,
      opacity: 1,
      duration: 0.8
    }, 0.3)
  }
  
  // 副标题动画
  const subtitle = document.getElementById('subtitle')
  if (subtitle) {
    tl.to(subtitle, {
      y: 0,
      opacity: 1,
      duration: 0.8
    }, 0.8)
  }
  
  return tl
}

// 处理滚动动画 - 使用GSAP实现流畅过渡
const handleScrollAnimation = (progress) => {
  // 确保进度值在0-1之间
  const clampedProgress = Math.min(Math.max(progress, 0), 1)
  animationController.value.progress = clampedProgress
  
  // 视频容器展开动画
  const videoContainer = document.getElementById('videoContainer')
  if (videoContainer) {
    gsap.to(videoContainer, {
      width: clampedProgress >= 1 ? '100vw' : '60vw',
      height: clampedProgress >= 1 ? '100vh' : '40vh',
      borderRadius: clampedProgress >= 1 ? 0 : '0.5rem',
      duration: 0.5,
      ease: clampedProgress >= 1 ? 'power2.out' : 'power2.in'
    })
  }
  
  // 文字动画 - 根据滚动进度向两侧移动
  const textMoveDistance = clampedProgress * 100
  const mainTitle = document.getElementById('mainTitle')
  if (mainTitle) {
    gsap.to(mainTitle, {
      x: textMoveDistance,
      opacity: 1 - clampedProgress,
      duration: 0.5,
      ease: clampedProgress >= 1 ? 'power2.out' : 'power2.in'
    })
  }
  
  const subtitle = document.getElementById('subtitle')
  if (subtitle) {
    gsap.to(subtitle, {
      x: -textMoveDistance,
      opacity: 1 - clampedProgress,
      duration: 0.5,
      ease: clampedProgress >= 1 ? 'power2.out' : 'power2.in'
    })
  }
  
  // 背景图片缩放动画
  const backgroundImage = document.getElementById('backgroundImage')
  if (backgroundImage) {
    gsap.to(backgroundImage, {
      scale: 1 + clampedProgress * 0.3,
      duration: 0.5,
      ease: 'power2.out'
    })
  }
  
  // 滚动指示器淡出
  const scrollIndicator = document.getElementById('scrollIndicator')
  if (scrollIndicator) {
    gsap.to(scrollIndicator, {
      opacity: 1 - clampedProgress * 2,
      duration: 0.5,
      ease: 'power2.out'
    })
  }
}

// 处理鼠标滚轮事件 - 节流优化
let lastWheelTime = 0
const handleWheel = (e) => {
  if (animationController.value.isExpanded) return
  
  const currentTime = Date.now()
  const deltaTime = currentTime - lastWheelTime
  
  // 节流处理，限制更新频率
  if (deltaTime < 16) return // 约60fps
  lastWheelTime = currentTime
  
  e.preventDefault()
  
  const scrollDelta = e.deltaY * 0.001
  const newProgress = Math.min(Math.max(animationController.value.progress + scrollDelta, 0), 1)
  
  handleScrollAnimation(newProgress)
  
  // 当滚动进度达到100%时，完成展开动画
  if (newProgress >= 1 && !animationController.value.isScrolling) {
    completeExpansion()
  }
}

// 处理触摸事件（移动端）
const touchStartY = ref(0)
const handleTouchStart = (e) => {
  if (animationController.value.isExpanded) return
  touchStartY.value = e.touches[0].clientY
}

const handleTouchMove = (e) => {
  if (animationController.value.isExpanded || !touchStartY.value) return
  
  e.preventDefault()
  
  const touchY = e.touches[0].clientY
  const deltaY = touchStartY.value - touchY
  
  // 增加移动端的滚动敏感度
  const scrollFactor = deltaY < 0 ? 0.01 : 0.005
  const scrollDelta = deltaY * scrollFactor
  
  const newProgress = Math.min(Math.max(animationController.value.progress + scrollDelta, 0), 1)
  handleScrollAnimation(newProgress)
  
  if (newProgress >= 1 && !animationController.value.isScrolling) {
    completeExpansion()
  }
  
  touchStartY.value = touchY
}

// 完成展开动画
const completeExpansion = () => {
  animationController.value.isScrolling = true
  
  // 确保视频完全展开并覆盖全屏
  const videoContainer = document.getElementById('videoContainer')
  if (videoContainer) {
    gsap.to(videoContainer, {
      width: '100vw',
      height: '100vh',
      borderRadius: 0,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        animationController.value.isExpanded = true
        // 延迟后允许页面正常滚动
        setTimeout(() => {
          document.body.style.overflow = 'auto'
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
          animationController.value.isScrolling = false
        }, 300)
      }
    })
  }
}

// 处理向上滚动，重置动画
const handleScroll = () => {
  // 导航栏样式设置
  const navbar = document.getElementById('navbar')
  if (navbar) {
    navbar.classList.add('bg-black/90', 'shadow-lg')
  }
  
  // 当滚动回顶部时，重置动画状态
  if (animationController.value.isExpanded && window.scrollY < window.innerHeight * 0.5) {
    animationController.value.isExpanded = false
    handleScrollAnimation(0)
    document.body.style.overflow = 'hidden'
  }
}

// 滚动到下一部分
const scrollToNextSection = () => {
  if (!animationController.value.isExpanded) {
    // 快速展开英雄区域
    handleScrollAnimation(1)
    completeExpansion()
  } else {
    // 直接滚动到地图区域
    const mapSection = document.getElementById('map-section')
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

// 设置视频元素事件监听
const setupVideoEvents = () => {
  const video = document.getElementById('heroVideo')
  if (video) {
    video.addEventListener('loadeddata', handleVideoLoaded)
    video.addEventListener('error', handleVideoError)
    
    // 尝试在用户交互后播放视频（针对自动播放限制）
    const playVideo = () => {
      if (video.paused) {
        video.play().catch(err => {
          console.log('视频自动播放被浏览器阻止：', err)
        })
      }
      document.removeEventListener('click', playVideo)
      document.removeEventListener('touchstart', playVideo)
    }
    
    document.addEventListener('click', playVideo)
    document.addEventListener('touchstart', playVideo)
  }
}

onMounted(async () => {
  // 等待DOM元素完全渲染
  await nextTick()
  
  // 初始化入场动画
  animationController.value.timeline = initEntryAnimation()
  
  // 设置视频事件
  setupVideoEvents()
  
  // 初始化地图
  const dom = document.getElementById('map-section')
  if (dom) {
    chart = echarts.init(dom)

    try {
      const res = await fetch('/china.json')
      const chinaGeo = await res.json()

      chinaGeo.features = chinaGeo.features.filter(f => f && f.geometry && f.geometry.coordinates && f.geometry.coordinates.length)
      chinaGeo.features.forEach(f => {
        if (!f.properties) f.properties = {}
        if (!f.properties.name) {
          f.properties.name = f.properties.NAME || f.properties.CHN_NAME || '未知'
        }
      })

      echarts.registerMap('china', chinaGeo)

      const option = {
        backgroundColor: 'transparent',
        series: [
          {
            type: 'map3D',
            map: 'china',
            regionHeight: 3,
            roam: true,
            itemStyle: {
              color: '#F4EAC5',
              borderColor: '#549688',
              borderWidth: 0.5,
              opacity: 0.9,
            },
            emphasis: {
              label: { show: true, color: '#2F4F4F' },
              itemStyle: { color: '#F4EAC5' },
            },
            light: {
              main: { intensity: 1.2, shadow: true, alpha: 40, beta: -30 },
              ambient: { intensity: 0.6 },
            },
            viewControl: {
              distance: 90,
              alpha: 85,
              beta: 0,
              zoomSensitivity: 0.2,
              panSensitivity: 0.2,
              rotateSensitivity: 0.5,
            },
          },
        ],
      }

      chart.setOption(option)

      // 点击跳转省份详情页
      chart.on('click', params => {
        if (params.name) {
          console.log('点击了省份：', params.name)
          router.push(`/province/${params.name}`)
        }
      })

      window.addEventListener('resize', () => chart && chart.resize())
    } catch (error) {
      console.error('地图初始化失败:', error)
    }
  }
  
  // 添加事件监听
  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('touchstart', handleTouchStart, { passive: false })
  window.addEventListener('touchmove', handleTouchMove, { passive: false })
  window.addEventListener('scroll', handleScroll)
  
  // 初始状态下隐藏滚动条
  document.body.style.overflow = 'hidden'
})

onBeforeUnmount(() => {
  // 清理动画
  if (animationController.value.timeline) {
    animationController.value.timeline.kill()
  }
  
  // 清理地图
  if (chart) {
    chart.dispose()
    chart = null
  }
  
  // 移除事件监听
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchmove', handleTouchMove)
  window.removeEventListener('scroll', handleScroll)
  
  // 清理视频事件
  const video = document.getElementById('heroVideo')
  if (video) {
    video.removeEventListener('loadeddata', handleVideoLoaded)
    video.removeEventListener('error', handleVideoError)
  }
  
  // 恢复页面滚动设置
  document.body.style.overflow = 'auto'
})
</script>

<style scoped>
.app-container {
  width: 100%;
  height: fit-content;
}

/* 自定义工具类 */
.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.text-shadow-lg {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
}

.bg-blur {
  backdrop-filter: blur(8px);
}
#navbar {
  transition: all 0.3s ease;
  padding: 2rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.9);
  height: 70px;
  align-items: center;
  display: flex;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

#navbar .nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

#navbar .nav-item {
  color: white;
  font-size: 1.1rem;
  font-weight: 400;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0;
}

#navbar .nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: white;
  transition: width 0.3s ease;
}

#navbar .nav-item:hover {
  color: #ffffff;
  opacity: 0.9;
}

#navbar .nav-item:hover::after {
  width: 100%;
}

#navbar .nav-item.active {
  font-weight: 600;
}

#navbar .nav-item.active::after {
  width: 100%;
}

/* 响应式导航 */
@media (max-width: 768px) {
  #navbar {
    padding: 1rem;
  }
  
  #navbar .nav-links {
    gap: 1rem;
  }
  
  #navbar .nav-links a {
    font-size: 1rem;
  }
}

footer {
  background-color: var(--color-primary);
  padding: 2rem 0;
  color: var(--color-light);
}

.foot_box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
}

.theme {
    font-size: 1.2rem;
    font-weight: 500;
    font-family: var(--font-hei, sans-serif);
  }

.copyright {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

/* 景点卡片悬停效果增强 */
.rounded-lg {
  border-radius: 0.75rem;
  overflow: hidden;
}

.shadow-lg {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

/* 优化过渡动画 */
.group-hover\:scale-110 {
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 按钮样式优化 */
.rounded-full {
  border-radius: 9999px;
}

/* 动画效果 */
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

/* 背景动态效果 */
/* 移除无限循环的panZoom动画，改用基于滚动的缩放效果 */
</style>