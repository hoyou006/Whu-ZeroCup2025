<template>
  <div class="challenge-container">
    <!-- 背景层 - 水墨山水景观 -->
    <div class="background-layer">
      <!-- 动态山脉 -->
      <svg class="mountain-bg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
        <!-- 远山（最淡） -->
        <path d="M0,400 Q300,250 600,350 T1200,400 L1200,600 L0,600 Z" 
              fill="url(#mountainGradient1)" opacity="0.15"/>
        <!-- 中山 -->
        <path d="M0,450 Q200,300 400,380 T800,420 T1200,450 L1200,600 L0,600 Z" 
              fill="url(#mountainGradient2)" opacity="0.25"/>
        <!-- 前山 -->
        <path d="M0,480 Q150,350 300,420 T600,460 T900,420 T1200,480 L1200,600 L0,600 Z" 
              fill="url(#mountainGradient3)" opacity="0.35"/>
        
        <!-- 水流纹理 -->
        <g class="water-waves">
          <path d="M0,520 Q100,515 200,520 T400,520 T600,520 T800,520 T1000,520 T1200,520" 
                stroke="#7EB3B3" stroke-width="2" fill="none" opacity="0.4"/>
          <path d="M0,540 Q100,535 200,540 T400,540 T600,540 T800,540 T1000,540 T1200,540" 
                stroke="#7EB3B3" stroke-width="1.5" fill="none" opacity="0.3"/>
        </g>

        <defs>
          <linearGradient id="mountainGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#8FB4A3;stop-opacity:0.4" />
            <stop offset="100%" style="stop-color:#F5F5F5;stop-opacity:0.1" />
          </linearGradient>
          <linearGradient id="mountainGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#7EB3B3;stop-opacity:0.6" />
            <stop offset="100%" style="stop-color:#F5F5F5;stop-opacity:0.2" />
          </linearGradient>
          <linearGradient id="mountainGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#6BA8A8;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#F5F5F5;stop-opacity:0.3" />
          </linearGradient>
        </defs>
      </svg>

      <!-- 流动水纹动画 -->
      <div class="water-flow"></div>
      
      <!-- 古建筑元素装饰 -->
      <div class="pagoda-decoration pagoda-left"></div>
      <div class="pagoda-decoration pagoda-right"></div>
    </div>

    <!-- 内容层 -->
    <main class="content-layer">
      <!-- 初始界面 -->
      <section v-if="stage==='ready'" class="ready-section">
        <div class="ready-card">
          <div class="title-decoration">
            <div class="circle circle-top"></div>
            <h1 class="main-title">地理之旅</h1>
            <div class="circle circle-bottom"></div>
          </div>
          
          <p class="subtitle">从一百题中随机抽取十题</p>
          
          <button @click="startGame" class="start-button">
            <span class="button-inner">开始答题</span>
            <span class="button-glow"></span>
          </button>
          
        </div>
      </section>

      <!-- 答题界面 -->
      <section v-else-if="stage==='playing'" class="playing-section">
        <div class="playing-card">
          <!-- 顶部进度信息 -->
          <div class="progress-header">
            <span class="progress-text">第 {{ index + 1 }} 题</span>
            <span class="progress-text">共 {{ total }} 题</span>
          </div>

          <!-- 进度条 -->
          <div class="progress-bar-container">
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" :style="{ width: progressPct + '%' }"></div>
            </div>
          </div>

          <!-- 题干 -->
          <div class="question-container">
            <h2 class="question-text">{{ current.question }}</h2>
          </div>

          <!-- 选项 -->
          <div class="options-container">
            <button
              v-for="(opt, i) in current.optionsArray"
              :key="i"
              @click="choose(i)"
              class="option-button"
              :class="getOptionClass(i)"
              :disabled="isAnswered"
            >
              <span class="option-label">{{ optionLabel(i) }}</span>
              <span class="option-text">{{ opt }}</span>
              <span class="option-indicator" v-if="isAnswered">
                <span v-if="i === current.answerIndex" class="correct-mark">✓</span>
                <span v-else-if="i === selectedIndex" class="error-mark">✗</span>
              </span>
            </button>
          </div>

          <!-- 下一题按钮 -->
          <div class="button-container">
            <button
              @click="next"
              class="next-button"
              :disabled="!isAnswered"
            >
              {{ index === total - 1 ? '查看成绩' : '下一题' }}
            </button>
          </div>
        </div>
      </section>

      <!-- 结果界面 -->
      <section v-else-if="stage==='result'" class="result-section">
        <div class="result-card">
          <div class="result-header">
            <h2 class="result-title">成绩揭晓</h2>
          </div>

          <div class="score-display">
            <div class="score-circle">
              <div class="score-inner">
                <span class="score-number">{{ score }}</span>
                <span class="score-total">/ {{ total }}</span>
              </div>
            </div>
          </div>

          <div class="title-section">
            <p class="title-label">你的称号</p>
            <p class="title-name">{{ title }}</p>
            <p class="title-description">{{ titleDescription }}</p>
          </div>

          <div class="result-buttons">
            <button @click="startGame" class="btn btn-primary">
              再来一次
            </button>
            <button @click="$router.back()" class="btn btn-secondary">
              返回首页
            </button>
          </div>
        </div>
      </section>

      <!-- 加载中 -->
      <section v-else class="loading-section">
        <div class="loading-card">
          <div class="loading-spinner-large"></div>
          <p class="loading-text">题库加载中…</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const stage = ref('loading')   // 'loading' | 'ready' | 'playing' | 'result'
const allQuestions = ref([])   // 全量题库(100)
const picked = ref([])         // 随机抽取的10题
const total = 10

const index = ref(0)
const selectedIndex = ref(null)
const answers = ref([])        // 记录选择
const score = ref(0)
const isAnswered = ref(false)  // 标记当前题目是否已回答

const current = computed(() => picked.value[index.value] || {})
const progressPct = computed(() => Math.round(((index.value) / total) * 100))

const optionLabel = (i) => ['A','B','C','D'][i]

// 称号描述
const titleDescription = computed(() => {
  const s = score.value
  if (s <= 3) return '地理知识有待提高，继续学习，你会有进步！'
  if (s <= 7) return '不错，你对地理有基本的认识，继续加油！'
  if (s <= 9) return '优秀！你的地理知识储备丰富，展现了深厚的学识！'
  return '杰出！你是真正的地理达人，知识渊博，令人敬佩！'
})

// 计算选项样式类
const getOptionClass = (i) => {
  if (!isAnswered.value) return ''
  
  // 正确选项
  if (i === current.value?.answerIndex) {
    return 'correct'
  }
  
  // 错误选项且是用户选择的
  if (selectedIndex.value === i && i !== current.value?.answerIndex) {
    return 'incorrect'
  }
  
  return ''
}

// 从本地文件加载题库
async function loadQuestions () {
  try {
    const resp = await fetch('/geo_questions_zh_CN.json')
    const data = await resp.json()
    // 规范化：把 options 对象转换为数组，并计算 answerIndex（0-3）
    allQuestions.value = data.map(q => {
      const optionsArray = Array.isArray(q.options) ? q.options : Object.values(q.options || {})
      const answerLetter = (q.answer || '').toString()
      const answerIndex = ['A','B','C','D'].indexOf(answerLetter)
      return { ...q, optionsArray, answerIndex }
    })
    stage.value = 'ready'
  } catch (e) {
      console.error('题库加载失败', e)
      alert('题库加载失败，请确认文件路径。')
  }
}

function startGame () {
  // 洗牌并抽取10题
  const shuffled = [...allQuestions.value].sort(() => Math.random() - 0.5)
  picked.value = shuffled.slice(0, total)
  // 重置状态
  index.value = 0
  answers.value = Array(total).fill(null)
  selectedIndex.value = null
  score.value = 0
  isAnswered.value = false
  stage.value = 'playing'
}

function choose (i) {
  if (isAnswered.value) return
  
  // 标记选择
  selectedIndex.value = i
  answers.value[index.value] = i
  
  // 立即判断对错并计分
  const currentQuestion = picked.value[index.value]
  if (currentQuestion && i === currentQuestion.answerIndex) {
    score.value++
  }
  
  // 设置已回答状态
  isAnswered.value = true
}

function next () {
  if (!isAnswered.value) return
  
  // 下一题 or 结果
  if (index.value < total - 1) {
    index.value++
    selectedIndex.value = null
    isAnswered.value = false
  } else {
    stage.value = 'result'
  }
}

// 成就称号
const title = computed(() => {
  const s = score.value
  if (s <= 3) return '地理小白'
  if (s <= 7) return '地图探索者'
  if (s <= 9) return '区域行家'
  return '国家地理之星'
})

onMounted(loadQuestions)
</script>

<style scoped>
/* ===================== 基础布局 ===================== */
.challenge-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-color: #FAFAF8;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* ===================== 背景层 ===================== */
.background-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: linear-gradient(180deg, #FAFAF8 0%, #F5F5F5 100%);
  overflow: hidden;
}

/* SVG 背景 */
.mountain-bg {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
}

/* 水流波纹动画 */
.water-flow {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 10px,
    rgba(123, 179, 179, 0.1) 10px,
    rgba(123, 179, 179, 0.1) 20px
  );
  animation: flowWater 10s linear infinite;
}

@keyframes flowWater {
  0% { transform: translateX(0); }
  100% { transform: translateX(40px); }
}

/* 古建筑装饰 */
.pagoda-decoration {
  position: absolute;
  bottom: 80px;
  opacity: 0.15;
  z-index: 2;
}

.pagoda-left {
  left: 10%;
  width: 120px;
  height: 180px;
  background: linear-gradient(135deg, transparent 40%, #6BA8A8 45%, transparent 50%);
  clip-path: polygon(
    50% 0%, 100% 25%, 85% 35%, 95% 50%, 85% 60%, 
    100% 75%, 50% 100%, 0% 75%, 15% 60%, 5% 50%, 
    15% 35%, 0% 25%
  );
}

.pagoda-right {
  right: 12%;
  width: 100px;
  height: 160px;
  background: linear-gradient(45deg, transparent 45%, #5A9FB5 50%, transparent 55%);
  clip-path: polygon(
    50% 0%, 100% 30%, 80% 40%, 90% 60%, 75% 75%, 
    50% 85%, 25% 75%, 10% 60%, 20% 40%, 0% 30%
  );
}

/* ===================== 内容层 ===================== */
.content-layer {
  position: relative;
  z-index: 10;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  min-height: 100vh;
}

/* ===================== 初始界面 ===================== */
.ready-section {
  width: 100%;
  max-width: 600px;
  animation: fadeInUp 0.8s ease-out;
}

.ready-card {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 60px 40px;
  box-shadow: 0 8px 32px rgba(107, 168, 168, 0.1);
  text-align: center;
  border: 1px solid rgba(107, 168, 168, 0.2);
}

.title-decoration {
  position: relative;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.circle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #6BA8A8;
  opacity: 0.6;
}

.main-title {
  font-size: 42px;
  font-weight: 300;
  letter-spacing: 8px;
  color: #6BA8A8;
  margin: 0;
  font-family: 'SimSun', 'STZhongsong', serif;
}

.subtitle {
  font-size: 18px;
  color: #6BA8A8;
  font-weight: 400;
  margin: 0 0 10px 0;
  letter-spacing: 2px;
}

.start-button {
  position: relative;
  width: 200px;
  height: 50px;
  margin: 20px auto;
  background: linear-gradient(135deg, #6BA8A8, #7EB3B3);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 3px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(107, 168, 168, 0.3);
  overflow: hidden;
}

.button-inner {
  position: relative;
  z-index: 2;
}

.button-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.3), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 8px;
}

.start-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(107, 168, 168, 0.4);
}

.start-button:active {
  transform: translateY(0);
}


/* ===================== 答题界面 ===================== */
.playing-section {
  width: 100%;
  max-width: 700px;
  animation: slideUp 0.6s ease-out;
}

.playing-card {
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(107, 168, 168, 0.08);
  border: 1px solid rgba(107, 168, 168, 0.15);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 13px;
  color: #6BA8A8;
  font-weight: 400;
  letter-spacing: 1px;
}

.progress-text {
  opacity: 0.7;
}

.progress-bar-container {
  margin-bottom: 30px;
}

.progress-bar-bg {
  width: 100%;
  height: 3px;
  background-color: #E8E8E8;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #6BA8A8, #7EB3B3);
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 3px;
}

.question-container {
  margin: 30px 0;
  min-height: 60px;
  display: flex;
  align-items: center;
}

.question-text {
  font-size: 18px;
  font-weight: 400;
  line-height: 1.8;
  color: #333;
  margin: 0;
  letter-spacing: 0.5px;
  font-family: 'SimSun', 'STZhongsong', serif;
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 30px 0;
}

.option-button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px 20px;
  background-color: #FAFAF8;
  border: 2px solid #E8E8E8;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  color: #333;
  font-size: 15px;
  font-weight: 400;
  font-family: inherit;
}

.option-button:not(:disabled):hover {
  background-color: #F5F5F5;
  border-color: #6BA8A8;
  transform: translateX(4px);
}

.option-button:disabled {
  cursor: default;
}

.option-button.correct {
  background-color: #E8F5F5;
  border-color: #6BA8A8;
}

.option-button.incorrect {
  background-color: #FCE8E8;
  border-color: #D4999A;
}

.option-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  margin-right: 12px;
  background-color: rgba(107, 168, 168, 0.1);
  border-radius: 6px;
  font-weight: 500;
  color: #6BA8A8;
  flex-shrink: 0;
}

.option-button.incorrect .option-label {
  background-color: rgba(212, 153, 154, 0.1);
  color: #D4999A;
}

.option-text {
  flex: 1;
  word-break: break-all;
}

.option-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-left: 8px;
  flex-shrink: 0;
  font-weight: bold;
  font-size: 16px;
}

.correct-mark {
  color: #6BA8A8;
}

.error-mark {
  color: #D4999A;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}

.next-button {
  padding: 12px 32px;
  background: linear-gradient(135deg, #6BA8A8, #7EB3B3);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(107, 168, 168, 0.25);
}

.next-button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(107, 168, 168, 0.35);
}

.next-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* ===================== 结果界面 ===================== */
.result-section {
  width: 100%;
  max-width: 600px;
  animation: fadeInUp 0.8s ease-out;
}

.result-card {
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 50px 40px;
  box-shadow: 0 8px 32px rgba(107, 168, 168, 0.1);
  border: 1px solid rgba(107, 168, 168, 0.15);
  text-align: center;
}

.result-header {
  margin-bottom: 40px;
}

.result-title {
  font-size: 32px;
  font-weight: 300;
  letter-spacing: 4px;
  color: #6BA8A8;
  margin: 0;
  font-family: 'SimSun', 'STZhongsong', serif;
}

.score-display {
  margin: 40px 0;
}

.score-circle {
  width: 160px;
  height: 160px;
  margin: 0 auto;
  background: conic-gradient(#6BA8A8 0deg, #7EB3B3 180deg, #E8E8E8 180deg, #E8E8E8 360deg);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(107, 168, 168, 0.15);
}

.score-inner {
  width: 148px;
  height: 148px;
  background: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.score-number {
  font-size: 48px;
  font-weight: 600;
  color: #6BA8A8;
}

.score-total {
  font-size: 14px;
  color: #999;
  font-weight: 400;
}

.title-section {
  margin: 40px 0;
}

.title-label {
  font-size: 12px;
  color: #999;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 0 0 10px 0;
}

.title-name {
  font-size: 28px;
  font-weight: 400;
  color: #6BA8A8;
  margin: 0 0 15px 0;
  letter-spacing: 3px;
  font-family: 'SimSun', 'STZhongsong', serif;
}

.title-description {
  font-size: 13px;
  color: #999;
  line-height: 1.6;
  margin: 0;
  letter-spacing: 0.5px;
}

.result-buttons {
  display: flex;
  gap: 15px;
  margin-top: 40px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  min-width: 140px;
}

.btn-primary {
  background: linear-gradient(135deg, #6BA8A8, #7EB3B3);
  color: white;
  box-shadow: 0 4px 12px rgba(107, 168, 168, 0.25);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(107, 168, 168, 0.35);
}

.btn-secondary {
  background-color: #F5F5F5;
  color: #6BA8A8;
  border: 2px solid #E8E8E8;
}

.btn-secondary:hover {
  background-color: #F0F0F0;
  border-color: #6BA8A8;
}

/* ===================== 加载界面 ===================== */
.loading-section {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-card {
  text-align: center;
}

.loading-spinner-large {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  border: 4px solid rgba(107, 168, 168, 0.2);
  border-top: 4px solid #6BA8A8;
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
}

.loading-text {
  font-size: 14px;
  color: #999;
  letter-spacing: 1px;
}

/* ===================== 动画 ===================== */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ===================== 响应式设计 ===================== */
@media (max-width: 768px) {
  .content-layer {
    padding: 30px 16px;
  }

  .ready-card,
  .playing-card,
  .result-card {
    padding: 30px 24px;
    border-radius: 16px;
  }

  .main-title {
    font-size: 32px;
    letter-spacing: 4px;
  }

  .question-text {
    font-size: 16px;
  }

  .option-button {
    padding: 14px 16px;
    font-size: 14px;
  }

  .result-title {
    font-size: 28px;
  }

  .title-name {
    font-size: 24px;
  }

  .score-circle {
    width: 140px;
    height: 140px;
  }

  .score-inner {
    width: 130px;
    height: 130px;
  }

  .score-number {
    font-size: 40px;
  }

  .btn {
    min-width: 120px;
    padding: 10px 24px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .ready-card,
  .playing-card,
  .result-card {
    padding: 24px 16px;
  }

  .main-title {
    font-size: 28px;
    letter-spacing: 3px;
  }

  .subtitle {
    font-size: 16px;
  }

  .progress-header {
    font-size: 12px;
  }

  .question-text {
    font-size: 15px;
    line-height: 1.6;
  }

  .option-button {
    padding: 12px 14px;
    gap: 8px;
    font-size: 13px;
  }

  .option-label {
    min-width: 26px;
    height: 26px;
    font-size: 12px;
  }

  .result-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
