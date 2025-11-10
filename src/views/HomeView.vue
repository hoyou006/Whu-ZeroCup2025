<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <div  id="navbar">
        <div >
          <router-link class="item" to="/" >首页</router-link>
          <router-link class="item" to="/RouteView" >山河漫游</router-link>
          <router-link class="item" to="#" >过关闯将</router-link>
          <router-link class="item" to="#">云锦书来</router-link>
        </div>
    </div>

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
      <!-- 探索按钮 -->
      <div class="absolute bottom-8 left-0 right-0 z-20 flex justify-center opacity-0 transform translate-y-10 transition-all duration-1000 delay-1000" id="exploreBtn">
        <router-link to="/" class="px-6 py-2 bg-primary hover:bg-primary/80 text-white rounded-full transition-all duration-300 transform hover:scale-105 font-hei text-sm">
          开始探索 <i class="fa fa-arrow-right ml-1"></i>
        </router-link>
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

// const pointStyle = { // 红点样式
//   symbolSize: 8,
//   itemStyle: { color: 'red' }
// };
// const lineStyle = { // 黄线样式
//   color: 'yellow',
//   width: 2,
//   type: 'solid'
// };

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

  chart.setOption(option)

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

const handleScroll = () => {
  const navbar = document.getElementById('navbar')
  if (window.scrollY > 50) {
    navbar.classList.add('bg-dark/80', 'bg-blur')
    navbar.classList.remove('bg-transparent')
  } else {
    navbar.classList.remove('bg-dark/80', 'bg-blur')
    navbar.classList.add('bg-transparent')
  }
}

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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  transition-all: 0.3s ease;
  height: 60px;
  background-color: #fff;
 align-items: center;
  display: flex;
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
