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
    --color-primary: #2E8B57;
    --color-secondary: #5F9EA0;
    --color-accent: #8FBC8F;
    --color-light: #F5F5DC;
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
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #F5F5DC; /* light color from the design */
  color: #2F4F4F; /* dark color from the design */
  overflow-x: hidden;
}

/* 自定义字体类 */
.font-song {
  font-family: 'SimSun', serif;
}

.font-hei {
  font-family: 'SimHei', 'Ma Shan Zheng', sans-serif;
}

/* 颜色变量 */
.bg-primary {
  background-color: #206864;
}

.bg-secondary {
  background-color: #5F9EA0;
}

.bg-accent {
  background-color: #8FBC8F;
}

.bg-light {
  background-color: #F5F5DC;
}

.bg-dark {
  background-color: #2F4F4F;
}

.text-primary {
  color: #2E8B57;
}

.text-secondary {
  color: #5F9EA0;
}

.text-accent {
  color: #8FBC8F;
}

.text-light {
  color: #206864;
}

.text-dark {
  color: #2F4F4F;
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
