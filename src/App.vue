<template>
  <div class="app-container">
    <!-- 全局导航栏 - 固定在顶部，透明背景 -->
    <nav id="navbar" class="fixed top-0 left-0 right-0 z-[1000] bg-[#549688] opacity-80">
        <div class="flex items-center px-6 py-4">
          <!-- 左侧logo、标题和导航链接 -->
          <div class="flex items-center">
            <img src="@/assets/logo.png" alt="山河图志" class="h-10 mr-3" />
            <span class="font-song text-white text-xl font-bold mr-8">山河图志</span>
            
            <!-- 导航链接 -->
            <div class="nav-links flex items-center space-x-6 md:space-x-8">
              <router-link to="/" class="nav-item font-song text-white hover:text-primary transition-colors duration-300" exact-active-class="active">首页</router-link>
              <router-link to="/RouteView" class="nav-item font-song text-white hover:text-primary transition-colors duration-300" exact-active-class="active">山河漫游</router-link>
              <router-link to="/Challenge" class="nav-item font-song text-white hover:text-primary transition-colors duration-300" exact-active-class="active">过关闯将</router-link>
              <router-link to="#" class="nav-item font-song text-white hover:text-primary transition-colors duration-300">云锦书来</router-link>
            </div>
          </div>
        </div>
    </nav>
    
    <!-- 主内容区域，需要设置上边距避免被导航栏遮挡 -->
    <main class="pt-16">
      <router-view />
    </main>
  </div>
</template>

<script setup>
// 这里可以添加全局组件或功能
</script>

<style>
  /* Tailwind CSS已经通过CDN在index.html中引入 */
  /* 这里定义CSS变量和工具类 */
  :root {
    --color-primary: #549688;
    --color-secondary: #549688;
    --color-accent: #549688;
    --color-light: #F4EAC5;
    --color-dark: #2F4F4F;
  }

  /* 工具类 - 这些也在index.html的Tailwind配置中定义了 */
  .text-shadow {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  .text-shadow-lg {
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
  }
  
  .bg-blur {
    backdrop-filter: blur(8px);
  }
</style>

<style>
/* 基础样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 竖向文字样式 */
.writing-vertical {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  white-space: nowrap;
  color: white !important;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.5em;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Source Han Serif SC', '思源宋体', 'Noto Serif SC', serif;
  background-color: var(--color-light); /* light color from the design */
  color: var(--color-dark); /* dark color from the design */
  overflow-x: hidden;
}

/* 自定义字体类 */
.font-song {
  font-family: 'SimSun', serif;
}

.font-hei {
  font-family: 'PingFang SC', '思源黑体 CN', 'Noto Sans SC', 'Ma Shan Zheng', 'STKaiti', 'SimHei', sans-serif;
  font-weight: 500;
}

/* 颜色变量 */
.bg-primary {
  background-color: var(--color-primary);
}

.bg-secondary {
  background-color: var(--color-secondary);
}

.bg-accent {
  background-color: var(--color-accent);
}

.bg-light {
  background-color: var(--color-light);
}

.bg-dark {
  background-color: var(--color-dark);
}

.text-primary {
  color: var(--color-primary);
}

.text-secondary {
  color: var(--color-secondary);
}

/* 导航栏样式 */
.nav-item {
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  position: relative;
}

.nav-item.active {
  color: var(--color-primary) !important;
  font-weight: 600;
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background-color: var(--color-primary);
  border-radius: 2px;
}

/* 响应式导航栏 */
@media (max-width: 768px) {
  .nav-links {
    gap: 0.5rem !important;
    padding: 0.5rem !important;
  }
  
  .nav-item {
    font-size: 0.9rem;
    padding: 0.4rem 0.5rem;
  }
}

.text-accent {
  color: var(--color-accent);
}

.text-light {
  color: var(--color-light);
}

.text-dark {
  color: var(--color-dark);
}

/* 响应式容器 */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* 过渡动画 */
.transition-all {
  transition: all 0.3s ease;
}

.transition-colors {
  transition: color 0.3s ease;
}

/* 隐藏类 */
.hidden {
  display: none !important;
}

/* 确保地图容器正确显示 */
#map-section {
  width: 100%;
  height: 100%;
}
</style>
