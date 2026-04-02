<template>
  <div class="min-h-screen bg-page text-body font-sans selection:bg-highlight selection:text-white overflow-x-hidden">
    <!-- 背景装饰图形 -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <div
        class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-mauve opacity-10 rounded-full blur-[120px] animate-pulse">
      </div>
      <div
        class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-taupe opacity-10 rounded-full blur-[150px] animate-pulse-slow">
      </div>
      <div class="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-highlight opacity-5 rounded-full blur-[100px] ">
      </div>
    </div>

    <!-- 导航栏 -->
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      :class="{ 'bg-page/70 backdrop-blur-md shadow-sm py-3': isScrolled, 'py-6': !isScrolled }">
      <div class="container mx-auto px-6 flex justify-between items-center">
        <div class="text-2xl font-bold text-title tracking-tight group cursor-pointer">
          <span class="text-highlight">L</span>icne<span class="text-highlight">.</span>
        </div>

        <!-- 桌面端导航 -->
        <div class="hidden md:flex items-center space-x-8">
          <a v-for="item in navLinks" :key="item.name" :href="item.href" @click="handleMsg('')"
            class="text-sm font-medium text-body hover:text-highlight transition-colors relative group">
            {{ item.name }}
            <span
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-full"></span>
          </a>
          <button @click="handleMsg('')"
            class="px-5 py-2 bg-btn-primary hover:bg-btn-primary-hover text-white text-sm font-medium rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm">
            开始探索
          </button>
        </div>

        <!-- 移动端菜单按钮 -->
        <button @click="isMenuOpen = !isMenuOpen;" class="md:hidden text-title p-2">
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- 移动端导航菜单 -->
      <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-4">
        <div v-if="isMenuOpen" class="md:hidden bg-page border-b border-block px-6 py-4 space-y-4 shadow-lg">
          <a v-for="item in navLinks" :key="item.name" :href="item.href" @click="isMenuOpen = false; handleMsg('')"
            class="block text-base font-medium text-body hover:text-highlight transition-colors">
            {{ item.name }}
          </a>
          <button @click="handleMsg('')" class="w-full py-3 bg-btn-primary text-white font-medium rounded-xl">
            开始探索
          </button>
        </div>
      </transition>
    </nav>

    <!-- 主体内容 -->
    <main class="relative z-10">
      <!-- Hero 区域 -->
      <section id="home" class="min-h-screen flex items-center pt-20">
        <div class="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div class="space-y-8">
            <!-- 建议将这里的 bg-highlight bg-opacity-10 改为： -->
            <div
              class="inline-flex items-center px-3 py-1 rounded-full text-highlight text-xs font-semibold tracking-wider uppercase animate-fade-in"
              style="background-color: color-mix(in srgb, var(--color-highlight), transparent 90%)">
              ✨ Welcome to my creative space
            </div>
            <h1 class="text-5xl md:text-7xl font-black text-title leading-tight animate-slide-up">
              Licne<span class="text-highlight">の</span>小站
            </h1>
            <p class="text-xl md:text-2xl text-desc max-w-lg leading-relaxed animate-slide-up-delayed">
              <!-- 探索数字艺术与代码的交界。在这里，我们构建简洁、优雅且富有生命力的互联网体验。 -->
              其实这个页面什么功能都没有，因为没开放，也没开发。
            </p>
            <div class="flex flex-wrap gap-4 animate-slide-up-more">
              <button @click="handleMsg('')"
                class="px-8 py-4 bg-btn-primary hover:bg-btn-primary-hover text-white font-bold rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:scale-95">
                查看作品集
              </button>
              <button @click="handleMsg('敲代码的牛马')"
                class="px-8 py-4 bg-white border-2 border-block text-title hover:border-highlight border-opacity-100 hover:border-opacity-30 font-bold rounded-2xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95">
                关于我
              </button>
            </div>

            <!-- 社交媒体/统计简报 -->
            <div class="pt-8 flex items-center space-x-8 animate-fade-in-delayed">
              <div class="text-center">
                <div class="text-2xl font-bold text-title">0+</div>
                <div class="text-xs text-desc uppercase tracking-widest">项目完成</div>
              </div>
              <div class="h-8 w-px bg-block"></div>
              <div class="text-center">
                <div class="text-2xl font-bold text-title">0年</div>
                <div class="text-xs text-desc uppercase tracking-widest">开发经验</div>
              </div>
              <div class="h-8 w-px bg-block"></div>
              <div class="text-center">
                <div class="text-2xl font-bold text-title">0%</div>
                <div class="text-xs text-desc uppercase tracking-widest">专注设计</div>
              </div>
            </div>
          </div>

          <!-- 右侧装饰/插图 -->
          <div class="hidden md:block relative animate-float">
            <div class="relative z-10 w-full aspect-square bg-card rounded-[3rem] shadow-2xl overflow-hidden group">
              <div class="absolute inset-0 bg-gradient-to-tr from-highlight to-transparent opacity-10"></div>
              <div class="flex items-center justify-center h-full">
                <!-- 抽象图片 -->
                <img src="https://api.yppp.net/pc.php" alt="Abstract Art" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
              </div>
              <!-- 卡片装饰 -->
              <div
                class="absolute bottom-8 left-8 right-8 p-6 backdrop-blur-2xl rounded-2xl shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 rounded-full bg-highlight flex items-center justify-center text-white text-xl">
                    🎨
                  </div>
                  <div>
                    <h4 class="font-bold text-title">最近更新</h4>
                    <p class="text-sm text-block">赛博奴隶主,狠狠奴役AI v1.0</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- 背景浮动元素 -->
            <div class="absolute -top-12 -right-12 w-32 h-32 bg-mauve opacity-20 rounded-full blur-2xl"></div>
            <div class="absolute -bottom-8 -left-8 w-24 h-24 bg-taupe opacity-20 rounded-full blur-xl"></div>
          </div>
        </div>
      </section>

      <!-- 简介/关于部分 -->
      <section id="about" class="py-24 bg-block/30">
        <div class="container mx-auto px-6">
          <div class="max-w-4xl mx-auto text-center space-y-6">
            <h2 class="text-4xl font-black text-title">追求极致的简洁</h2>
            <p class="text-lg text-body leading-relaxed">
              我们相信少即是多。通过精心的排版、考究的配色以及流畅的交互，为用户创造无负担的浏览体验。
              每一个像素的移动，每一处色彩的明暗，都经过深思熟虑。
            </p>
          </div>
        </div>
      </section>

      <!-- 作品卡片展示 -->
      <section id="works" class="py-24">
        <div class="container mx-auto px-6">
          <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 class="text-4xl font-black text-title mb-4">精选作品</h2>
              <p class="text-desc">探索我在设计与技术融合方面的尝试</p>
            </div>
            <a href="#" class="text-highlight font-bold flex items-center group">
              查看全部
              <svg xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <div v-for="(work, index) in works" :key="index"
              class="group bg-card hover:bg-card-active p-8 rounded-[2.5rem] transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-block border-opacity-50">
              <div class="text-4xl mb-6">{{ work.icon }}</div>
              <h3 class="text-xl font-bold text-title mb-3 group-hover:text-highlight transition-colors">{{ work.title
              }}</h3>
              <p class="text-desc text-sm leading-relaxed mb-6">{{ work.desc }}</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="tag in work.tags" :key="tag"
                  class="px-3 py-1 bg-white/50 text-[10px] font-bold text-desc uppercase rounded-full">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 联系/页脚预留 -->
      <section id="contact" class="py-24 bg-title text-white rounded-t-[4rem]">
        <div class="container mx-auto px-6 text-center space-y-12">
          <h2 class="text-5xl font-black">准备好开始了吗？</h2>
          <p class="text-white text-opacity-60 text-xl max-w-2xl mx-auto">
            无论你是有新的项目想法，还是仅仅想打个招呼，我随时欢迎交流。
          </p>
          <div class="flex justify-center gap-6">
            <button @click="handleMsg('假装发送邮件')"
              class="px-10 py-5 bg-highlight hover:bg-highlight hover:opacity-90 text-white font-black rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
              发送邮件
            </button>
          </div>

          <div
            class="pt-24 border-t border-white border-opacity-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div class="text-xl font-bold tracking-tight">
              Licne<span class="text-highlight">.</span>
            </div>
            <div class="flex space-x-8 text-sm text-white text-opacity-40 font-medium">
              <a href="#" class="hover:text-white transition-colors">GitHub</a>
              <a href="#" class="hover:text-white transition-colors">Twitter</a>
              <a href="#" class="hover:text-white transition-colors">Dribbble</a>
            </div>
            <div class="text-sm text-white text-opacity-40">
              &copy; 2026 Licne. All rights reserved.
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const message = useMessage()

const handleMsg = (msg?: string) => {
  if (msg && msg !== ' ') {
    message.success(msg)
  } else {
    message.success('敬请期待')
  }
}

// 导航链接
const navLinks = [
  { name: '首页', href: '' },
  { name: '主题', href: '/theme' },
  { name: '作品', href: '' },
  { name: '联系', href: '' },
]

// 作品数据
const works = [
  {
    title: 'Minimalist Blog (Coming Soon)',
    desc: '一个注重阅读体验的极简博客主题，基于 Nuxt3 和 Tailwind 构建。',
    icon: '📚',
    tags: ['Next.js', 'Tailwind', 'Design']
  },
  {
    title: 'UI Components (Limited Skill)',
    desc: '一套现代化的 UI 组件库，专注于流畅的交互动画和无障碍访问。',
    icon: '🧩',
    tags: ['Vue3', 'SCSS', 'Library']
  },
  {
    title: 'Mobile App Concept (Poor Health)',
    desc: '专注于健康管理的移动应用概念设计，采用柔和的色调。',
    icon: '📱',
    tags: ['Figma', 'UX Research', 'iOS']
  }
]

// 状态管理
const isScrolled = ref(false)
const isMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-20px);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-slide-up-delayed {
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
  opacity: 0;
}

.animate-slide-up-more {
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
  opacity: 0;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.animate-fade-in-delayed {
  animation: fadeIn 1s ease-out 0.4s forwards;
  opacity: 0;
}

.animate-pulse-slow {
  animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-ping-slow {
  animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-spin-slow {
  animation: spin 12s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {

  0%,
  100% {
    opacity: 0.1;
  }

  50% {
    opacity: 0.2;
  }
}

@keyframes ping {

  75%,
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

// 隐藏滚动条但保留功能 (可选)
/*
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--btn-primary);
  border-radius: 10px;
}
*/
</style>