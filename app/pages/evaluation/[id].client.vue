<template>
  <div class="min-h-screen bg-page text-body font-sans p-6 md:p-6 overflow-x-hidden">
    <div v-if="evaluation" class="max-w-7xl mx-auto space-y-6 ">
      <!-- 1. 游戏基础信息 & 雷达图 -->
      <section class="grid md:grid-cols-12 gap-12 items-start">
        <!-- 基础信息 -->
        <div class="md:col-span-8 flex flex-col gap-8 items-start">
          <!-- 封面图 -->
          <div class="md:col-span-7 flex flex-col md:flex-row gap-8 items-start">
            <div class="w-48 h-64 bg-block rounded-2xl flex-shrink-0 overflow-hidden relative group animate-in-scale shadow-xl">
              <img :src="`/assets/cover/${route.params.id}.png`" :alt="evaluation.gameNameCN"
                class="w-full h-full object-cover object-left" @error="(e) => (e.target as HTMLImageElement).style.display = 'none'" />
              <div class="absolute inset-0 bg-gradient-to-tr from-highlight/20 to-transparent"></div>
              <div class="w-full h-full flex items-center justify-center text-desc font-bold text-sm">
                COVER IMAGE
              </div>
            </div>
            <div class="space-y-4 flex-grow pt-4 animate-in-slide-up delay-100">
              <div
                class="inline-block px-3 py-1 bg-highlight text-white text-xs font-bold rounded-full uppercase tracking-widest">
                {{ evaluation.gameType || 'GAME' }}
              </div>
              <h1 class="text-1xl md:text-4xl font-black text-title leading-tight">
                {{ evaluation.gameNameCN }}
              </h1>
              <h2 class="text-xl text-desc">{{ evaluation.gameName }}</h2>

              <!-- 总分展示 & 操作按钮 -->
              <div class="pt-4 flex items-end justify-between gap-4">
                <div class="flex items-end gap-4">
                  <div class="text-6xl font-black leading-none"
                    :style="{ color: getDimensionColor(evaluation.mark?.finalScore || 0) }">
                    {{ evaluation.mark?.finalScore?.toFixed(1) }}
                  </div>
                  <div class="pb-1">
                    <div class="text-[10px] font-bold text-desc uppercase tracking-widest">TOTAL SCORE</div>
                    <div v-if="evaluation.mark?.ratingName" class="flex gap-2 mt-1">
                      <span v-for="tag in evaluation.mark.ratingName" :key="tag"
                        class="px-2 py-0.5 bg-btn-primaryhover text-white text-[16px] font-bold rounded">
                        {{ tag }}
                      </span>
                    </div>
                  </div>
                </div>

                <div v-if="downLoadVerify" class="pb-1">
                  <button
                    class="px-6 py-2 bg-highlight text-white text-sm font-bold rounded-full hover:bg-highlight/90 transition-all shadow-lg shadow-highlight/20 flex items-center gap-2 group active:scale-95">
                    <span>获取资源</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 group-hover:translate-y-0.5 transition-transform"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full animate-in-slide-up delay-200">
            <p class="text-sm text-desc font-medium uppercase tracking-widest w-full h-20 bg-block p-2 rounded-md">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ evaluation.gameIntro || '暂无游戏介绍' }}
            </p>
          </div>
        </div>
        <!-- 雷达图展示区域 -->
        <div class="md:col-span-4 bg-card bg-opacity-70 backdrop-blur-md p-6 rounded-[2.5rem] border border-block animate-in-fade delay-300">
          <h3 class="text-center font-bold text-title mb-4 tracking-widest uppercase text-sm">维度评分雷达图</h3>
          <div ref="radarChartRef" class="w-full h-72"></div>
        </div>
      </section>
      <!-- 3. 五个维度的详细评分卡片 -->
      <section class="grid grid-cols-1 md:grid-cols-5 gap-6 min-h-[calc(100vh-540px)]">
        <div v-for="(dim, idx) in evaluation.mark?.baseScore" :key="idx"
          :class="`animate-in-slide-up delay-${(idx + 4) * 100}`">
          <div
            class="bg-white p-6 rounded-[2rem] border border-block group hover:-translate-y-2 transition-all duration-300 h-full">
            <div class="flex justify-between items-start mb-4">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-inner bg-page">
                {{ getDimensionIcon(idx) }}
              </div>
              <div class="text-2xl font-black" :style="{ color: getDimensionColor(dim.score) }">
                {{ dim.score }}
              </div>
            </div>
            <h4 class="font-bold text-title mb-1">{{ dim.dimension }}评分</h4>
            <div class="text-[10px] text-desc font-bold uppercase tracking-widest mb-4">
              <!-- 主观补正: <span class="text-highlight">x{{ dim.correction || 1.0 }}</span> -->
            </div>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="tag in dim.tag" :key="tag"
                class="px-2 py-1 bg-[#E6E8E6] text-[#687472] text-[12px] rounded-md border border-[#D4D8D5] group-hover:border-[#AAB5AF] transition-colors">
                {{ tag }}
              </span>
              <!-- 备用红色: bg-[#E8E5E5] text-[#857072] border-[#D6D2D2] hover:border-[#BAB5B5] -->
            </div>
          </div>
        </div>
      </section>
      <!-- 免责声明 -->
      <section class="bg-block/50 rounded-2xl p-3 border border-block animate-in-fade delay-700">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class=" w-5 h-5 text-warn" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <!-- <h4 class="text-sm font-black text-title mb-2">免责声明</h4> -->
            <p class="text-xs/3 text-desc leading-relaxed ">
              本页面所展示的评分及评价仅为个人观点，结果受主观因素影响较大。此类游戏品质与体验因人而异，请尊重他人喜好，结合自身独立判断。
            </p>
          </div>
        </div>
      </section>
    </div>
    <!-- 未找到数据状态 -->
    <div v-else class="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
      <div class="text-9xl opacity-10 font-black">404</div>
      <p class="text-xl text-desc">未找到相关评价数据</p>
      <NuxtLink to="/" class="px-8 py-3 bg-btn-primary text-white font-bold rounded-full">返回首页</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { getEvaluationById } from '~/utils/mockEvaluation'

const route = useRoute()
const evaluation = ref(getEvaluationById(route.params.id as string))
const downLoadVerify = ref(false)

const radarChartRef = ref<HTMLElement | null>(null)
let myChart: echarts.ECharts | null = null

// 维度图标
const getDimensionIcon = (idx: number) => {
  const icons = ['🖼️', '🔞', '📖', '🎮', '🎬']
  return icons[idx] || '⭐'
}

// 维度颜色 (从 tailwind 配置中提取或补充)
const getDimensionColor = (score: number) => {
  const scoreColors = [
    '#CBD5E1',  // 1分：冷淡灰（表现欠佳）
    '#B0BCCB',  // 2分：中性蓝灰
    '#94A3B8',  // 3分：深蓝灰（乏味/较低）
    '#B9ABAC',  // 4分：灰粉色（过渡区间）
    '#D4B4B9',  // 5分（中间色）
    '#CA9CA3',  // 6分
    '#BF838B',  // 7分
    '#B46A74',  // 8分
    '#A8505C',  // 9分
    '#993D4A'   // 10分（深浓红）
  ]
  const idx = Math.max(0, Math.min(Math.floor(score - 1), 9))
  return scoreColors[idx] || '#B17E87'
}

const initRadarChart = () => {
  if (!radarChartRef.value || !evaluation.value?.mark) return

  myChart = echarts.init(radarChartRef.value)

  const richStyles: any = {}
  const indicator = evaluation.value.mark.baseScore.map((dim, idx) => {
    const styleKey = `score_${idx}`
    richStyles[styleKey] = {
      color: getDimensionColor(dim.score),
      fontSize: 14,
      fontWeight: '900',
      align: 'center'
    }
    return {
      name: `${dim.dimension}\n{${styleKey}|${dim.score.toFixed(1)}}`,
      max: 10
    }
  })

  const dataValues = evaluation.value.mark.baseScore.map(dim => dim.score)

  const option = {
    radar: {
      indicator,
      radius: '65%',
      splitNumber: 5,
      axisName: {
        fontWeight: 'bold',
        fontSize: 11,
        fontFamily: 'sans-serif',
        color: '#554C4F',
        lineHeight: 18,
        rich: richStyles
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(229, 220, 224, 0.8)',
          width: 1
        }
      },
      splitArea: {
        areaStyle: {
          color: ['#FFFFFF', '#FDFBFC']
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(229, 220, 224, 0.5)'
        }
      }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: dataValues,
            name: '评分',
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              color: '#B17E87',
              borderColor: '#fff',
              borderWidth: 2,
              shadowBlur: 5,
              shadowColor: 'rgba(0,0,0,0.1)'
            },
            areaStyle: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                {
                  offset: 0,
                  color: 'rgba(177, 126, 135, 0.1)'
                },
                {
                  offset: 1,
                  color: 'rgba(177, 126, 135, 0.4)'
                }
              ])
            },
            lineStyle: {
              width: 4,
              color: '#B17E87',
              shadowBlur: 10,
              shadowColor: 'rgba(177, 126, 135, 0.3)',
              shadowOffsetY: 4
            }
          }
        ]
      }
    ]
  }

  myChart.setOption(option)
}

const handleResize = () => {
  myChart?.resize()
}

onMounted(async () => {
  await nextTick()
  initRadarChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  myChart?.dispose()
})
</script>

<style scoped>
/* 进入动效 */
.animate-in-fade {
  animation: fadeIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.animate-in-slide-up {
  opacity: 0;
  animation: slideUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.animate-in-scale {
  opacity: 0;
  transform: scale(0.9);
  animation: scaleIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* 持续微动效 */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-soft-pulse {
  animation: softPulse 4s ease-in-out infinite;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes softPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.95; transform: scale(1.01); }
}

/* 阶梯延迟 */
.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
.delay-500 { animation-delay: 500ms; }
.delay-600 { animation-delay: 600ms; }
.delay-700 { animation-delay: 700ms; }
.delay-800 { animation-delay: 800ms; }
.delay-900 { animation-delay: 900ms; }
</style>
