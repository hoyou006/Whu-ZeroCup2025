<template>
  <div class="app-container">
    <div id="map-section" style="width:100%;height:100vh;"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import 'echarts-gl'
import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

let chart = null
const router = useRouter()

onMounted(async () => {
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
          zoomSensitivity: 0,
          panSensitivity: 0,
          rotateSensitivity: 0,
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
})

onBeforeUnmount(() => {
  if (chart) {
    chart.dispose()
    chart = null
  }
})
</script>

<style scoped>
.app-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body {
  height: 100%;
  overflow-x: hidden;
}
#app {
  min-height: 100vh;
}
</style>
