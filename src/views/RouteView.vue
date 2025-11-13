<template>
  <div class="route-container">

    <!-- 页面标题 -->
    <header class="page-header">
      <!-- <div class="container">
        <div class="header-content">
          <img src="/img/shanhetuzhi.png" alt="山河漫游" 
          class="logo-image">
          
        </div>
        <p class="header-description">
          三条经典路线，带您领略中国大地的壮美与神奇
        </p>
      </div> -->
    </header>

    <!-- 路线导航 -->
    <section class="route-navigation">
      <div class="container">
        <div class="route-buttons" id="routeButtons">
          <button 
            class="route-btn" 
            :class="{ inactive: currentRegion === region, active: currentRegion !== region }" 
            @click="handleRegionChange(region)"
            v-for="region in regionOptions" 
            :key="region"
          >
            <!-- 根据区域显示不同图标和文字 -->
            <i :class="getRegionIcon(region)"></i>
            <span>{{ getRegionName(region) }}</span>
          </button>
        </div>
      </div>
    </section>
    
    <!-- 新增：地图和景点详情的容器，用于左右布局 -->
    <section class="main-content">
      <div class="container">
    <!-- 地图展示区 -->
    <section class="map-section">
      <div id="map-container" style="width: 100%; height: 600px;"></div>
    </section>
    
     <!-- 新增景点导航与详情区域 -->
     <section class="attractions-section">
      <div class="container">
        <div class="attractions-content">
          <!-- 左侧导航竖线 -->
          <div class="navigation-line">
            <div 
              class="nav-point" 
              :class="{ active: currentAttraction === attraction.id }"
              @click="currentAttraction = attraction.id"
              v-for="(attraction, index) in attractions" 
              :key="attraction.id"
              :style="{ top: `${(index / (attractions.length - 1)) * 100}%` }"
            >
              <span class="point-number">{{ index + 1 }}</span>
            </div>
          </div>
          
          <!-- 右侧景点详情 -->
          <div class="attraction-details">
            <transition name="fade">
              <div class="detail-item" v-if="currentAttractionData">
    <img 
      :src="currentAttractionData.imageUrl" 
      :alt="currentAttractionData.name" 
      class="attraction-image"
    >
    <div class="attraction-info">
      <h3 class="attraction-name">{{ currentAttractionData.name }}</h3>
      <p class="attraction-description">{{ currentAttractionData.description }}</p>
    </div>
  </div>
            </transition>
          </div>
        </div>
      </div>
    </section>    
  </div>
</section>
    </div>
</template>

<script setup>
import * as echarts from 'echarts'
import 'echarts-gl'
import { computed,onMounted, onBeforeUnmount, ref, nextTick} from 'vue'
//import { useRouter } from 'vue-router'

const regionOptions = ['东', '中', '西'] // 东/中/西区域
const currentRegion = ref('东') // 默认选中东部
let chart = null
// 根据区域返回图标class
const getRegionIcon = (region) => {
  const icons = {
    '东': 'fa fa-map-signs',
    '中': 'fa fa-mountain',
    '西': 'fa fa-globe'
  }
  return icons[region]
}
// 根据区域返回显示名称
const getRegionName = (region) => {
  const names = {
    '东': '北国边疆揽胜线',
    '中': '中原文脉寻踪线',
    '西': '南国山海漫游线'
  }
  return names[region]
}

// 封装线路配置生成函数（复用逻辑，避免重复代码）
function generateSeriesRoute(routeData, routeId) {
  return [
    // 线路的点
    {
      type: 'scatter',
      coordinateSystem: 'geo',
      //id: `scatter_route${routeId}`, // 唯一标识，避免冲突
      id: `scatter_route`,
      data: routeData.coordinates.map((coord, i) => ({
        name: `线路${routeId}_点${i+1}`,
        value: coord,
        symbolSize: 8,
        itemStyle: { color: '#d44545' }
      })),
      zlevel: 5
    },
    // 线路的线
    {
      type: 'lines',
      coordinateSystem: 'geo',
      //id: `lines_route${routeId}`, // 唯一标识
      id: `lines_route`, 
      polyline: true,
      data: [{ coords: routeData.coordinates }],
      lineStyle: { color: 'white', width: 2, type: 'solid' },
      effect: { show: true, constantSpeed: 10, trailLength: 0.3, color: 'red' },
      zlevel: 4
    }
  ]
}

const attractions = ref([])
const currentAttraction = ref(null)
const currentAttractionData = computed(() => {
  return attractions.value.find(item => item.id === currentAttraction.value)
})

// 新增：加载景点数据
const loadAttractionsData = async (region) => {
  try {
    // 根据不同区域加载不同的景点数据
    const res = await fetch(`/attractions/${region === '东' ? 'east' : region === '中' ? 'middle' : 'west'}.json`)
    if (!res.ok) throw new Error(`请求景点数据失败: ${res.status}`)
    const data = await res.json()
    attractions.value = data
    // 默认显示第一个景点
    if (data.length > 0) {
      currentAttraction.value = data[0].id
    }
  } catch (error) {
    console.error('加载景点数据失败:', error)
  }
}

onMounted(async () => {
  // 等待DOM元素完全渲染
  await nextTick();
  // 初始化地图容器
  const dom = document.getElementById('map-container');
  if (!dom) {
    console.error('未找到地图容器元素');
    return;
  }
  chart = echarts.init(dom);
  const geoRes = await fetch('/china.json');
  const chinaGeo = await geoRes.json();
  let routeId=1;
  echarts.registerMap('china', chinaGeo);
  // 定义线路数据
  const route = await fetch('/routes/1.json').then(res => res.json());
  // 生成当前区域的线路系列
  const seriesRoute = generateSeriesRoute(route, routeId);
// 4. 设置地图初始配置
const option = {
  backgroundColor: '#206864',
  geo: {
    map: 'china',
    roam: false, // 禁止缩放平移，如需开启可设为true
    label: {
      show: true,
      color: 'white'
    },
    itemStyle: {
      color: '#0e1a2b',
      borderColor: '#F4EAC5',
      borderWidth: 0.5,
      opacity: 1
    },
    emphasis: {
      label: { show: true, color: '#F4EAC5', fontSize: 16, fontWeight: 'bold' },
      itemStyle: { color: '#2F4F4F', borderWidth: 2 },
      regionHeight: 5
    }
  },
  series: [
    // // 基础线路图层（可留空或配置默认样式）
    // {
    //   type: 'lines',
    //   coordinateSystem: 'geo',
    //   effect: {
    //     show: true,
    //     constantSpeed: 10,
    //     trailLength: 0.3,
    //     color: '#549688'
    //   }
    // },
    ...seriesRoute // 追加当前区域的线路系列
  ]
  };
  if (chart && chart.setOption) {
    chart.setOption(option);
    window.addEventListener('resize', () => chart && chart.resize());
  } else {
    console.error('图表实例初始化失败');
  }

  await loadAttractionsData(currentRegion.value)
});

const handleRegionChange = async (region) => {
  // 先验证区域合法性（提前验证，避免无效请求）
  if (!regionOptions.includes(region)) {
    console.warn(`无效区域: ${region}`)
    return
  }

  try {
    // 根据区域获取对应线路数据（这里假设不同区域对应不同JSON，需根据实际调整）
    let routeUrl = ''
    switch (region) {
      case '东':
        routeUrl = '/routes/1.json' // 东部对应1.json
        break
      case '中':
        routeUrl = '/routes/2.json' // 中部对应2.json
        break
      case '西':
        routeUrl = '/routes/3.json' // 西部对应3.json
        break
      default:
        routeUrl = '/routes/1.json' // 默认值
    }

    // 请求新的线路数据
    const res = await fetch(routeUrl)
    if (!res.ok) throw new Error(`请求失败: ${res.status}`)
    const route = await res.json() // 更新全局route变量

    // 根据新的route数据重新生成线路配置（使用区域对应的ID，如"东"对应1，"中"对应2）
    const routeId = regionOptions.indexOf(region) + 1 // 假设ID与区域索引对应（1/2/3）
    const seriesRoute = generateSeriesRoute(route, routeId)

    // 更新当前区域并刷新图表
    currentRegion.value = region
    console.log(`切换到区域: ${region}`)

    // 确保图表实例存在，再更新配置
    if (chart && chart.setOption) {
      chart.setOption({
        series: [...seriesRoute]
      })
    } else {
      console.warn('图表实例不存在，无法更新配置')
    }

  } catch (error) {
    console.error(`区域${region}数据更新失败:`, error)
    // 可添加用户提示，例如：currentRegion.value = '数据加载失败'
  }
  await loadAttractionsData(region)
}
onBeforeUnmount(() => {
  if (chart) {
    chart.dispose()
    chart = null
  }
  window.removeEventListener('resize', () => chart?.resize())
})
</script>

<style scoped>
/* 新增：主内容区域样式，实现左右布局 */
.main-content {
  padding: 32px 0;
  background-color: #206864;
}

.main-content .container {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

/* 调整地图区域宽度 */
.map-section {
  padding: 0;
  flex: 1; /* 占1份宽度 */
  background-color: transparent;
}

/* 调整景点区域宽度 */
.attractions-section {
  padding: 0;
  flex: 1; /* 占1份宽度 */
  background-color: transparent;
}

/* 调整景点内容高度以匹配地图 */
.attractions-content {
  height: 600px;
}

/* 响应式设计：在小屏幕上恢复上下布局 */
@media (max-width: 1024px) {
  .main-content .container {
    flex-direction: column;
    padding: 0; /* 减小容器内边距，增加可用宽度 */
    gap: 16px; /* 减小上下布局时的间距 */
  }
  
  .attractions-content {
    height: auto;
    margin-top: 16px; /* 减小地图与景点区的距离 */
  }
  
  /* 窄屏时地图高度可适当降低，保持比例 */
  #map-container {
    height: 400px;
  }
  
  /* 确保景点区域也充分利用宽度 */
  .attractions-section {
    width: 100%;
    padding: 0;
  }
}
@media (max-width: 768px) {
  #map-container {
    height: 300px; /* 进一步降低高度，适应手机屏幕 */
  }
}
/* 颜色变量 */
:root {
  --primary: #2E8B57;
  --secondary: #5F9EA0;
  --accent: #8FBC8F;
  --light: #206864;
  --dark: #206864;
  --white: #FFFFFF;
  --black: #000000;
  --gray-700: #374151;
  --gray-600: #4B5563;
  --gray-400: #9CA3AF;
}

/* 容器样式 */
.route-container {
  font-family: 'SimHei', 'sans-serif';
  background-color: #206864;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

/* 页面标题样式 */
.page-header {
  padding-top: 20px;
  padding-bottom: 64px;
  text-align: center;
  background-color: #206864;
}

.header-content {
  margin-bottom: 24px;
}

.logo-image {
  max-width: 100%;
  height: auto;
  max-height: clamp(100px, 16vw, 200px);
  object-fit: contain;
  margin: 0 auto;
}

.header-description {
  font-size: clamp(16px, 2vw, 20px);
  color: rgba(255, 255, 255, 0.9);
  max-width: 800px;
  margin: 0 auto;
}

/* 路线导航样式 */
.route-navigation {
  padding: 48px 0;
  background-color: #206864;
}

.route-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

.route-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: all 300ms ease;
  transform: translateY(0);
  width: 100%;
  max-width: 300px;
  justify-content: center;
}

.route-btn.active {
  background: linear-gradient(to right, var(--primary), var(--accent));
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: white;
}

.route-btn.inactive {
  background: linear-gradient(to right, rgba(46, 139, 87, 0.8), rgba(143, 188, 143, 0.8));
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  color: white;
}

.route-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

/* 地图展示区样式 */
.map-section {
  padding: 64px 0;
  background-color: #206864;
  position: relative;
  overflow: hidden;
}

/* #map-container {
  margin: 0 auto;
  max-width: 1200px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
} */
#map-container {
  width: 105% !important; /* 适当增大宽度 */
  max-width: 105% !important;
  height: 600px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .route-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .route-btn {
    max-width: 100%;
  }
}
/* 新增景点区域样式 */
.attractions-section {
  padding: 64px 0;
  background-color: #8FBC8F;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.attractions-content {
  display: flex;
  gap: 40px;
  position: relative;
}

/* 导航竖线样式 */
.navigation-line {
  position: relative;
  width: 40px;
  height: 600px;
  margin: 0 20px;
}

.navigation-line::before {
  content: '';
  position: absolute;
  top: 0;
  left: 13px;
  width: 2px;
  height: 100%;
  background-color: #2E8B57;
}

.nav-point {
  position: absolute;
  left: 70%;
  transform: translateX(-30%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  border: 2px solid #2E8B57;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.nav-point.active {
  background-color: #2E8B57;
  transform: translateX(-50%) scale(1.2);
}

.point-number {
  color: #2E8B57;
  font-weight: bold;
  transition: all 0.3s ease;
}

.nav-point.active .point-number {
  color: white;
}

/* 景点详情样式 */
.detail-item {
  width: 100%;
  display: flex;
  flex-direction: column; /* 改为垂直排列 */
  gap: 20px; /* 调整上下间距 */
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.5s ease;
}

.attraction-image {
  width: 100%; /* 图片占满宽度 */
  height: 300px; /* 适当调整图片高度 */
  object-fit: cover;
}

.attraction-info {
  width: 100%; /* 文字区域占满宽度 */
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.attraction-name {
  font-size: 28px;
  color: #2E8B57;
  margin-bottom: 20px;
  font-weight: bold;
}

.attraction-description {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
}

/* 过渡动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .attractions-content {
    flex-direction: column;
  }
  
  .navigation-line {
    width: 100%;
    height: 40px;
    margin-right: 0;
    margin-bottom: 30px;
  }
  
  .navigation-line::before {
    top: 19px;
    left: 0;
    width: 100%;
    height: 2px;
  }
  
  .nav-point {
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
  
  .nav-point.active {
    transform: translateY(-50%) scale(1.2);
  }
  
  .detail-item {
    flex-direction: column;
  }
  
  /* .attraction-image, .attraction-info {
    width: 100%;
  } */
  .attraction-image {
    height: 200px; /* 小屏幕调整图片高度 */
  }
  .attraction-details {
    height: auto;
  }
}
</style>
<!-- <style scoped>
.region-switch {
  display: flex;
  gap: 12px;
  padding: 20px;
  justify-content: center;
}

.region-switch button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.region-switch button.active {
  background: #1890ff;
  color: white;
  border-color: #1890ff;
}

#map-container {
  margin: 0 auto;
  max-width: 1200px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
</style> -->