<template>
  <router-view />
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
