<template>
  <div class="wrapper">

    <!-- ================= HERO区 ================= -->
    <section class="hero" v-if="province">
      <img class="hero-bg" ref="heroBgEl" :src="province.image" alt="Province Image"/>
      <!-- 遮罩 + 诗句（加 ref） -->
      <div class="hero-overlay" ref="heroOverlayEl">
        <div class="poem-container" :style="{ height: poemContainerHeight }">
          <div class="poem-line" v-for="(line, index) in poemLines" :key="index" :ref="el => poemRefs[index] = el" :style="{ top: `${index * lineSpacing}em` }">
            <span v-for="(char, i) in line" :key="i" class="char">{{ char }}</span>
          </div>
        </div>
      </div>
      <!-- Scroll 按钮：触发 openSpotViewer -->
      <div class="scroll-indicator" role="button" tabindex="0" @click="openSpotViewer">Get More</div>
    </section>

    <!-- ================= FULLSCREEN 展示 ================= -->
    <div class="spot-fullscreen" v-if="isSpotViewerOpen" ref="spotFullscreenEl">
      <!-- 背景图 -->
      <div
        class="spot-bg"
        :style="{ backgroundImage: `url(${currentSpotData.image})` }"
      >
    </div>

      <!-- 信息介绍面板 -->
      <div class="spot-info-panel">
        <h2>{{ currentSpotData.title }}</h2>
        <p>{{ currentSpotData.desc }}</p>

        <div class="spot-nav">
          <button @click="prevSpot">‹ 上一个</button>
          <button @click="nextSpot">下一个 ›</button>
        </div>
      </div>
    </div>

  </div>
</template>


<script setup>
// Vue 核心
import { ref, onMounted, nextTick, computed } from 'vue';
import { useRoute } from 'vue-router';
// 动画库
import gsap from 'gsap';
// 导入数据源
import provinces from '@/data/provinces.json';

// -------------------- 路由 + 数据获取 --------------------
const route = useRoute();
const provinceName = route.params.name;
const province = provinces[provinceName];

// 每行的垂直间距（单位：em）
const lineSpacing = 1.4;

// -------------------- 处理诗句：按标点自动分行 --------------------
const poemLines = computed(() => {
  if (!province?.poem) return [];

  return province.poem
    .split(/(?<=[，。！？；])/)
    .filter(s => s.trim())
    .map(line => Array.from(line)); // 将每行转为字符数组
});

// 诗句容器总高度（用于撑起绝对定位）
const poemContainerHeight = computed(() => `${poemLines.value.length * lineSpacing}em`);

// 存储每行 DOM 引用
const poemRefs = ref([]);

// -------------------- GSAP 动画：每行逐字淡入 --------------------
onMounted(async () => {
  if (!poemLines.value.length) return;

  // 等待 DOM 渲染完成
  await nextTick();

  // 为每行分别执行动画
  poemRefs.value.forEach((lineEl, index) => {
    const chars = lineEl?.querySelectorAll('.char');
    if (!chars) return;

    gsap.fromTo(
      chars,
      { opacity: 0, x: -10 },
      {
        opacity: 1,
        x: 0,
        duration: 0.75,
        ease: 'power2.out',
        stagger: 0.06,
        delay: index * 0.9, // 每行动画延迟，提高节奏感
      }
    );
  });
});

// ==================== Spots 全屏展示逻辑 + 动画 ====================



const isSpotViewerOpen = ref(false);
const currentSpotIndex = ref(0);
const isAnimating = ref(false);

// ref 绑定 DOM，模板已经配合过：ref="heroBgEl" 等
const heroBgEl = ref(null);
const heroOverlayEl = ref(null);
const spotFullscreenEl = ref(null);

// 当前展示景点
const currentSpotData = computed(() => province.spots[currentSpotIndex.value]);

// 点击 Scroll → 进入景点展示 & 播放动画
async function openSpotViewer() {
  if (isAnimating.value) return; // 防连点
  isAnimating.value = true;

  currentSpotIndex.value = 0;
  isSpotViewerOpen.value = true;   // ✅ 先渲染 DOM，让 GSAP 能找到元素

  await nextTick();  // ✅ 等待 DOM 更新后再执行动画

  gsap.set(spotFullscreenEl.value, { y: "100%", opacity: 0 });

  gsap.timeline({
    defaults: { ease: "power3.out" },
    onComplete: () => (isAnimating.value = false)
  })
    .to(heroBgEl.value, {
      scale: 1.12,
      duration: 0.8,
      ease: "power3.inOut"
    })
    .to(
      heroOverlayEl.value,
      {
        opacity: 0,
        duration: 0.6
      },
      "-=0.4"
    )
    .to(
      spotFullscreenEl.value,
      {
        y: 0,
        opacity: 1,
        duration: 0.8
      },
      "-=0.2"
    );
}

// 切换景点（左右按钮保持不变）
function nextSpot() {
  currentSpotIndex.value = (currentSpotIndex.value + 1) % province.spots.length;
}
function prevSpot() {
  currentSpotIndex.value =
    (currentSpotIndex.value - 1 + province.spots.length) %
    province.spots.length;
}


</script>

<style scoped>
/* -------------------- 字体 -------------------- */
@font-face {
  font-family: "MyFont";
  src: url("/public/HYYanRuiMinKaiShuS.ttf") format("truetype");
}

/* -------------------- 页面结构 -------------------- */
.wrapper {
  position: relative;
  width: 100%;
  min-height: 200vh;
}

/* HERO 区固定 */
.hero {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  z-index: 1;
}

/* 背景图 */
.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.86);
}

/* 遮罩层 */
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    rgba(0, 0, 0, 0) 10%,
    rgba(0, 0, 0, 0.5) 60%,
    rgba(0, 0, 0, 0.92) 100%
  );
  display: flex;
  align-items: flex-end;
  padding: 0 6vw 24vh;
  z-index: 2;
}

/* -------------------- 诗句 -------------------- */
.poem-container {
  width: 46vw;
  position: relative;
}

.poem-line {
  position: absolute;
  left: 0;
  font-family: "MyFont";
  font-size: 3.6vw;
  color: #fff;
  opacity: 0.8;
  line-height: 1.25;
  white-space: nowrap;
}

/* 每个字都是可动画单位 */
.char {
  display: inline-block;
  opacity: 0;
}

/* -------------------- Scroll 提示 -------------------- */
.scroll-indicator {
  position: absolute;
  bottom: 3vh;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  font-size: 20px;
  animation: bounce 1.5s infinite;
  z-index: 3;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

/* -------------------- 内容区 -------------------- */
.content-section {
  position: relative;
  margin-top: 0;
  padding: 64px 10vw 120px;
  min-height: 120vh;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(10px);
  z-index: 5;
}

/* 文字样式 */
.content-inner h2 {
  margin-bottom: 18px;
  font-size: 28px;
}
.content-inner p {
  color: #333;
  line-height: 1.8;
}

/* -------------------- 响应式 -------------------- */
@media (max-width: 768px) {
  .poem-container { width: 80vw; }
  .poem-line { font-size: 6.5vw; }
}
/* ✅ 全屏展示区域 */
.spot-fullscreen {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: row;

  opacity: 0;
  transform: translateY(100%);
  z-index: 999; /* ✅ 保证在最上层 */
  background: #000;
  overflow: hidden;
}

/* ✅ 大图铺满，不拉伸变形 */
.spot-fullscreen-image {
  flex: 1;              /* 自动占据剩余空间 */
  height: 100%;
  width: 100%;
  object-fit: cover;    /* 保证图片不变形 */
  filter: brightness(0.93); /* 稍微压暗，突出右侧文字内容 */
  transition: transform 0.6s ease;
}

/* ✅ 信息面板出现视觉更高级 */
.spot-info-panel {
  width: 34vw;
  min-width: 360px;
  padding: 80px 60px;

  background: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.72),
    rgba(0, 0, 0, 0.4)
  );

  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  backdrop-filter: blur(18px); /* ✅ 毛玻璃效果 */
  border-left: 1px solid rgba(255, 255, 255, 0.12);
}

.spot-info-panel h2 {
  margin-bottom: 24px;
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 1px;
}

.spot-info-panel p {
  font-size: 18px;
  line-height: 1.75;
  opacity: 0.92;
}

/* ✅ 切换按钮 */
.spot-nav {
  margin-top: 60px;
  display: flex;
  gap: 24px;
}

.spot-nav button {
  padding: 10px 28px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;

  border: 1px solid rgba(255, 255, 255, 0.4);
  background: transparent;
  color: #fff;
  cursor: pointer;
  transition: all 0.25s ease;
}

.spot-nav button:hover {
  background: #fff;
  color: #000;
  transform: translateY(-3px);
}


/* ✅ 手机端自动变为上下布局 */
@media (max-width: 900px) {
  .spot-fullscreen {
    flex-direction: column;
  }

  .spot-fullscreen-image {
    height: 55vh;
    width: 100%;
  }

  .spot-info-panel {
    width: 100%;
    padding: 40px 30px;
    min-width: auto;
  }

  .spot-info-panel h2 {
    font-size: 30px;
  }
}

.spot-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1; /* 放在内容后面 */
}

</style>
