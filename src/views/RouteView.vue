<template>
  <div class="route-container">
    <!-- 导航栏 -->
    <NavBar></NavBar>



    <!-- 页面标题 -->
    <header class="page-header">
      <div class="container">
        <div class="header-content">
          <img src="/img/shanhetuzhi.png" alt="山河漫游" class="logo-image">
        </div>
        <p class="header-description">
          三条经典路线，带您领略中国大地的壮美与神奇
        </p>
      </div>
    </header>

    <!-- 路线导航 -->
    <section class="route-navigation">
      <div class="container">
        <div class="route-buttons" id="routeButtons">
          <button class="route-btn active" data-route="route1">
            <i class="fa fa-map-signs"></i>
            <span>东部海岸线之旅</span>
          </button>
          <button class="route-btn" data-route="route2">
            <i class="fa fa-mountain"></i>
            <span>中部山水风光之旅</span>
          </button>
          <button class="route-btn" data-route="route3">
            <i class="fa fa-globe"></i>
            <span>西部壮美景观之旅</span>
          </button>
        </div>
      </div>
    </section>

    <!-- 地图展示区 -->
    <section class="map-section">
      <div class="container">
        <!-- 路线内容容器 -->
        <div class="route-content active" id="route1Content">
          <div class="route-content-wrapper">
            <!-- 地图区域 -->
            <div class="map-container">
              <div class="map-box">
                <svg viewBox="0 0 800 600" class="map-svg">
                  <!-- 简化的中国地图轮廓 -->
                  <path
                    d="M300,100 C350,80 400,90 450,80 C500,70 550,90 600,80 C650,70 700,90 750,100 C730,150 720,200 710,250 C700,300 690,350 680,400 C670,450 660,500 650,550 C600,530 550,520 500,510 C450,500 400,510 350,520 C300,530 250,540 200,550 C210,500 220,450 230,400 C240,350 250,300 260,250 C270,200 280,150 290,100 Z"
                    fill="#f5f5f5" stroke="#2E8B57" stroke-width="2" />

                  <!-- 东部路线 -->
                  <path
                    d="M250,450 L300,420 L350,400 L400,380 L450,360 L500,350 L550,340 L600,330 L650,340 L700,360"
                    fill="none" stroke="#2E8B57" stroke-width="4" class="route-line" />

                  <!-- 路线节点 -->
                  <circle cx="250" cy="450" r="8" fill="#2E8B57" class="scale-up" data-city="青岛" />
                  <circle cx="350" cy="400" r="8" fill="#2E8B57" class="scale-up" data-city="上海" />
                  <circle cx="450" cy="360" r="8" fill="#2E8B57" class="scale-up" data-city="杭州" />
                  <circle cx="550" cy="340" r="8" fill="#2E8B57" class="scale-up" data-city="厦门" />
                  <circle cx="650" cy="340" r="8" fill="#2E8B57" class="scale-up" data-city="广州" />
                  <circle cx="700" cy="360" r="8" fill="#2E8B57" class="scale-up" data-city="深圳" />
                </svg>
              </div>
            </div>

            <!-- 路线详情 -->
            <div class="detail-container">
              <div class="detail-box">
                <h2 class="route-title">
                  <i class="fa fa-map-signs"></i> 东部海岸线之旅
                </h2>
                <div class="title-divider"></div>

                <p class="route-description">
                  这条路线沿着中国东部海岸线，串联起多个重要的沿海城市和旅游胜地。从北到南，您将领略到不同的海洋风光、城市魅力和人文景观。
                </p>

                <div class="city-list">
                  <div class="city-item">
                    <h4 class="city-name">青岛</h4>
                    <p class="city-desc">海滨城市，啤酒之都，红瓦绿树，碧海蓝天</p>
                  </div>
                  <div class="city-item">
                    <h4 class="city-name">上海</h4>
                    <p class="city-desc">国际大都市，外滩风光，东方明珠塔</p>
                  </div>
                  <div class="city-item">
                    <h4 class="city-name">杭州</h4>
                    <p class="city-desc">人间天堂，西湖美景，江南水乡</p>
                  </div>
                  <div class="city-item">
                    <h4 class="city-name">厦门</h4>
                    <p class="city-desc">海上花园城市，鼓浪屿，闽南风情</p>
                  </div>
                  <div class="city-item">
                    <h4 class="city-name">广州</h4>
                    <p class="city-desc">千年商都，珠江夜景，岭南文化</p>
                  </div>
                  <div class="city-item">
                    <h4 class="city-name">深圳</h4>
                    <p class="city-desc">创新之城，现代都市风光</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="route-content" id="route2Content">
          <div class="route-content-wrapper">
            <!-- 地图区域 -->
            <div class="map-container">
              <div class="map-box">
                <svg viewBox="0 0 800 600" class="map-svg">
                  <!-- 简化的中国地图轮廓 -->
                  <path
                    d="M300,100 C350,80 400,90 450,80 C500,70 550,90 600,80 C650,70 700,90 750,100 C730,150 720,200 710,250 C700,300 690,350 680,400 C670,450 660,500 650,550 C600,530 550,520 500,510 C450,500 400,510 350,520 C300,530 250,540 200,550 C210,500 220,450 230,400 C240,350 250,300 260,250 C270,200 280,150 290,100 Z"
                    fill="#f5f5f5" stroke="#2E8B57" stroke-width="2" />

                  <!-- 中部路线 -->
                  <path d="M300,250 L350,280 L400,260 L450,250 L500,270 L550,260 L600,280" fill="none"
                    stroke="#5F9EA0" stroke-width="4" class="route-line" />

                  <!-- 路线节点 -->
                  <circle cx="300" cy="250" r="8" fill="#5F9EA0" class="scale-up" data-city="西安" />
                  <circle cx="350" cy="280" r="8" fill="#5F9EA0" class="scale-up" data-city="郑州" />
                  <circle cx="400" cy="260" r="8" fill="#5F9EA0" class="scale-up" data-city="武汉" />
                  <circle cx="450" cy="250" r="8" fill="#5F9EA0" class="scale-up" data-city="长沙" />
                  <circle cx="500" cy="270" r="8" fill="#5F9EA0" class="scale-up" data-city="成都" />
                  <circle cx="550" cy="260" r="8" fill="#5F9EA0" class="scale-up" data-city="重庆" />
                  <circle cx="600" cy="280" r="8" fill="#5F9EA0" class="scale-up" data-city="贵阳" />
                </svg>
              </div>
            </div>

            <!-- 路线详情 -->
            <div class="detail-container">
              <div class="detail-box">
                <h2 class="route-title secondary">
                  <i class="fa fa-mountain"></i> 中部山水风光之旅
                </h2>
                <div class="title-divider secondary"></div>

                <p class="route-description">
                  这条路线贯穿中国中部地区，汇集了名山大川和历史文化名城。您将欣赏到壮丽的山水风光，感受深厚的历史文化底蕴。
                </p>

                <div class="city-list secondary">
                  <div class="city-item">
                    <h4 class="city-name">西安</h4>
                    <p class="city-desc">十三朝古都，兵马俑，丝绸之路起点</p>
                  </div>
                  <div class="city-item">
                    <h4 class="city-name">郑州</h4>
                    <p class="city-desc">华夏文明发源地，嵩山少林寺</p>
                  </div>
                  <div class="city-item">
                    <h4 class="city-name">武汉</h4>
                    <p class="city-desc">江城，黄鹤楼，长江大桥</p>
                  </div>
                  <div class="city-item">
                    <h4 class="city-name">长沙</h4>
                    <p class="city-desc">岳麓山，橘子洲头，湖湘文化</p>
                  </div>
                  <div class="city-item">
                    <h4 class="city-name">成都</h4>
                    <p class="city-desc">天府之国，大熊猫基地，川菜文化</p>
                  </div>
                  <div class="city-item">
                    <h4 class="city-name">重庆</h4>
                    <p class="city-desc">山城，火锅之都，长江三峡起点</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="route-content" id="route3Content">
          <div class="route-content-wrapper">
            <!-- 地图区域 -->
            <div class="map-container">
              <div class="map-box">
                <svg viewBox="0 0 800 600" class="map-svg">
                  <!-- 简化的中国地图轮廓 -->
                  <path
                    d="M300,100 C350,80 400,90 450,80 C500,70 550,90 600,80 C650,70 700,90 750,100 C730,150 720,200 710,250 C700,300 690,350 680,400 C670,450 660,500 650,550 C600,530 550,520 500,510 C450,500 400,510 350,520 C300,530 250,540 200,550 C210,500 220,450 230,400 C240,350 250,300 260,250 C270,200 280,150 290,100 Z"
                    fill="#f5f5f5" stroke="#2E8B57" stroke-width="2" />

                  <!-- 西部路线 -->
                  <path d="M250,150 L300,180 L350,150 L400,180 L450,150 L500,170" fill="none"
                    stroke="#8FBC8F" stroke-width="4" class="route-line" />

                  <!-- 路线节点 -->
                  <circle cx="250" cy="150" r="8" fill="#8FBC8F" class="scale-up" data-city="拉萨" />
                  <circle cx="300" cy="180" r="8" fill="#8FBC8F" class="scale-up" data-city="西宁" />
                  <circle cx="350" cy="150" r="8" fill="#8FBC8F" class="scale-up" data-city="乌鲁木齐" />
                  <circle cx="400" cy="180" r="8" fill="#8FBC8F" class="scale-up" data-city="兰州" />
                  <circle cx="450" cy="150" r="8" fill="#8FBC8F" class="scale-up" data-city="银川" />
                  <circle cx="500" cy="170" r="8" fill="#8FBC8F" class="scale-up" data-city="呼和浩特" />
                </svg>
              </div>
            </div>

            <!-- 路线详情 -->
            <div class="detail-container">
              <div class="detail-box">
                <h2 class="route-title accent">
                  <i class="fa fa-globe"></i> 西部壮美景观之旅
                </h2>
                <div class="title-divider accent"></div>

                <p class="route-description">
                  这条路线带您探索中国西部的壮美景观和多元文化。从雪域高原到沙漠绿洲，从草原牧场到民族风情，体验大自然的神奇与人文的魅力。
                </p>

                <div class="city-list accent">
                  <div class="city-item">
                    <h4 class="city-name">拉萨</h4>
                    <p class="city-desc">日光城，布达拉宫，藏族文化</p>
                  </div>
                  <div class="city-item">
                    <h4 class="city-name">西宁</h4>
                    <p class="city-desc">青藏高原门户，塔尔寺，青海湖</p>
                  </div>
                  <div class="city-item">
                    <h4 class="city-name">乌鲁木齐</h4>
                    <p class="city-desc">西域风情，天山天池，葡萄沟</p>
                  </div>
                  <div class="city-item">
                    <h4 class="city-name">兰州</h4>
                    <p class="city-desc">黄河之都，拉面文化，丝路重镇</p>
                  </div>
                  <div class="city-item">
                    <h4 class="city-name">银川</h4>
                    <p class="city-desc">塞上江南，西夏王陵，回族文化</p>
                  </div>
                  <div class="city-item">
                    <h4 class="city-name">呼和浩特</h4>
                    <p class="city-desc">草原明珠，蒙古族风情，昭君墓</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import NavBar from '@/component/NavBar.vue'
// import { useRouter } from 'vue-router'

// const router = useRouter()

onMounted(() => {
  // 移动端菜单切换
  const menuBtn = document.getElementById('menuBtn')
  const mobileMenu = document.getElementById('mobileMenu')
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('show')
    })
  }

  // 路线切换功能
  const routeButtons = document.querySelectorAll('.route-btn')
  const routeContents = document.querySelectorAll('.route-content')
  
  routeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const route = button.getAttribute('data-route')
      
      // 更新按钮状态
      routeButtons.forEach(btn => {
        btn.classList.remove('active')
        btn.classList.add('inactive')
      })
      button.classList.add('active')
      button.classList.remove('inactive')
      
      // 更新内容显示
      routeContents.forEach(content => {
        content.classList.remove('active')
      })
      const activeContent = document.getElementById(`${route}Content`)
      if (activeContent) {
        activeContent.classList.add('active')
      }
    })
  })

  // 节点悬停效果
  const cityNodes = document.querySelectorAll('.scale-up[data-city]')
  cityNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      node.setAttribute('r', '10')
    })
    node.addEventListener('mouseleave', () => {
      node.setAttribute('r', '8')
    })
  })
})

onBeforeUnmount(() => {
  // 清理事件监听
  const menuBtn = document.getElementById('menuBtn')
  const mobileMenu = document.getElementById('mobileMenu')
  
  if (menuBtn && mobileMenu) {
    menuBtn.removeEventListener('click', () => {
      mobileMenu.classList.toggle('show')
    })
  }
})
</script>

<style scoped>
/* 颜色变量 */
:root {
  --primary: #2E8B57;
  --secondary: #5F9EA0;
  --accent: #8FBC8F;
  --light: #F5F5DC;
  --dark: #2F4F4F;
  --white: #FFFFFF;
  --black: #000000;
  --gray-700: #374151;
  --gray-600: #4B5563;
  --gray-400: #9CA3AF;
}

/* 字体设置 */
.route-container {
  font-family: 'SimHei', 'sans-serif';
  background-color: var(--light);
  overflow-x: hidden;
}

/* 容器样式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

/* 导航栏样式 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  background-color: rgba(47, 79, 79, 0.8);
  backdrop-filter: blur(8px);
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-link {
  color: var(--white);
  text-decoration: none;
  transition: color 300ms ease;
}

.nav-link:hover {
  color: var(--accent);
}

.nav-link.active {
  color: var(--accent);
  font-weight: 500;
}

.menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--white);
  font-size: 24px;
  cursor: pointer;
}

.mobile-menu {
  display: none;
  background-color: rgba(47, 79, 79, 0.9);
  backdrop-filter: blur(8px);
}

.mobile-menu.show {
  display: block;
}

.mobile-menu-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

.mobile-nav-link {
  color: var(--white);
  text-decoration: none;
  padding: 8px 0;
  transition: color 300ms ease;
}

.mobile-nav-link:hover {
  color: var(--accent);
}

.mobile-nav-link.active {
  color: var(--accent);
  font-weight: 500;
}

/* 页面标题样式 */
.page-header {
  padding-top: 128px;
  padding-bottom: 64px;
  text-align: center;
  background: linear-gradient(to bottom, var(--dark), var(--primary));
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
  background-color: var(--white);
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
  color: var(--white);
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
}

.route-btn.inactive {
  background: linear-gradient(to right, rgba(46, 139, 87, 0.8), rgba(143, 188, 143, 0.8));
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.route-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

/* 地图展示区样式 */
.map-section {
  padding: 64px 0;
  background-color: var(--light);
  position: relative;
  overflow: hidden;
}

.route-content {
  display: none;
}

.route-content.active {
  display: block;
}

.route-content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.map-container {
  width: 100%;
}

.map-box {
  background-color: var(--white);
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.map-svg {
  width: 100%;
  height: auto;
}

.detail-container {
  width: 100%;
}

.detail-box {
  background-color: var(--white);
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.route-title {
  font-size: 28px;
  font-weight: bold;
  color: var(--dark);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
}

.route-title i {
  margin-right: 12px;
  color: var(--primary);
}

.route-title.secondary i {
  color: var(--secondary);
}

.route-title.accent i {
  color: var(--accent);
}

.title-divider {
  width: 80px;
  height: 4px;
  background-color: var(--primary);
  margin-bottom: 24px;
}

.title-divider.secondary {
  background-color: var(--secondary);
}

.title-divider.accent {
  background-color: var(--accent);
}

.route-description {
  font-size: 16px;
  line-height: 1.6;
  color: var(--gray-700);
  margin-bottom: 32px;
}

.city-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.city-item {
  border-left: 4px solid var(--primary);
  padding-left: 16px;
  padding-top: 4px;
  padding-bottom: 4px;
}

.city-list.secondary .city-item {
  border-left-color: var(--secondary);
}

.city-list.accent .city-item {
  border-left-color: var(--accent);
}

.city-name {
  font-weight: bold;
  color: var(--dark);
  margin-bottom: 4px;
}

.city-desc {
  font-size: 14px;
  color: var(--gray-600);
}

/* 动画效果 */
@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}

.route-line {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: dash 3s linear forwards;
}

.scale-up {
  transition: transform 300ms ease;
}

.scale-up:hover {
  transform: scale(1.05);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  .menu-btn {
    display: block;
  }
  
  .route-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .route-btn {
    max-width: 100%;
  }
}

@media (min-width: 1024px) {
  .route-content-wrapper {
    flex-direction: row;
  }
  
  .map-container,
  .detail-container {
    width: 50%;
  }
}
</style>