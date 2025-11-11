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
      <section class="relative w-full h-screen overflow-hidden" ref="heroSection" style="background-image: url(/img/homePage/bgHome.jpg); background-size: cover; background-position: center; background-repeat: no-repeat; transition: background-image 1s ease, background-color 1s ease;">
        <!-- 背景图片直接应用在section上 -->
      
      <!-- 前景视频层 -->
      <div class="absolute inset-0 z-10 flex items-center justify-center" style="background-color: transparent;">
          <div class="relative w-[60vw] h-[40vh] max-w-[800px] max-h-[450px]" id="videoContainer">
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
          <h2 class="text-white text-[clamp(1.2rem,4vw,2rem)] font-hei text-shadow-lg">山河图志</h2>
        </div>
        
        <!-- 副标题 -->
        <div class="transform translate-y-10 opacity-0" id="subtitle">
          <p class="text-white text-[clamp(0.9rem,2vw,1.1rem)]">方寸图间</p>
          <p class="text-white/80 text-sm">万里山河</p>
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
    <section class="py-20" style="background-color: #206864;">
      <div class="container mx-auto px-4">
        <div id="map-section" style="width:100%;height:70vh;"></div>
      </div>
    </section>

    <!-- 精选景点预览 -->
    <section class="py-20" style="background-color: #206864;">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-[clamp(1.8rem,5vw,3rem)] font-hei text-dark mb-6">精选景点</h2>
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
import { onMounted, onBeforeUnmount, ref, nextTick, watch } from 'vue'
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

// 重置动画状态
const resetAnimationState = () => {
  animationController.value.isExpanded = false
  animationController.value.isScrolling = false
  animationController.value.progress = 0
  
  const videoContainer = document.getElementById('videoContainer')
  if (videoContainer) {
    videoContainer.style.position = 'relative'
    videoContainer.style.width = '60vw'
    videoContainer.style.height = '40vh'
    videoContainer.style.borderRadius = '0.5rem'
    videoContainer.style.margin = 'auto'
    videoContainer.style.zIndex = '10'
    videoContainer.style.transform = 'translate(0, 0)'
  }
  
  const video = document.getElementById('heroVideo')
  if (video) {
    video.style.borderRadius = '0.5rem'
  }
  
  if (heroSection.value) {
    heroSection.value.style.backgroundImage = 'url(/img/homePage/bgHome.jpg)'
    heroSection.value.style.backgroundColor = 'transparent'
  }
  
  const mainTitle = document.getElementById('mainTitle')
  if (mainTitle) {
    mainTitle.style.transform = 'translate(0, 0)'
    mainTitle.style.opacity = '1'
  }
  
  const subtitle = document.getElementById('subtitle')
  if (subtitle) {
    subtitle.style.transform = 'translate(0, 0)'
    subtitle.style.opacity = '1'
  }
  
  document.body.style.overflow = 'hidden'
}

// 处理滚动动画 - 修复卡顿问题
const handleScrollAnimation = (progress) => {
  // 确保进度值在0-1之间
  const clampedProgress = Math.min(Math.max(progress, 0), 1)
  animationController.value.progress = clampedProgress
  
  // 视频容器展开动画 - 确保流畅缩放和精确对齐
  const videoContainer = document.getElementById('videoContainer')
  if (videoContainer) {
    // 计算新的尺寸，确保视频左右边缘精确对齐浏览器窗口
    const newWidth = `${60 + 40 * clampedProgress}vw`
    const newHeight = `${40 + 60 * clampedProgress}vh`
    const newBorderRadius = `${(1 - clampedProgress) * 0.5}rem`
    
    // 直接修改样式，避免过多的GSAP实例导致性能问题
    videoContainer.style.width = newWidth
    videoContainer.style.height = newHeight
    videoContainer.style.borderRadius = newBorderRadius
    
    // 确保视频元素样式同步更新
    const video = document.getElementById('heroVideo')
    if (video) {
      video.style.borderRadius = newBorderRadius
    }
    
    // 当进度接近1时，准备切换到fixed定位
    if (clampedProgress >= 0.95) {
      videoContainer.style.position = 'fixed'
      videoContainer.style.top = '0'
      videoContainer.style.left = '0'
      videoContainer.style.right = '0'
      videoContainer.style.bottom = '0'
      videoContainer.style.width = '100vw'
      videoContainer.style.height = '100vh'
      videoContainer.style.borderRadius = '0'
      videoContainer.style.margin = '0'
      videoContainer.style.padding = '0'
      videoContainer.style.border = 'none'
      videoContainer.style.overflow = 'hidden'
      videoContainer.style.zIndex = '10'
    } else if (clampedProgress < 0.95) {
      // 未达到阈值时，保持相对定位
      videoContainer.style.position = 'relative'
      videoContainer.style.top = 'auto'
      videoContainer.style.left = 'auto'
      videoContainer.style.right = 'auto'
      videoContainer.style.bottom = 'auto'
      videoContainer.style.margin = 'auto'
    }
  }
  
  // 文字动画 - 根据滚动进度向两侧移动
  const textMoveDistance = clampedProgress * 100
  const mainTitle = document.getElementById('mainTitle')
  if (mainTitle) {
    mainTitle.style.transform = `translateX(${textMoveDistance}px)`
    mainTitle.style.opacity = `${1 - clampedProgress}`
  }
  
  const subtitle = document.getElementById('subtitle')
  if (subtitle) {
    subtitle.style.transform = `translateX(${-textMoveDistance}px)`
    subtitle.style.opacity = `${1 - clampedProgress}`
  }
  
  // 背景图片渐变消失效果
  if (heroSection.value) {
    const backgroundOpacity = 1 - clampedProgress
    heroSection.value.style.backgroundImage = `linear-gradient(to bottom, rgba(32, 104, 100, ${1 - backgroundOpacity}), rgba(32, 104, 100, ${1 - backgroundOpacity})), url(/img/homePage/bgHome.jpg)`
  }
  
  // 滚动指示器淡出
  const scrollIndicator = document.getElementById('scrollIndicator')
  if (scrollIndicator) {
    scrollIndicator.style.opacity = `${Math.max(0, 1 - clampedProgress * 2)}`
  }
}

// 处理鼠标滚轮事件 - 优化性能和响应性
let lastWheelTime = 0
const handleWheel = (e) => {
  if (animationController.value.isExpanded || animationController.value.isScrolling) return
  
  // 避免过于频繁的更新
  const currentTime = Date.now()
  const deltaTime = currentTime - lastWheelTime
  
  // 适当的节流以平衡性能和流畅度
  if (deltaTime < 16) return // 约60fps
  
  lastWheelTime = currentTime
  e.preventDefault()
  
  // 适中的滚动敏感度
  const scrollDelta = e.deltaY * 0.0015
  const newProgress = Math.min(Math.max(animationController.value.progress + scrollDelta, 0), 1)
  
  // 立即应用动画更新
  handleScrollAnimation(newProgress)
  
  // 当滚动进度达到100%时，完成展开动画
  if (newProgress >= 1 && !animationController.value.isScrolling) {
    completeExpansion()
  }
}

// 处理触摸事件（移动端）
const touchStartY = ref(0)
const handleTouchStart = (e) => {
  if (animationController.value.isExpanded || animationController.value.isScrolling) return
  touchStartY.value = e.touches[0].clientY
}

const handleTouchMove = (e) => {
  if (animationController.value.isExpanded || animationController.value.isScrolling || !touchStartY.value) return
  
  e.preventDefault()
  
  const touchY = e.touches[0].clientY
  const deltaY = touchStartY.value - touchY
  
  // 适中的滚动敏感度
  const scrollFactor = 0.006
  const scrollDelta = deltaY * scrollFactor
  
  const newProgress = Math.min(Math.max(animationController.value.progress + scrollDelta, 0), 1)
  
  // 立即应用动画更新
  handleScrollAnimation(newProgress)
  
  if (newProgress >= 1 && !animationController.value.isScrolling) {
    completeExpansion()
  }
  
  touchStartY.value = touchY
}

// 完成展开动画
const completeExpansion = () => {
  animationController.value.isScrolling = true
  
  // 确保视频完全展开并精确对齐浏览器窗口左右边框
  const videoContainer = document.getElementById('videoContainer')
  if (videoContainer) {
    // 直接设置CSS属性确保完全全屏和精确对齐
    videoContainer.style.position = 'fixed'
    videoContainer.style.top = '0'
    videoContainer.style.left = '0'
    videoContainer.style.right = '0'
    videoContainer.style.bottom = '0'
    videoContainer.style.width = '100vw'
    videoContainer.style.height = '100vh'
    videoContainer.style.borderRadius = '0'
    videoContainer.style.margin = '0'
    videoContainer.style.padding = '0'
    videoContainer.style.border = 'none'
    videoContainer.style.overflow = 'hidden'
    videoContainer.style.zIndex = '10'
    
    // 确保视频元素也完全占满容器，精确对齐左右边框
    const video = document.getElementById('heroVideo')
    if (video) {
      video.style.borderRadius = '0'
    }
    
    // 使用GSAP进行最终平滑过渡
    gsap.to(videoContainer, {
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        animationController.value.isExpanded = true
        // 确保背景图片完全隐藏，显示背景色
        if (heroSection.value) {
          heroSection.value.style.backgroundImage = 'none'
          heroSection.value.style.backgroundColor = '#206864'
        }
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
    animationController.value.isScrolling = true
    
    // 恢复背景图片显示
    if (heroSection.value) {
      heroSection.value.style.backgroundImage = 'url(/img/homePage/bgHome.jpg)'
      heroSection.value.style.backgroundColor = 'transparent'
    }
    
    // 视频倒放动画 - 恢复到原始大小和位置
    const videoContainer = document.getElementById('videoContainer')
    const mainTitle = document.getElementById('mainTitle')
    const subtitle = document.getElementById('subtitle')
    const scrollIndicator = document.getElementById('scrollIndicator')
    
    // 创建GSAP时间线协调所有动画
    const tl = gsap.timeline({
      onComplete: () => {
        resetAnimationState()
      }
    })
    
    // 先设置回相对定位
    if (videoContainer) {
      videoContainer.style.position = 'relative'
      videoContainer.style.margin = 'auto'
      
      tl.to(videoContainer, {
        width: '60vw',
        height: '40vh',
        borderRadius: '0.5rem',
        duration: 1.0,
        ease: 'power2.inOut'
      }, 0)
    }
    
    // 标题倒放动画 - 从两侧合拢
    if (mainTitle) {
      tl.to(mainTitle, {
        x: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'power2.inOut'
      }, 0)
    }
    
    if (subtitle) {
      tl.to(subtitle, {
        x: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'power2.inOut',
        delay: 0.1
      }, 0)
    }
    
    // 滚动指示器恢复显示
    if (scrollIndicator) {
      tl.to(scrollIndicator, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.3
      }, 0)
    }
    
    // 平滑滚动到顶部
    tl.to(window, {
      scrollY: 0,
      duration: 1.5,
      ease: 'power2.inOut'
    }, 0)
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
  
  // 重置动画状态，确保页面从正确的初始状态开始
  resetAnimationState()
  
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
        backgroundColor: '#0e1a2b',
        series: [
          {
            type: 'map3D',
            map: 'china',
            regionHeight: 3,
            roam: true,
            itemStyle: {
              color: '#0c5da5',
              borderColor: '#6cf',
              borderWidth: 0.5,
              opacity: 1,
            },
            emphasis: {
              label: { show: true, color: '#fff' },
              itemStyle: { color: '#ffcb60' },
            },
            light: {
              main: { intensity: 1.2, shadow: true, alpha: 40, beta: -30 },
              ambient: { intensity: 0.3 },
            },
            viewControl: {
              distance: 90,
              alpha: 85,
              beta: 0,
              zoomSensitivity: 0.5,
              panSensitivity: 0.5,
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
  background-color: #206864;
  padding: 2rem 0;
  color: white;
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

/* 优化视频容器性能 */
#videoContainer {
  transition: width 0.1s ease-out, height 0.1s ease-out, borderRadius 0.1s ease-out;
  will-change: width, height, position, borderRadius;
  backface-visibility: hidden;
}

/* 视频元素优化 */
#heroVideo {
  transition: borderRadius 0.1s ease-out;
  will-change: borderRadius;
  backface-visibility: hidden;
}

/* 文字动画优化 */
#mainTitle, #subtitle {
  transition: transform 0.1s ease-out, opacity 0.1s ease-out;
  will-change: transform, opacity;
}

/* 滚动指示器优化 */
#scrollIndicator {
  transition: opacity 0.1s ease-out;
  will-change: opacity;
}
</style>