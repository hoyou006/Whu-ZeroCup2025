<script>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import {Autoplay,Pagination,EffectFade} from 'swiper/modules';
  import 'swiper/css';
  import 'swiper/css/autoplay';
  import 'swiper/css/pagination';
  import 'swiper/css/effect-fade';

  // 导入省份数据JSON文件
  import provinceData from '../data/provinces.json';
  
  // 异步加载省份详情JSON文件（从public目录）
  
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    data(){      
      return { 
        img_source: [],
        modules :[Autoplay,Pagination,EffectFade],
        provinceDetails: null, // 存储省份详情数据
        currentProvince: '北京' // 当前显示的省份名称
      }
    },
    created() {
      // 从路由参数中获取省份名称
      const provinceName = this.$route.params.name || '北京';
      this.currentProvince = provinceName;
      this.img_source = provinceData[provinceName] || provinceData['北京'] || [];
      
      // 加载省份详情数据
      this.loadProvinceDetails(provinceName);
    },
    watch: {
      // 监听路由参数变化，重新加载省份数据
      '$route.params.name': {
        handler(newName) {
          if (newName && newName !== this.currentProvince) {
            this.currentProvince = newName;
            this.img_source = provinceData[newName] || provinceData['北京'] || [];
            this.loadProvinceDetails(newName);
            // 重新滚动到顶部
            this.forceScrollToTop();
          }
        },
        immediate: false
      }
    },
    mounted() {
      // 使用更强大的滚动到顶部策略
      this.forceScrollToTop();
    },
    methods: {
      // 强制滚动到顶部的方法
      forceScrollToTop() {
        // 立即执行一次滚动
        this.performScrollToTop();
        
        // 使用nextTick确保DOM完全渲染后再次滚动
        this.$nextTick(() => {
          this.performScrollToTop();
          
          // 使用不同时间间隔的定时器进行多次尝试，确保可靠
          const timeouts = [100, 300, 500, 1000];
          timeouts.forEach(delay => {
            setTimeout(() => {
              this.performScrollToTop();
            }, delay);
          });
        });
      },
      
      // 执行滚动到顶部的具体操作
      performScrollToTop() {
        // 解除所有可能的滚动限制
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        document.body.style.position = '';
        document.documentElement.style.position = '';
        
        // 对所有可能的滚动容器进行滚动
        // 1. window全局滚动
        window.scrollTo({ top: 0, behavior: 'auto' });
        // 2. 文档根元素滚动
        document.documentElement.scrollTop = 0;
        document.documentElement.scrollLeft = 0;
        // 3. body元素滚动
        document.body.scrollTop = 0;
        document.body.scrollLeft = 0;
        
        // 4. 检查并滚动主内容区域
        const mainContent = document.querySelector('main');
        if (mainContent) {
          mainContent.scrollTop = 0;
          mainContent.scrollLeft = 0;
        }
        
        // 5. 检查并滚动路由视图容器
        const routerView = document.querySelector('.router-view, [data-v-app]');
        if (routerView) {
          routerView.scrollTop = 0;
          routerView.scrollLeft = 0;
        }
      },
      
      // 加载省份详情数据
      async loadProvinceDetails(provinceName) {
        try {
          // 从public目录加载JSON文件
          const response = await fetch('/province_details.json');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const allDetails = await response.json();
          // 获取指定省份的详情，如果不存在则使用北京的详情
          this.provinceDetails = allDetails[provinceName] || allDetails['北京'] || {
            intro: {
              title: '介绍',
              content: ['暂无数据', '请稍后再试']
            },
            history: {
              title: '历史文化',
              content: ['暂无数据', '请稍后再试']
            },
            development: {
              title: '现代发展',
              content: ['暂无数据', '请稍后再试']
            },
            food: {
              title: '特色美食',
              items: [
                { name: '暂无数据', description: '请稍后再试' },
                { name: '暂无数据', description: '请稍后再试' },
                { name: '暂无数据', description: '请稍后再试' },
                { name: '暂无数据', description: '请稍后再试' }
              ]
            }
          };
        } catch (error) {
          console.error('加载省份详情失败:', error);
          // 设置默认数据
          this.provinceDetails = {
            intro: {
              title: '介绍',
              content: ['数据加载失败', '请刷新页面重试']
            },
            history: {
              title: '历史文化',
              content: ['数据加载失败', '请刷新页面重试']
            },
            development: {
              title: '现代发展',
              content: ['数据加载失败', '请刷新页面重试']
            },
            food: {
              title: '特色美食',
              items: [
                { name: '数据加载失败', description: '请刷新页面重试' },
                { name: '数据加载失败', description: '请刷新页面重试' },
                { name: '数据加载失败', description: '请刷新页面重试' },
                { name: '数据加载失败', description: '请刷新页面重试' }
              ]
            }
          };
        }
      }
    }
  };
</script>


<template>
    <div class="province-container">
      <Swiper class="slide_container" 
      :modules="modules" loop :pagination="{clickable:true}"
        :autoplay="{delay:3000}" :slides-per-view="1" :centered-slides="true" :effect="'fade'" fade-effect="{crossFade: true}">
        <SwiperSlide v-for="(src,index) in img_source" :key="index" class="box">
          <div class="slide_wrapper ">
          <img :src="src.img" class="slide-image "  />
          <div class="description ">
            <div class="des_title ">{{ src.title }}</div>
          </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- 详情展示部分 -->
      <main class="max-w-6xl mx-auto px-4 py-12">
        <div class="space-y-12">
          <!-- 介绍部分 -->
          <section id="tag1" class="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
            <div class="flex items-center p-4 h-20 bg-gradient-to-r from-teal-700 to-teal-600">
                <img src="/img/mountain.png" alt="图标" class="w-16 h-16 mr-4 object-contain flex-shrink-0" />
              <h2 class="text-2xl font-bold text-white ml-2 font-lxgwwen">
                {{ provinceDetails?.intro?.title || '介绍' }}
              </h2>
            </div>
            <div class="p-8 bg-[#f8f9fa]">
              <div v-if="provinceDetails?.intro?.content" class="text-content">
                <p v-for="(paragraph, index) in provinceDetails.intro.content" :key="index" class="mb-6 text-gray-700 leading-relaxed text-lg font-lxgwwen">
                  {{ paragraph }}
                </p>
              </div>
              <div v-else class="text-center py-8">
                <p class="text-gray-500 font-lxgwwen">暂无介绍数据</p>
              </div>
            </div>
          </section>

          <!-- 历史文化部分 -->
          <section id="tag2" class="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
            <div class="flex items-center p-4 h-20 bg-gradient-to-r from-teal-700 to-teal-600">
                <img src="/img/mountain.png" alt="图标" class="w-16 h-16 mr-4 object-contain flex-shrink-0" />
              <h2 class="text-2xl font-bold text-white ml-2 font-lxgwwen">
                {{ provinceDetails?.history?.title || '历史文化' }}
              </h2>
            </div>
            <div class="p-8 bg-[#f8f9fa]">
              <div v-if="provinceDetails?.history?.content" class="text-content">
                <p v-for="(paragraph, index) in provinceDetails.history.content" :key="index" class="mb-6 text-gray-700 leading-relaxed text-lg font-lxgwwen">
                  {{ paragraph }}
                </p>
              </div>
              <div v-else class="text-center py-8">
                <p class="text-gray-500 font-lxgwwen">暂无历史文化数据</p>
              </div>
            </div>
          </section>

          <!-- 现代发展部分 -->
          <section id="tag3" class="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
            <div class="flex items-center p-4 h-20 bg-gradient-to-r from-teal-700 to-teal-600">
                <img src="/img/mountain.png" alt="图标" class="w-16 h-16 mr-4 object-contain flex-shrink-0" />
              <h2 class="text-2xl font-bold text-white ml-2 font-lxgwwen">
                {{ provinceDetails?.development?.title || '现代发展' }}
              </h2>
            </div>
            <div class="p-8 bg-[#f8f9fa]">
              <div v-if="provinceDetails?.development?.content" class="text-content">
                <p v-for="(paragraph, index) in provinceDetails.development.content" :key="index" class="mb-6 text-gray-700 leading-relaxed text-lg font-lxgwwen">
                  {{ paragraph }}
                </p>
              </div>
              <div v-else class="text-center py-8">
                <p class="text-gray-500 font-lxgwwen">暂无现代发展数据</p>
              </div>
            </div>
          </section>

          <!-- 特色美食部分 -->
          <section id="tag4" class="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
            <div class="flex items-center p-4 h-20 bg-gradient-to-r from-teal-700 to-teal-600">
                <img src="/img/mountain.png" alt="图标" class="w-16 h-16 mr-4 object-contain flex-shrink-0" />
              <h2 class="text-2xl font-bold text-white ml-2 font-lxgwwen">
                {{ provinceDetails?.food?.title || '特色美食' }}
              </h2>
            </div>
            <div class="p-8 bg-[#f8f9fa]">
              <div v-if="provinceDetails?.food?.items" class="food-grid">
                <div v-for="(item, index) in provinceDetails.food.items" :key="index" class="food-card bg-white p-6 rounded-lg shadow border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <h3 class="text-xl font-bold text-gray-800 mb-3 font-lxgwwen text-teal-800">
                    {{ item.name }}
                  </h3>
                  <p class="text-gray-600 font-lxgwwen">
                    {{ item.description }}
                  </p>
                </div>
              </div>
              <div v-else class="text-center py-8">
                <p class="text-gray-500 font-lxgwwen">暂无特色美食数据</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </template>

<style>
/* 定义字体 */
@font-face {
  font-family: 'MyFont';
  src: url('/public/HYYanRuiMinKaiShuS.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap; /* 优化字体加载显示 */
}

/* 定义新的LXGW WenKai字体 */
@font-face {
  font-family: 'LXGW WenKai';
  src: url('/public/LXGWWenKaiLite-Light.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap; /* 优化字体加载显示 */
}

.province-container {
  min-height: 100vh;
  background-color: #F4EAC5;
  font-family: 'LXGW WenKai', 'MyFont', serif;
}

.slide_container{
  width: 100%;
  height: 75vh;
}

.box{
  height: 100%;
  flex-direction: row;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide_wrapper{
  width: 70%!important;
  height: 100%;
}

.slide-image{
  width: 100%!important;
  height: 100%!important;
  object-fit: fill;
  transition: transform 0.5s ease;
}

.slide-image:hover{
  transform: scale(1.02);
}

.description{
  width: 70%;
  height: 20%;
  position: absolute;
  bottom: 0;
  z-index: 10;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 80%);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

.des_title{
  font-size: 64px;
  font-family: 'MyFont';
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
  letter-spacing: 5px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* 自定义字体类 */
.font-lxgwwen {
  font-family: 'LXGW WenKai', serif;
}

/* 优化文字内容排版 */
.text-content p {
  text-indent: 2em; /* 首行缩进 */
  line-height: 1.8;
  letter-spacing: 0.5px;
}

/* 美食卡片网格布局 */
.food-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .des_title {
    font-size: 48px;
  }
  
  .food-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .text-content p {
    font-size: 16px;
    line-height: 1.6;
  }
}

@media (max-width: 480px) {
  .des_title {
    font-size: 36px;
  }
  
  .slide_wrapper {
    width: 90% !important;
  }
  
  .description {
    width: 90%;
  }
}

/* 平滑过渡效果 */
section {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 美食卡片悬停效果 */
.food-card:hover {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: #4fd1c5;
}

/* 滚动条样式优化 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #549688;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4a8478;
}

/* 确保背景色正确
.bg-[#F8F9FA] {
  background-color: #f8f9fa;
} */

/* 确保背景渐变正确 */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

.from-teal-700 {
  --tw-gradient-from: #0f766e;
  --tw-gradient-to: #0d9488;
}

.to-teal-600 {
  --tw-gradient-to: #0d9488;
}

/* 确保阴影效果 */
.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* 确保文字颜色 */
.text-teal-800 {
  color: #134e4a;
}
</style>