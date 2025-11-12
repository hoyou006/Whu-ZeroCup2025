<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <NavBar></NavBar>

    <!-- 视频背景 -->
    <section class="relative h-screen w-full overflow-hidden">
      <!-- 背景图片 -->
      <div class="absolute inset-0 bg-black/30 z-10"></div>
      <div class="absolute inset-0 bg-cover bg-center z-0" style="background-image: url('https://picsum.photos/id/10/1920/1080');"></div>

      <!-- 文字介绍 -->
      <div class="absolute inset-0 z-20 flex flex-col justify-end items-center text-center px-4 pb-32">
        <div class="mb-6 opacity-0 transform translate-y-10 transition-all duration-1000" id="mainTitle">
          <img src="/img/shanhetuzhi.png" alt="山河图志" class="max-w-full h-auto max-h-[clamp(3rem,10vw,6rem)] object-contain">
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
          <div style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); z-index: 10; display: flex; align-items: center; gap: 40px;">
            <!-- 主标题 -->
            <div style="writing-mode: vertical-rl; text-orientation: mixed; white-space: nowrap; color: white; font-size: 48px; font-weight: bold; letter-spacing: 30px; text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">
              一览华夏
            </div>
            <!-- 小字说明 -->
            <div style="writing-mode: vertical-rl; text-orientation: mixed; white-space: nowrap; color: white; font-size: 16px; letter-spacing: 8px; text-shadow: 1px 1px 2px rgba(0,0,0,0.8); opacity: 0.9;">
              轻点省份板块可观山水画卷
            </div>
          </div>
          <!-- 地图区域 - 适当偏移避免文字覆盖 -->
            <div id="map-section" style="width:100%;height:100%; padding-left: 250px;"></div>
        </div>
      </div>
    </section>

    <!-- 精选景点预览 -->
    <section class="py-20 bg-primary/5">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 style="font-family: 'SimSun', '宋体', 'STSong', 'NSimSun', serif; font-weight: bold; font-size: clamp(1.8rem,5vw,3rem); color: var(--color-primary); margin-bottom: 1.5rem;">推荐景点</h2>
          <div class="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- 景点卡片 -->
          <div class="relative group overflow-hidden rounded-lg shadow-lg h-80">
            <img src="/img/homePage/huangshan.jpg" alt="黄山" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 class="text-white text-xl font-hei">黄山</h3>
              <p class="text-white/80 text-sm">安徽省南部</p>
            </div>
          </div>

          <div class="relative group overflow-hidden rounded-lg shadow-lg h-80">
            <img src="/img/homePage/three_gorges.jpg" alt="长江三峡" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 class="text-white text-xl font-hei">长江三峡</h3>
              <p class="text-white/80 text-sm">湖北、重庆</p>
            </div>
          </div>

          <div class="relative group overflow-hidden rounded-lg shadow-lg h-80">
            <img src="/img/homePage/great_wall.jpg" alt="长城" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 class="text-white text-xl font-hei">长城</h3>
              <p class="text-white/80 text-sm">北京市</p>
            </div>
          </div>

          <div class="relative group overflow-hidden rounded-lg shadow-lg h-80">
            <img src="/img/homePage/guilin.jpg" alt="桂林山水" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
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
import NavBar from '@/component/NavBar.vue'

let chart = null
const router = useRouter()

// const pointStyle = { // 红点样式
//   symbolSize: 8,
//   itemStyle: { color: 'red' }
// };
// const lineStyle = { // 黄线样式
//   color: 'yellow',
//   width: 2,
//   type: 'solid'
// };

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

  echarts.registerMap('china', chinaGeo)

  // 加载本地路线JSON文件（假设文件存放在public/routes目录下）
  //const routeFiles = ['1.json', '2.json', '3.json','4.json'] // 替换为实际文件名
  const route1 = await fetch('/routes/1.json').then(res => res.json())
  const route2 = await fetch('/routes/2.json').then(res => res.json())
  const route3 = await fetch('/routes/3.json').then(res => res.json())
  const route4 = await fetch('/routes/4.json').then(res => res.json())
    // 线路1：红色（点+线）
    const seriesRoute1 = [
    // 线路1的点
    {
      type: 'scatter',
      coordinateSystem: 'geo',
      id: 'scatter_route1', // 唯一标识
      data: route1.coordinates.map((coord, i) => ({
        name: `线路1_点${i+1}`,
        value: coord,
        symbolSize: 8,
        itemStyle: { color: 'red' }
      })),
      zlevel: 5
    },
    // 线路1的线
    {
      type: 'lines',
      coordinateSystem: 'geo',
      id: 'lines_route1', // 唯一标识
      polyline: true,
      data: [{ coords: route1.coordinates }],
      lineStyle: { color: 'yellow', width: 2, type: 'solid' },
      effect: { show: true, constantSpeed: 10, trailLength: 0.3, color: 'red' },
      zlevel: 4
    }
  ]

  // 线路2：
  const seriesRoute2 = [
    {
      type: 'scatter',
      coordinateSystem: 'geo',
      id: 'scatter_route2',
      data: route2.coordinates.map((coord, i) => ({
        name: `线路2_点${i+1}`,
        value: coord,
        symbolSize: 8,
        itemStyle: { color: 'red' }
      })),
      zlevel: 5
    },
    {
      type: 'lines',
      coordinateSystem: 'geo',
      id: 'lines_route2',
      polyline: true,
      data: [{ coords: route2.coordinates }],
      lineStyle: { color: 'yellow', width: 2, type: 'solid' },
      effect: { show: true, constantSpeed: 10, trailLength: 0.3, color: 'green' },
      zlevel: 4
    }
  ]

  // 线路3：
  const seriesRoute3 = [
    {
      type: 'scatter',
      coordinateSystem: 'geo',
      id: 'scatter_route3',
      data: route3.coordinates.map((coord, i) => ({
        name: `线路3_点${i+1}`,
        value: coord,
        symbolSize: 8,
        itemStyle: { color: 'red' }
      })),
      zlevel: 5
    },
    {
      type: 'lines',
      coordinateSystem: 'geo',
      id: 'lines_route3',
      polyline: true,
      data: [{ coords: route3.coordinates }],
      lineStyle: { color: 'yellow', width: 2, type: 'solid' },
      effect: { show: true, constantSpeed: 10, trailLength: 0.3, color: 'blue' },
      zlevel: 4
    }
  ]

  // 线路4：
  const seriesRoute4 = [
    {
      type: 'scatter',
      coordinateSystem: 'geo',
      id: 'scatter_route4',
      data: route4.coordinates.map((coord, i) => ({
        name: `线路4_点${i+1}`,
        value: coord,
        symbolSize: 8,
        itemStyle: { color: 'red' }
      })),
      zlevel: 5
    },
    {
      type: 'lines',
      coordinateSystem: 'geo',
      id: 'lines_route4',
      polyline: true,
      data: [{ coords: route4.coordinates }],
      lineStyle: { color: 'yellow', width: 2, type: 'solid' },
      effect: { show: true, constantSpeed: 10, trailLength: 0.3, color: 'purple' },
      zlevel: 4
    }
  ]
//  const seriesList = [];
//   // 遍历4条路线，每条路线生成独立的点和线
// routeDataList.forEach((route, routeIndex) => {
//   const coords = route.coordinates;
//   // 获取当前线路的专属样式
//   point: pointStyle; 
//   line: lineStyle;

//   // 1. 当前线路的点（scatter系列）
//   if (coords.length > 0) {
//     seriesList.push({
//       type: 'scatter',
//       coordinateSystem: 'geo',
//       data: coords.map((coord, pointIndex) => ({
//         name: `路线${routeIndex+1}_点${pointIndex+1}`,
//         value: coord,
//         ...currentPointStyle  // 应用当前线路的点样式
//       })),
//       zlevel: 5,
//       id: `scatter_route_${routeIndex}`
//     });
//   }

//   // 2. 当前线路的线段（lines系列）
//   if (coords.length >= 2) {
//     seriesList.push({
//       type: 'lines',
//       coordinateSystem: 'geo',
//       polyline: true,
//       lineStyle: currentLineStyle,  // 应用当前线路的线样式
//       data: [{ coords: coords }],
//       zlevel: 4,
//       effect: {
//         show: true,
//         constantSpeed: 10,
//         trailLength: 0.3,
//         color: currentLineStyle.color  // 流动效果颜色与线条一致
//       },
//       id: `lines_route_${routeIndex}`
//     });
//   }
// });

// // 处理路线数据为ECharts格式
// const linesData = routeDataList.map(route => ({
//   coords: route.coordinates  // 直接使用整个坐标数组作为一条线的所有点
// }));
  // const linesData = [
  //   { coords: route1.coordinates },
  //   { coords: route2.coordinates },
  //   { coords: route3.coordinates },
  //   { coords: route4.coordinates }
  // ];
  // 地图配置（纯2D，与原有保持一致）
    const option = {
    backgroundColor: '#0e1a2b',
    // 2D地图坐标系
    geo: {
      map: 'china',
      roam: false, // 支持缩放平移
      label: {
        show: true,
        color: '#000'
      },
      itemStyle: {
        //color: '#0c5da5',//blue
        color: '#fff',
        borderColor: '#6cf',
        borderWidth: 0.5,
        opacity: 1,
      },
      emphasis: {
        label: { show: true, color: '#fff' },
        itemStyle: { color: '#ffcb60' },
      },
    },
    series: [
      // 2D路线图层
      {
        type: 'lines', // 2D线路组件
        coordinateSystem: 'geo', // 绑定2D坐标系
        effect: {
          show: true,
          constantSpeed: 10,
          trailLength: 0.3,
          color: 'white'
        },
        // lineStyle: lineStyle,
        // data: linesData
      },
      ...seriesRoute1,
      ...seriesRoute2,
      ...seriesRoute3,
      ...seriesRoute4
    ]
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

  // 点击跳转路线/省份详情页
  chart.on('click', params => {
    // 检查是否是线路相关的点击（点或线）
    const routeMatch = params.seriesId?.match(/route(\d+)/)
    
    if (routeMatch) {
      // 线路点击 - 提取线路编号并跳转
      const routeId = routeMatch[1]
      console.log('点击了线路：', routeId)
      router.push(`/RouteView?route=${routeId}`)
    } else if (params.name) {
      // 省份点击 - 原有逻辑
      console.log('点击了省份：', params.name)
      router.push(`/province/${params.name}`)
    }
  })

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
              color: '#549688',
              borderColor: '#F4EAC5',
              borderWidth: 1,
              opacity: 0.8,
            },
            emphasis: {
              label: { show: true, color: '#F4EAC5', fontSize: 16, fontWeight: 'bold' },
              itemStyle: { color: '#2F4F4F', borderWidth: 2 },
              regionHeight: 5,
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
</style>
