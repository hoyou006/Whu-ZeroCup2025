<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <div  id="navbar">
        <div >
          <router-link class="item" to="/" >首页</router-link>
          <router-link class="item" to="/RouteView" >山河漫游</router-link>
          <router-link class="item" to="/Challenge" >过关闯将</router-link>
          <router-link class="item" to="#">云锦书来</router-link>
        </div>
    </div>

    <!-- 视频背景 -->
    <section class="relative h-screen w-full overflow-hidden">
      <!-- 视频背景 -->
      <div class="absolute inset-0 bg-black/50 z-10"></div>
      <video class="absolute inset-0 z-0 w-full h-full object-cover" autoplay muted loop playsinline>
        <source src="https://assets.mixkit.co/videos/preview/mixkit-beautiful-shot-of-mountains-covered-in-trees-at-sunset-124779-large.mp4" type="video/mp4">
        <!-- 备用视频源 -->
        <source src="https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4" type="video/mp4">
      </video>

      <!-- 文字介绍 - 居中显示 -->
      <div class="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
        <div class="mb-10 opacity-0 transform translate-y-10 transition-all duration-1000" id="mainTitle">
          <img src="/img/shanhetuzhi.png" alt="山河图志" class="max-w-full h-auto max-h-[clamp(4rem,15vw,8rem)] object-contain mb-4">
          <h2 class="text-white text-[clamp(1.2rem,4vw,2rem)] font-hei text-shadow-lg">探索中国的自然与人文之美</h2>
        </div>
        
        <!-- 简短描述 -->
        <p class="text-white/90 max-w-2xl mb-12 text-[clamp(1rem,2vw,1.2rem)] text-shadow">
          从壮丽的山脉到秀美的水乡，从古老的文明到现代的奇迹，一起领略华夏大地的无穷魅力
        </p>
        
        <!-- 探索按钮 -->
        <div class="flex flex-wrap gap-4 justify-center opacity-0 transform translate-y-10 transition-all duration-1000 delay-500" id="exploreBtn">
          <router-link to="/RouteView" class="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-full transition-all duration-300 transform hover:scale-105 font-hei text-base">
            山河漫游 <i class="fa fa-compass ml-2"></i>
          </router-link>
          <router-link to="/Challenge" class="px-8 py-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full border border-white/30 transition-all duration-300 transform hover:scale-105 font-hei text-base">
            过关闯将 <i class="fa fa-flag-checkered ml-2"></i>
          </router-link>
        </div>
      </div>
      
      <!-- 向下滚动指示器 -->
      <div class="absolute bottom-8 left-0 right-0 z-20 flex justify-center animate-bounce">
        <div class="text-white/80 cursor-pointer hover:text-white transition-colors" @click="scrollToNextSection">
          <i class="fa fa-angle-down text-2xl"></i>
        </div>
      </div>
    </section>

    <!-- 中国地图区域 -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div id="map-section" style="width:100%;height:70vh;"></div>
      </div>
    </section>

    <!-- 精选景点预览 -->
    <section class="py-20 bg-gray-50">
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
import { onMounted, onBeforeUnmount} from 'vue'
import { useRouter } from 'vue-router'

let chart = null
const router = useRouter()


onMounted(async () => {
  // 初始化地图
  const dom = document.getElementById('map-section')
  chart = echarts.init(dom)

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

  // 导航栏滚动效果
  window.addEventListener('scroll', handleScroll)
  
  // 页面加载动画
  setTimeout(() => {
    document.getElementById('mainTitle').classList.remove('opacity-0', 'translate-y-10')
  }, 300)

  setTimeout(() => {
    document.getElementById('exploreBtn').classList.remove('opacity-0', 'translate-y-10')
  }, 800)

  window.addEventListener('resize', () => chart && chart.resize())
})

// 导航栏滚动效果
const handleScroll = () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('bg-black/90', 'shadow-lg');
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.remove('bg-black/90', 'shadow-lg');
      navbar.classList.add('bg-transparent');
    }
  }
};

// 滚动到下一部分
const scrollToNextSection = () => {
  const mapSection = document.getElementById('chinaMap');
  if (mapSection) {
    mapSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// 页面加载完成后显示元素
const showElements = () => {
  const mainTitle = document.getElementById('mainTitle');
  const exploreBtn = document.getElementById('exploreBtn');
  
  if (mainTitle) {
    mainTitle.classList.remove('opacity-0', 'translate-y-10');
  }
  
  if (exploreBtn) {
    exploreBtn.classList.remove('opacity-0', 'translate-y-10');
  }
};

onBeforeUnmount(() => {
  if (chart) {
    chart.dispose()
    chart = null
  }
  window.removeEventListener('scroll', handleScroll)
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
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: transparent;
  height: 70px;
  align-items: center;
  display: flex;
}

#navbar .nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

#navbar .nav-links a {
  color: white;
  font-size: 1.1rem;
  font-weight: 400;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0;
}

#navbar .nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: white;
  transition: width 0.3s ease;
}

#navbar .nav-links a:hover {
  color: #ffffff;
  opacity: 0.9;
}

#navbar .nav-links a:hover::after {
  width: 100%;
}

#navbar .nav-links a.active {
  font-weight: 600;
}

#navbar .nav-links a.active::after {
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

#navbar div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.item {
  margin: 0 20px;
}
.foot_box {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0fd11c;
  height: 60px;
  flex-direction: column;
}
.theme {
  margin: 0 20px;
}
.copyright {
  margin: 0 20px;
}
</style>