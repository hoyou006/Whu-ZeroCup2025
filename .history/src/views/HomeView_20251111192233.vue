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
  
      <!-- 视频区域 - 与首页内容处于同一层级 -->
      <section class="w-full h-screen relative overflow-hidden">
        <!-- 首页视频 - 不是悬浮形式，而是作为内容的一部分 -->
        <div class="w-full h-full" id="videoContainer">
          <video 
            id="heroVideo"
            class="w-full h-full object-cover"
            autoplay 
            muted 
            loop 
            playsinline
            preload="metadata"
            @error="handleVideoError"
          >
            <source src="/assets/videos/immersive_water.mp4" type="video/mp4">
            <source src="/assets/videos/immersive_water.webm" type="video/webm">
            <div class="absolute inset-0 bg-cover bg-center" style="background-image: url(https://picsum.photos/id/15/1920/1080)"></div>
          </video>
        </div>
        
        <!-- 文字介绍 - 居中显示 -->
        <div class="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
          <div class="mb-10" id="mainTitle">
            <h2 class="text-white text-[clamp(1.2rem,4vw,2rem)] font-hei text-shadow-lg">山河图志</h2>
          </div>
          
          <div id="subtitle">
            <p class="text-white text-[clamp(0.9rem,2vw,1.1rem)]">方寸图间</p>
            <p class="text-white/80 text-sm">万里山河</p>
          </div>
        </div>
        
        <!-- 向上滚动指示器 - 用于返回先导页 -->
        <div class="absolute top-8 left-0 right-0 z-20 flex justify-center animate-bounce" id="scrollToSplashIndicator">
          <div class="text-white/80 cursor-pointer hover:text-white transition-colors" @click="scrollToSplash">
            <i class="fa fa-angle-up text-2xl"></i>
          </div>
        </div>
        
        <!-- 向下滚动指示器 - 用于滚动到下一部分 -->
        <div class="absolute bottom-8 left-0 right-0 z-20 flex justify-center animate-bounce" id="scrollIndicator">
          <div class="text-white/80 cursor-pointer hover:text-white transition-colors" @click="scrollToMapSection">
            <i class="fa fa-angle-down text-2xl"></i>
          </div>
        </div>
      </section>

      <!-- 中国地图区域 -->
      <section class="py-20" style="background-color: #206864; position: relative; z-index: 10;">
        <div class="container mx-auto px-4">
          <div id="map-section" style="width:100%;height:70vh;"></div>
        </div>
      </section>

      <!-- 精选景点预览 -->
      <section class="py-20" style="background-color: #206864; position: relative; z-index: 10;">
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
      </section>

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
const appContainer = ref(null)

// 动画控制器
const animationController = ref({
  isInitializing: true,
  isScrollingToSplash: false
})

// 视频加载处理函数
const handleVideoLoaded = () => {
  // 视频加载完成后执行初始动画
  if (animationController.value.isInitializing) {
    animationController.value.isInitializing = false
    initEntryAnimation()
  }
}

// 视频错误处理函数
const handleVideoError = () => {
  console.error('视频加载失败，将使用备用显示')
}

// 初始化入场动画
const initEntryAnimation = () => {
  // 标题淡入动画
  const mainTitle = document.getElementById('mainTitle')
  const subtitle = document.getElementById('subtitle')
  
  const tl = gsap.timeline({
    defaults: {
      duration: 1,
      ease: 'power2.out'
    }
  })
  
  if (mainTitle) {
    tl.fromTo(mainTitle, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0 }
    )
  }
  
  if (subtitle) {
    tl.fromTo(subtitle, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0 },
      '-=0.5'
    )
  }
  
  // 导航栏淡入
  const navbar = document.getElementById('navbar')
  if (navbar) {
    tl.fromTo(navbar, 
      { opacity: 0 }, 
      { opacity: 1 },
      '-=0.3'
    )
  }
}

// 滚动到地图区域
const scrollToMapSection = () => {
  const mapSection = document.getElementById('map-section')
  if (mapSection) {
    mapSection.scrollIntoView({ behavior: 'smooth' })
  }
}

// 返回先导页
const scrollToSplash = () => {
  if (animationController.value.isScrollingToSplash) return
  
  animationController.value.isScrollingToSplash = true
  
  // 创建淡出动画
  const tl = gsap.timeline({
    onComplete: () => {
      // 导航到先导页
      router.push('/splash').catch(() => {
        // 如果导航失败（因为没有/splash路由），则直接刷新页面
        window.location.href = '/splash';
      });
    }
  })
  
  // 淡出所有元素
  tl.to(appContainer.value, {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.inOut'
  })
}

// 处理向上滚动事件 - 当滚动到页面顶部时，可以返回到先导页
const handleScroll = () => {
  // 导航栏样式处理
  const navbar = document.getElementById('navbar')
  if (navbar) {
    navbar.classList.add('bg-black/90', 'shadow-lg')
  }
  
  // 当用户在视频区域内向上滚动时，显示向上滚动指示器
  const scrollToSplashIndicator = document.getElementById('scrollToSplashIndicator')
  if (scrollToSplashIndicator) {
    if (window.scrollY < window.innerHeight * 0.2) {
      scrollToSplashIndicator.style.opacity = '1'
    } else {
      scrollToSplashIndicator.style.opacity = '0'
    }
  }
  
  // 当用户在视频区域内向下滚动时，隐藏向下滚动指示器
  const scrollIndicator = document.getElementById('scrollIndicator')
  if (scrollIndicator) {
    if (window.scrollY > window.innerHeight * 0.2) {
      scrollIndicator.style.opacity = '0'
    } else {
      scrollIndicator.style.opacity = '1'
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
  await nextTick()
  
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
  
  // 添加滚动事件监听
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  // 清理地图
  if (chart) {
    chart.dispose()
    chart = null
  }
  
  // 移除滚动事件监听
  window.removeEventListener('scroll', handleScroll)
  
  // 清理视频事件
  const video = document.getElementById('heroVideo')
  if (video) {
    video.removeEventListener('loadeddata', handleVideoLoaded)
    video.removeEventListener('error', handleVideoError)
  }
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

/* 视频容器样式 */
#videoContainer {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

#heroVideo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 滚动指示器样式 */
#scrollToSplashIndicator,
#scrollIndicator {
  transition: opacity 0.3s ease;
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

/* 优化过渡动画 */
.group-hover\:scale-110 {
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
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
</style>