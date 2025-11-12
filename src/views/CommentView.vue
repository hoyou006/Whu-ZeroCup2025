<template>
  <div class="comment-view min-h-screen bg-gradient-to-b from-amber-50 to-cream-100 overflow-x-hidden">
    <!-- 背景云雾效果 -->
    <div class="clouds absolute inset-0 pointer-events-none"></div>
    
    <!-- 主标题区域 -->
    <header class="py-12 px-4 text-center relative z-10">
      <h1 class="text-5xl md:text-6xl font-bold text-amber-800 mb-3 
                  font-elegant tracking-wider glow-effect float-animation">
        云锦书来
      </h1>
      <p class="text-xl text-amber-700 italic font-semibold">
        留下你的山河印象
      </p>
    </header>
    
    <!-- 锦卷主体区域 -->
    <main class="max-w-5xl mx-auto px-4 pb-20">
      <!-- 锦卷容器 - 初始折叠状态 -->
      <div 
        class="scroll-container transition-all duration-1500 ease-in-out transform 
               rounded-lg overflow-hidden relative z-10"
        :class="{ 'unfolded': isUnfolded }"
      >
        <!-- 锦卷顶部装饰 -->
        <div class="scroll-top bg-amber-800/10 border-b border-amber-600/30 py-3 text-center">
          <div class="w-24 h-4 bg-amber-600/40 rounded mx-auto"></div>
        </div>
        <!-- 锦卷内容区域 -->
        <div class="scroll-content bg-cover bg-center" style="background-image: url('/paper_bg.jpg')">
          <!-- 留言输入区 -->
          <div class="input-section p-8">
            <div class="cloud-pattern-input rounded-lg border-2 border-amber-600/50 bg-amber-50/80 p-4 shadow-inner">
              <textarea 
                v-model="newComment.content"
                class="w-full h-32 resize-none bg-transparent border-none outline-none 
                       text-gray-800 text-lg placeholder-gray-500 font-serif"
                placeholder="将心意化作一缕云烟，寄于此间。"
                maxlength="500"
              ></textarea>
              <div class="flex justify-between items-center mt-4">
                <input 
                  v-model="newComment.author"
                  class="px-4 py-2 bg-amber-50 border border-amber-300 rounded text-gray-700 
                         placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="署名"
                  maxlength="20"
                />
                <button 
                  @click="submitComment"
                  class="px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white 
                         rounded-md hover:from-amber-700 hover:to-amber-800 
                         transition-all transform hover:scale-105 shadow-lg 
                         font-semibold"
                  :disabled="!canSubmit"
                >
                  织锦句
                </button>
              </div>
            </div>
          </div>
          <!-- 留言展示区域 -->
          <div class="comments-section p-8">
            <h2 class="text-2xl text-amber-800 font-elegant mb-6 border-b border-amber-300 pb-2">
              锦卷留痕
            </h2>
            <div class="comments-list space-y-6">
              <!-- 留言为空状态 -->
              <div v-if="paginatedComments.length === 0" class="text-center py-12 text-gray-500">
                <p class="text-xl">锦卷待书，静待墨香</p>
              </div>
              <!-- 留言项 -->
              <div 
                v-for="(comment, index) in paginatedComments" 
                :key="index"
                class="comment-item border-l-2 border-amber-400 pl-4 animate-fade-in"
                :style="{ animationDelay: `${index * 100}ms` }"
              >
                <!-- 锦线分隔 -->
                <div v-if="index > 0" class="gold-thread my-6"></div>
                <div class="comment-header flex justify-between items-center mb-2">
                  <span class="author-name text-amber-700 font-semibold">{{ comment.author || '匿名' }}</span>
                  <span class="comment-date text-gray-500 text-sm">{{ formatDate(comment.date) }}</span>
                </div>
                <p class="comment-content text-gray-800 leading-relaxed whitespace-pre-wrap font-serif">
                  {{ comment.content }}
                </p>
              </div>
            </div>
            
            <!-- 分页控件 -->
            <div v-if="totalPages > 1" class="pagination mt-10 text-center">
              <button 
                @click="currentPage = 1" 
                class="px-3 py-1 bg-amber-100 border border-amber-300 rounded-md mx-1 hover:bg-amber-200 transition-colors"
                :disabled="currentPage === 1"
              >
                首页
              </button>
              <button 
                @click="currentPage--" 
                class="px-3 py-1 bg-amber-100 border border-amber-300 rounded-md mx-1 hover:bg-amber-200 transition-colors"
                :disabled="currentPage === 1"
              >
                上一页
              </button>
              <span class="mx-2 text-amber-800 font-semibold">{{ currentPage }} / {{ totalPages }}</span>
              <button 
                @click="currentPage++" 
                class="px-3 py-1 bg-amber-100 border border-amber-300 rounded-md mx-1 hover:bg-amber-200 transition-colors"
                :disabled="currentPage === totalPages"
              >
                下一页
              </button>
              <button 
                @click="currentPage = totalPages" 
                class="px-3 py-1 bg-amber-100 border border-amber-300 rounded-md mx-1 hover:bg-amber-200 transition-colors"
                :disabled="currentPage === totalPages"
              >
                末页
              </button>
            </div>
          </div>
        </div>
        <!-- 锦卷底部装饰 -->
        <div class="scroll-bottom bg-amber-800/10 border-t border-amber-600/30 py-3 text-center">
          <div class="w-24 h-4 bg-amber-600/40 rounded mx-auto"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'CommentView',
  data() {
    return {
      isUnfolded: false,
      newComment: {
        author: '',
        content: ''
      },
      comments: [],
      commentsPerPage: 10, // 每页显示10条留言
      currentPage: 1 // 当前页码
    }
  },
  computed: {
    canSubmit() {
      return this.newComment.content.trim().length > 0
    },
    // 计算总页数
    totalPages() {
      return Math.ceil(this.comments.length / this.commentsPerPage)
    },
    // 计算当前页显示的留言
    paginatedComments() {
      const startIndex = 0 // 始终从最新的开始
      const endIndex = Math.min(this.currentPage * this.commentsPerPage, this.comments.length)
      return this.comments.slice(startIndex, endIndex)
    }
  },
  // 组件挂载时设置滚动位置
  mounted() {
    // 页面加载后展开锦卷动画
    setTimeout(() => {
      this.isUnfolded = true
    }, 100)
    
    // 加载localStorage中的留言数据
    this.loadComments()
    
    // 添加背景云雾动画
    this.setupCloudAnimation()
    
    // 确保页面滚动到顶部
    window.scrollTo({ top: 0, behavior: 'auto' })
  },
  // 组件离开时清理可能导致多余渲染的状态
  beforeUnmount() {
    // 移除背景云雾元素
    const clouds = document.querySelector('.clouds')
    if (clouds) {
      clouds.innerHTML = ''
    }
    // 重置动画状态
    this.isUnfolded = false
    // 重置滚动位置
    window.scrollTo({ top: 0, behavior: 'auto' })
  },

  methods: {
    // 加载留言数据
    loadComments() {
      try {
        const savedComments = localStorage.getItem('scrollComments')
        if (savedComments) {
          this.comments = JSON.parse(savedComments)
        }
      } catch (error) {
        console.error('加载留言失败:', error)
        this.comments = []
      }
    },
    
    // 保存留言数据到localStorage
    saveComments() {
      try {
        localStorage.setItem('scrollComments', JSON.stringify(this.comments))
      } catch (error) {
        console.error('保存留言失败:', error)
      }
    },
    
    // 提交新留言
    submitComment() {
      if (!this.canSubmit) return
      
      const comment = {
        author: this.newComment.author.trim() || '匿名',
        content: this.newComment.content.trim(),
        date: new Date().toISOString()
      }
      
      // 添加到留言列表顶部（最新的在上面）
      this.comments.unshift(comment)
      
      // 清空输入框
      this.newComment = {
        author: '',
        content: ''
      }
      
      // 保存到localStorage
      this.saveComments()
      
      // 重置到第一页以显示最新留言
      this.currentPage = 1
      
      // 滚动到新添加的留言
      setTimeout(() => {
        const firstComment = document.querySelector('.comment-item')
        if (firstComment) {
          firstComment.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    },
    
    // 格式化日期显示
    formatDate(dateString) {
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      return `${year}-${month}-${day} ${hours}:${minutes}`
    },
    
    // 设置背景云雾动画
    setupCloudAnimation() {
      const clouds = document.querySelector('.clouds')
      if (clouds) {
        // 创建多个云雾元素
        for (let i = 0; i < 6; i++) {
          const cloud = document.createElement('div')
          cloud.className = 'absolute bg-white/10 blur-3xl rounded-full'
          
          // 随机位置和大小
          const size = 200 + Math.random() * 300
          const x = Math.random() * 100
          const y = Math.random() * 100
          const duration = 60 + Math.random() * 120
          const delay = Math.random() * 30
          
          cloud.style.width = `${size}px`
          cloud.style.height = `${size}px`
          cloud.style.left = `${x}vw`
          cloud.style.top = `${y}vh`
          cloud.style.animation = `cloudFloat ${duration}s linear ${delay}s infinite`
          
          clouds.appendChild(cloud)
        }
      }
    }
  }
}
</script>

<style scoped>
/* 字体定义 */
@font-face {
  font-family: 'Elegant';
  src: url('/public/HYYanRuiMinKaiShuS.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

/* 根样式 */
.comment-view {
  font-family: 'Elegant', 'SimSun', serif;
  background-color: #fff8e6;
}

/* 锦卷展开动画 */
.scroll-container {
  max-height: 0;
  opacity: 0;
  transform: scaleY(0.1);
  position: relative; /* 确保z-index生效 */
}

.scroll-container.unfolded {
  max-height: 3000px;
  opacity: 1;
  transform: scaleY(1);
}

/* 分页样式 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination button:not(:disabled) {
  cursor: pointer;
}

/* 修复可能导致多余渲染的样式 */
.comment-view {
  position: relative;
  z-index: 1;
}

.clouds {
  z-index: 0;
}

/* 发光效果 */
.glow-effect {
  text-shadow: 
    0 0 5px rgba(251, 191, 36, 0.5),
    0 0 10px rgba(251, 191, 36, 0.3),
    0 0 15px rgba(251, 191, 36, 0.2);
}

/* 浮动动画 */
.float-animation {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* 云纹输入框 */
.cloud-pattern-input {
  position: relative;
  overflow: hidden;
}

.cloud-pattern-input::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><path d="M30,40 Q50,20 70,40 T110,40" stroke="rgba(217, 119, 6, 0.1)" fill="none" stroke-width="2"/></svg>') repeat;
  opacity: 0.3;
  z-index: -1;
}

/* 锦线分隔 */
.gold-thread {
  height: 1px;
  background: linear-gradient(90deg, 
    transparent,
    rgba(217, 119, 6, 0.3),
    rgba(217, 119, 6, 0.6),
    rgba(217, 119, 6, 0.3),
    transparent
  );
  position: relative;
}

.gold-thread::before {
  content: '❧';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 248, 230, 0.8);
  padding: 0 10px;
  color: rgba(217, 119, 6, 0.7);
  font-size: 16px;
}

/* 留言渐入动画 */
.animate-fade-in {
  animation: fadeInUp 0.8s ease-out forwards;
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

/* 云雾动画 */
@keyframes cloudFloat {
  0% {
    transform: translate(-100%, 0) rotate(0deg);
  }
  100% {
    transform: translate(200vw, 0) rotate(360deg);
  }
}

/* 自定义颜色 */
.cream-100 {
  background-color: #fff8e6;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .scroll-content {
    background-size: cover;
    background-position: center;
  }
  
  h1 {
    font-size: 3rem !important;
  }
  
  .input-section,
  .comments-section {
    padding: 4px !important;
  }
  
  .cloud-pattern-input {
    padding: 2px !important;
  }
}
</style>