<template>
  <div class="app-container">
    <div class="hero-section">
      <img src="https://picsum.photos/id/1015/1920/1080" class="hero-image">
      <div class="hero-content">
        <h1>Welcome</h1>
      </div>
      <button class="scroll-button" @click="scrollToNextSection">
        <span>翻页</span>
      </button>
    </div>
    <div class="content-section">
      <div id="map-section"></div>
    </div>
  </div>
</template>

<script>
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
//引入leaflet
export default {
  name: 'App',
  data() {
    return {
      map: null
    };
  },
  methods: {
    //翻页函数
    scrollToNextSection() {
      const contentSection = document.querySelector('.content-section');
      if (contentSection) {
        contentSection.scrollIntoView({ behavior: 'smooth' });
      }
    },
    initMap() {
      //默认没加底图
      this.map = L.map('map-section',{zoomControl:false}).setView([114.000,30.000], 4);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  opacity: 0.05, // 5% 透明度，几乎看不到
  attribution: ''
}).addTo(this.map);

      //使用fetch方法加载文件,若使用import加载需要更改config.js
      fetch('/china.geojson') 
        .then(res => res.json())
        .then(data => {
          const mapLayer = L.geoJSON(data, {
            renderer: L.canvas(),
            style: {
              color: '#3388ff',
              weight: 1,
              opacity: 1,
              fillColor: '#87CEEB',
              fillOpacity: 0.6
            }
          }).addTo(this.map);
          this.map.fitBounds(mapLayer.getBounds());
          mapLayer.on('click', (e) => {
  const layer = e.layer;
  this.map.flyToBounds(layer.getBounds(), {
    padding: [50, 50],
    duration: 1.5
  });
});

        })
        .catch(err => {
          console.error('GeoJSON 加载失败:', err);
        });
    }
  },
  mounted() {
    this.initMap();
  }
}
</script>

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
.app-container {
  min-height: 100vh;
}
/* 全屏背景图片样式 */
.hero-section {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}
/* 可选的图片上文字样式 */
.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}
.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}
/* 翻页按钮样式 */
.scroll-button {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  background: rgba(255, 255, 255, 0.2);
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-size: 0.9rem;
  text-align: center;
  padding-top: 8px;
}
.scroll-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateX(-50%) translateY(-5px);
}
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}
/* 内容区域样式 */
.content-section {
  padding: 4rem 2rem;
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
#map-section{
  height: 90vh;
  width: 150vh;
  background-color: #fff;
}
.leaflet-control-attribution {
  display: none !important;
}

</style>