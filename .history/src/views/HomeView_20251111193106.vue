<template>
  <div class="app-container" ref="appContainer">
    <!-- 导航栏 - 固定在顶部 -->
    <nav id="navbar" class="fixed top-0 left-0 right-0 z-[1000]">
        <div class="nav-links">
          <router-link to="/" class="nav-item active">首页</router-link>
          <router-link to="/RouteView" class="nav-item">山河漫游</router-link>
          <router-link to="/Challenge" class="nav-item">过关闯将</router-link>
          <router-link to="#" class="nav-item">云锦书来</router-link>
        </div>
    </nav>
  
      <!-- 先导页/首页滚动扩展区域 -->
      <section class="relative flex flex-col items-center justify-start min-h-screen">
        <div class="relative w-full flex flex-col items-center min-h-screen">
          <!-- 全屏背景图片 -->
          <div 
            class="absolute inset-0 z-0 h-full bg-cover bg-center"
            :style="{ 
              backgroundImage: `url(${backgroundImage})`,
              opacity: 1 - scrollProgress
            }"
          ></div>

          <div class="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div class="flex flex-col items-center justify-center w-full h-screen relative">
              <!-- 画中画视频容器 -->
              <div
                class="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-2xl"
                :style="{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh'
                }"
              >
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
                  <source src="/assets/videos/immersive_water.mp4" type="video/mp4">
                  <source src="/assets/videos/immersive_water.webm" type="video/webm">
                </video>
                <!-- 视频加载失败时显示的备用图片 -->
                <div 
                  class="video-fallback absolute inset-0 bg-cover bg-center rounded-lg"
                  :class="{ 'hidden': !showFallback }"
                  style="background-image: url('/img/homePage/bgHome.jpg')"
                ></div>
              </div>

              <!-- 文字标题 -->
              <div class="flex items-center justify-center text-center gap-4 w-full relative z-10">
                <h2 
                  class="text-[clamp(1.8rem,5vw,3.5rem)] font-hei text-white text-shadow-lg"
                  :style="{ transform: `translateX(-${textTranslateX}vw)` }"
                >
                  山河图志
                </h2>
              </div>

              <!-- 副标题 -->
              <div 
                class="text-white text-center mt-4 relative z-10"
                :style="{ transform: `translateX(${textTranslateX}vw)` }"
              >
                <p class="text-[clamp(1rem,2vw,1.2rem)] opacity-90">方寸图间</p>
                <p class="text-sm opacity-70">万里山河</p>
              </div>
            </div>

            <!-- 首页内容区域 - 滚动后显示 -->
            <section 
              class="flex flex-col w-full px-4 py-20 relative z-20" 
              :style="{ opacity: showContent ? 1 : 0 }"
            >
              <!-- 中国地图区域 -->
              <div class="py-20" style="background-color: #206864; position: relative; z-index: 10;">
                <div class="container mx-auto px-4">
                  <div id="map-section" style="width:100%;height:70vh;"></div>
                </div>
              </div>

              <!-- 精选景点预览 -->
              <div class="py-20" style="background-color: #206864; position: relative; z-index: 10;">
                <div class="container mx-auto px-4">
                  <div class="text-center mb-16">
                    <h2 class="text-[clamp(1.8rem,5vw,3rem)] font-hei text-white mb-6">精选景点</h2>
                    <div class="w-20 h-1 bg-white mx-auto"></div>
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
              </div>

              <!-- 底部 -->
              <footer style="position: relative; z-index: 10;">
                <div class="foot_box">
                  <div class="theme">
                      <div >方寸之间，万里山河</div>
                  </div>
                  <div class="copyright">
                    武汉大学2025零杯网页设计大赛 网页设计这一块小组作品
                  </div>
                </div>
              </footer>
            </section>
          </div>
        </div>
      </section>
    </div>
</template>

<script setup>
import * as echarts from 'echarts'
import 'echarts-gl'
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'

let chart = null
const appContainer = ref(null)

// 滚动进度状态
const scrollProgress = ref(0)
const showContent = ref(false)
const mediaFullyExpanded = ref(false)
const touchStartY = ref(0)
const isMobile = ref(false)

// 媒体相关状态
const backgroundImage = ref('/img/homePage/bgHome.jpg')
const showFallback = ref(false)

// 计算媒体尺寸和文字偏移
const mediaWidth = ref(300)
const mediaHeight = ref(400)
const textTranslateX = ref(0)

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

// 处理滚动事件
const handleScroll = () => {
  // 当媒体完全展开后，让页面正常滚动
  if (mediaFullyExpanded.value) {
    // 导航栏样式处理
    const navbar = document.getElementById('navbar')
    if (navbar) {
      navbar.classList.add('bg-black/90', 'shadow-lg')
    }
    return
  }
  
  // 阻止默认滚动行为
  window.scrollTo(0, 0)
}

// 处理鼠标滚轮事件
const handleWheel = (e) => {
  if (mediaFullyExpanded.value && e.deltaY < 0 && window.scrollY <= 5) {
    // 向上滚动返回初始状态
    resetToInitialState()
    e.preventDefault()
  } else if (!mediaFullyExpanded.value) {
    e.preventDefault()
    
    // 更新滚动进度
    const scrollDelta = e.deltaY * 0.0009
    const newProgress = Math.min(Math.max(scrollProgress.value + scrollDelta, 0), 1)
    updateScrollProgress(newProgress)
  }
}

// 处理触摸事件
const handleTouchStart = (e) => {
  touchStartY.value = e.touches[0].clientY
}

const handleTouchMove = (e) => {
  if (!touchStartY.value) return

  const touchY = e.touches[0].clientY
  const deltaY = touchStartY.value - touchY

  if (mediaFullyExpanded.value && deltaY < -20 && window.scrollY <= 5) {
    // 向上滑动返回初始状态
    resetToInitialState()
    e.preventDefault()
  } else if (!mediaFullyExpanded.value) {
    e.preventDefault()
    
    // 增加移动设备的滚动敏感度
    const scrollFactor = deltaY < 0 ? 0.008 : 0.005
    const scrollDelta = deltaY * scrollFactor
    const newProgress = Math.min(Math.max(scrollProgress.value + scrollDelta, 0), 1)
    updateScrollProgress(newProgress)

    touchStartY.value = touchY
  }
}

const handleTouchEnd = () => {
  touchStartY.value = 0
}

// 更新滚动进度并应用动画
const updateScrollProgress = (newProgress) => {
  scrollProgress.value = newProgress
  
  // 更新媒体尺寸
  mediaWidth.value = 300 + newProgress * (isMobile.value ? 650 : 1250)
  mediaHeight.value = 400 + newProgress * (isMobile.value ? 200 : 400)
  
  // 更新文字偏移
  textTranslateX.value = newProgress * (isMobile.value ? 180 : 150)
  
  // 控制内容显示
  if (newProgress >= 1) {
    mediaFullyExpanded.value = true
    showContent.value = true
    // 允许页面正常滚动
    document.body.style.overflow = 'auto'
  } else if (newProgress < 0.75) {
    showContent.value = false
    document.body.style.overflow = 'hidden'
  }
}

// 重置到初始状态
const resetToInitialState = () => {
  mediaFullyExpanded.value = false
  showContent.value = false
  updateScrollProgress(0)
  document.body.style.overflow = 'hidden'
}

// 检查是否为移动设备
const checkIfMobile = () => {
  isMobile.value = window.innerWidth < 768
}

// 设置视频元素事件监听
const setupVideoEvents = () => {
  const video = document.getElementById('heroVideo')
  if (video) {
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
    
    // 尝试在用户交互后播放视频
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
    showFallback.value = true
  }
}

onMounted(async () => {
  await nextTick()
  
  // 初始化状态
  checkIfMobile()
  resetToInitialState()
  
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
        backgroundColor: '#206864',
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
      window.addEventListener('resize', () => chart && chart.resize())
    } catch (error) {
      console.error('地图初始化失败:', error)
    }
  }
  
  // 添加事件监听
  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('touchstart', handleTouchStart, { passive: false })
  window.addEventListener('touchmove', handleTouchMove, { passive: false })
  window.addEventListener('touchend', handleTouchEnd)
  window.addEventListener('resize', checkIfMobile)
})

onBeforeUnmount(() => {
  // 清理地图
  if (chart) {
    chart.dispose()
    chart = null
  }
  
  // 移除事件监听
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchmove', handleTouchMove)
  window.removeEventListener('touchend', handleTouchEnd)
  window.removeEventListener('resize', checkIfMobile)
  
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
  overflow-x: hidden;
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

/* 视频样式 */
#heroVideo {
  transition: transform 0.1s ease-out;
  will-change: transform;
  backface-visibility: hidden;
}

.video-fallback {
  transition: opacity 0.3s ease;
}

.video-fallback.hidden {
  opacity: 0;
  pointer-events: none;
}

/* 底部样式 */
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

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* 优化过渡动画 */
.group-hover\:scale-110 {
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 性能优化 */
* {
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

/* 确保内容区域过渡平滑 */
section > div {
  transition: opacity 0.7s ease;
}
</style>