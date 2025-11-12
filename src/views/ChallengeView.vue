<template>
  <div class="min-h-screen" style="background-color: #F4EAC5; color: #333;">
    <!-- 顶部栏
    <header class="w-full bg-white/80 backdrop-blur sticky top-0 z-10 border-b">
      <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 class="text-xl font-bold tracking-wider" style="color:#549688">国家地理知识挑战</h1>
        <div class="text-sm text-gray-500">过关闯将 · 趣味问答</div>
      </div>
    </header> -->

    <!-- 主体 -->
    <main class="max-w-3xl mx-auto px-4 py-8">
      <!-- 初始界面 -->
      <section v-if="stage==='ready'" class="text-center space-y-6 fade-in">
        <p class="text-lg">从 100 题中随机抽取 10 题，看看你能拿到什么称号？</p>
        <button
          @click="startGame"
          class="px-6 py-3 rounded-full text-white shadow-md hover:shadow-lg transition"
          :style="{backgroundColor: theme.primary}"
        >
          开始挑战
        </button>
        <div class="loader"></div>
      </section>

      <!-- 答题界面 -->
      <section v-else-if="stage==='playing'" class="space-y-6 slide-up">
        <!-- 进度条 -->
        <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div class="h-2 rounded-full transition-all"
               :style="{ width: progressPct + '%', backgroundColor: theme.primary }"></div>
        </div>
        <div class="text-right text-sm text-gray-600">{{ index }}/{{ total }}</div>

        <!-- 题干 -->
        <div class="bg-white rounded-2xl shadow p-6">
          <h2 class="text-lg font-semibold leading-relaxed mb-4">
            {{ current.question }}
          </h2>

          <!-- 选项 -->
        <div class="grid gap-3">
          <button
            v-for="(opt,i) in current.optionsArray"
            :key="i"
            @click="choose(i)"
            class="text-left w-full rounded-xl border p-4 hover:shadow transition focus:outline-none"
            :class="getOptionClass(i)"
          >
            <span class="font-medium">{{ optionLabel(i) }}.</span>
            <span class="ml-2">{{ opt }}</span>
          </button>
        </div>

          <!-- 下一题 -->
          <div class="mt-6 flex justify-end">
            <button
              @click="next"
              class="px-5 py-2 rounded-full text-white disabled:opacity-50"
              :disabled="!isAnswered"
              :style="{backgroundColor: theme.primary}"
            >
              {{ index === total-1 ? '提交结果' : '下一题' }}
            </button>
          </div>
        </div>
      </section>

      <!-- 结果界面 -->
      <section v-else-if="stage==='result'" class="text-center space-y-6 fade-in">
        <div class="bg-white rounded-2xl shadow p-8">
          <div class="text-5xl font-extrabold" :style="{color: theme.primary}">
            {{ score }}
            <span class="text-base ml-2 text-gray-500">/ {{ total }}</span>
          </div>
          <div class="mt-2 text-lg">你的称号：<span class="font-semibold">{{ title }}</span></div>

          <div class="mt-6 flex items-center justify-center gap-3">
            <button @click="startGame"
              class="px-6 py-3 rounded-full text-white"
              :style="{backgroundColor: theme.primary}"
            >再来一次</button>
            <button @click="$router.back()"
              class="px-6 py-3 rounded-full border"
              :style="{borderColor: theme.primary, color: theme.primary}"
            >返回</button>
          </div>
        </div>
      </section>

      <!-- 加载中 -->
      <section v-else class="text-center py-10">
        <div class="loader"></div>
        <p class="text-gray-500 mt-2">题库加载中…</p>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 主题色
const theme = { primary: '#549688' }

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
const progressPct = computed(() => Math.round(((index.value ) / total) * 100))

const optionLabel = (i) => ['A','B','C','D'][i]

// 计算选项样式类
const getOptionClass = (i) => {
  // 当题目未回答时，不添加特殊样式
  if (!isAnswered.value) return ''
  
  // 正确选项
  if (i === picked.value[index.value]?.answerIndex) {
    return 'bg-green-100 border-green-300'
  }
  
  // 错误选项且是用户选择的
  if (selectedIndex.value === i && i !== picked.value[index.value]?.answerIndex) {
    return 'bg-red-100 border-red-300'
  }
  
  return ''
}

// 从本地文件加载题库
async function loadQuestions () {
  try {
    const resp = await fetch('/geo_questions_zh_CN.json') // 放到 src/data 下更易于版本管理
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
  if (isAnswered.value) return // 如果已经回答过，不允许再次选择
  
  // 标记选择
  selectedIndex.value = i
  answers.value[index.value] = i
  
  // 立即判断对错并计分
  const currentQuestion = picked.value[index.value]
  if (currentQuestion && i === currentQuestion.answerIndex) {
    score.value++
  }
  
  // 直接设置已回答状态
  isAnswered.value = true
}

function next () {
  if (!isAnswered.value) return // 如果还没回答，不允许进入下一题
  
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
/* 轻量加载动画 */
.loader {
  width: 40px; height: 40px;
  border: 4px solid #e5e7eb; /* gray-200 */
  border-top: 4px solid #549688;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 12px auto 0;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
