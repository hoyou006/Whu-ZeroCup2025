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

export default {
  name: 'App',
  data() {
    return {
      map: null,
      defaultStyle: {
        color: '#3388ff',
        weight: 1,
        opacity: 1,
        fillColor: '#87CEEB',
        fillOpacity: 0.6
      },
      hoverStyle: {
        color: '#ff7700',     // 悬浮边界颜色
        weight: 3,            // 边界加粗
        fillColor: '#ffa64d', // 悬浮填充颜色更亮
        fillOpacity: 0.9,     // 更“浮起”
        zIndex: 9999
      }
    };
  },
  methods: {
    scrollToNextSection() {
      const contentSection = document.querySelector('.content-section');
      contentSection?.scrollIntoView({ behavior: 'smooth' });
    },

    initMap() {
      this.map = L.map('map-section', {
        zoomControl: false,
        inertia: true,
        zoomAnimation: true,
        fadeAnimation: true
      });

      // 微透明底图(防止拖动时出现空白)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        opacity: 0.03,
        attribution: ''
      }).addTo(this.map);

      fetch('/china.geojson')
        .then(res => res.json())
        .then(data => {
          const layer = L.geoJSON(data, {
  renderer: L.svg(), // ✅改成 SVG 渲染
  style: this.defaultStyle,
  onEachFeature: (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        const l = e.target;
        l.setStyle(this.hoverStyle);
        l.bringToFront(); // ✅SVG 才有效
        l._path.style.filter = 'drop-shadow(0 0 6px rgba(255,136,0,0.9))'; // ✅发光悬浮效果
      },
      mouseout: (e) => {
        const l = e.target;
        l.setStyle(this.defaultStyle);
        l._path.style.filter = 'none';
      }
    });
  }
}).addTo(this.map);


          // ✅ 初始视图更大
          const bounds = layer.getBounds();
          this.map.fitBounds(bounds.pad(-0.2));
        })
        .catch(err => console.error('GeoJSON 加载失败:', err));
    }
  },

  mounted() {
    this.initMap();
  }
};
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