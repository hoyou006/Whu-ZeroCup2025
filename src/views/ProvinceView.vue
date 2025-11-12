<script>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import {Autoplay,Pagination,EffectFade} from 'swiper/modules';
  import 'swiper/css';
  import 'swiper/css/autoplay';
  import 'swiper/css/pagination';
  import 'swiper/css/effect-fade';

  // 导入省份数据JSON文件
  import provinceData from '../data/provinces.json';
  
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    data(){
      return {
        img_source: [],
        modules :[Autoplay,Pagination,EffectFade]
      }
    },
    created() {
      // 从路由参数中获取省份名称
      const provinceName = this.$route.params.name || '北京';
      this.img_source = provinceData[provinceName] || provinceData['北京'] || [];
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
        <section id="tag1" class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="flex items-center p-4 h-20" style="background-color: #549688">
              <img src="/img/mountain.png" alt="图标" class="w-20 h-20 mr-4 object-contain flex-shrink-0" />
            <h2 class="text-2xl font-bold text-white ml-2">介绍</h2>
          </div>
          <div class="p-8">
            <p class="mb-4 text-gray-700 leading-relaxed">
              北京，中国的首都，是一座有着3000多年历史的古都，拥有丰富的历史文化遗产和现代城市风貌。北京是全国的政治、文化和国际交往中心，也是一座著名的旅游城市。
            </p>
            <p class="text-gray-700 leading-relaxed">
              北京有着众多世界闻名的旅游景点，如故宫、长城、天坛、颐和园等。这些历史古迹见证了中国悠久的历史和灿烂的文化。同时，北京也是一座充满活力的现代化大都市，拥有众多现代化建筑和设施。
            </p>
          </div>
        </section>

        <!-- 历史文化部分 -->
        <section id="tag2" class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="flex items-center p-4 h-20" style="background-color: #549688">
              <img src="/img/mountain.png" alt="图标" class="w-20 h-20 mr-4 object-contain flex-shrink-0" />
            <h2 class="text-2xl font-bold text-white ml-2">历史文化</h2>
          </div>
          <div class="p-8">
            <p class="mb-4 text-gray-700 leading-relaxed">
              北京是中国历史上多个朝代的首都，特别是元、明、清三朝在此建都长达几百年，留下了大量珍贵的历史文化遗产。故宫是世界上现存规模最大、保存最为完整的木质结构古建筑群，被誉为“世界五大宫”之首。
            </p>
            <p class="text-gray-700 leading-relaxed">
              长城是中国古代伟大的防御工程，也是世界文化遗产。北京段的长城如八达岭、慕田峪等，是长城中保存最好、最具代表性的部分。此外，北京还有众多的寺庙、园林和胡同，展现了中国传统文化的多样性和丰富性。
            </p>
          </div>
        </section>

        <!-- 现代发展部分 -->
        <section id="tag3" class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="flex items-center p-4 h-20" style="background-color: #549688">
              <img src="/img/mountain.png" alt="图标" class="w-20 h-20 mr-4 object-contain flex-shrink-0" />
            <h2 class="text-2xl font-bold text-white ml-2">现代发展</h2>
          </div>
          <div class="p-8">
            <p class="mb-4 text-gray-700 leading-relaxed">
              近年来，北京在保持历史文化特色的同时，也在快速发展现代化建设。鸟巢、水立方等奥运场馆成为北京新的标志性建筑。中关村科技园区是中国重要的科技创新中心，汇聚了众多高科技企业和研究机构。
            </p>
            <p class="text-gray-700 leading-relaxed">
              北京的城市规划注重生态环境保护，建设了众多的公园和绿化带。同时，北京的公共交通系统日益完善，地铁线路四通八达，为市民和游客提供了便捷的出行方式。
            </p>
          </div>
        </section>

        <!-- 特色美食部分 -->
        <section id="tag4" class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="flex items-center p-4 h-20" style="background-color: #549688">
              <img src="/img/mountain.png" alt="图标" class="w-20 h-20 mr-4 object-contain flex-shrink-0" />
            <h2 class="text-2xl font-bold text-white ml-2">特色美食</h2>
          </div>
          <div class="p-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div class="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 class="text-xl font-bold text-gray-800 mb-3">北京烤鸭</h3>
                <p class="text-gray-600">北京最著名的菜肴之一，外皮酥脆，肉质鲜嫩</p>
              </div>
              <div class="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 class="text-xl font-bold text-gray-800 mb-3">炸酱面</h3>
                <p class="text-gray-600">老北京传统面食，酱香浓郁，风味独特</p>
              </div>
              <div class="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 class="text-xl font-bold text-gray-800 mb-3">豆汁儿焦圈</h3>
                <p class="text-gray-600">北京传统小吃，具有浓郁的地方特色</p>
              </div>
              <div class="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 class="text-xl font-bold text-gray-800 mb-3">涮羊肉</h3>
                <p class="text-gray-600">冬季特色美食，肉质鲜嫩，汤底醇厚</p>
              </div>
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

.province-container {
  min-height: 100vh;
  background-color: #F4EAC5;
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
/* 这里记得换个字体 */
.des_title{
  font-size: 64px;
  font-family: 'MyFont';
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
  letter-spacing: 5px;
}


/* 详情展示部分样式通过Tailwind CSS实现 */
/* 移除了旧的timelist相关样式，便于调试和后续修改 */

</style>