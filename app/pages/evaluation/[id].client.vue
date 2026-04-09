<template>
  <div class="min-h-screen bg-page text-body font-sans p-6 md:p-6 overflow-x-hidden">
    <div v-if="evaluation" class="max-w-7xl mx-auto space-y-6 " >
      <!-- 1. 游戏基础信息 & 雷达图 -->
      <section class="grid md:grid-cols-12 gap-12 items-start">
        <!-- 基础信息 -->
        <div class="md:col-span-8 flex flex-col gap-8 items-start">
          <!-- 封面图占位符 -->
          <div class="md:col-span-7 flex flex-col md:flex-row gap-8 items-start">
            <div class="w-48 h-64 bg-block rounded-2xl flex-shrink-0 overflow-hidden relative group">
              <div class="absolute inset-0 bg-gradient-to-tr from-highlight/20 to-transparent"></div>
              <div class="w-full h-full flex items-center justify-center text-desc font-bold text-sm">
                COVER IMAGE
              </div>
            </div>
            <div class="space-y-4 flex-grow pt-4">
              <div
                class="inline-block px-3 py-1 bg-highlight text-white text-xs font-bold rounded-full uppercase tracking-widest">
                {{ evaluation.gameType || 'GAME' }}
              </div>
              <h1 class="text-1xl md:text-4xl font-black text-title leading-tight">
                {{ evaluation.gameNameCN }}
              </h1>
              <h2 class="text-xl text-desc">{{ evaluation.gameName }}</h2>

              <!-- 总分展示 -->
              <div class="pt-4 flex items-end gap-4">
                <div class="text-6xl font-black text-highlight leading-none">
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
            </div>
          </div>
          <div class="w-full">
            <p class="text-[10px] text-desc font-bold uppercase tracking-widest w-full h-20 bg-block p-2 rounded-md">
              {{ evaluation.gameIntro || '暂无游戏介绍' }}
            </p>
          </div>
        </div>
        <!-- 雷达图展示区域 -->
        <div class="md:col-span-4 bg-card bg-opacity-70 backdrop-blur-md p-6 rounded-[2.5rem]  border border-block">
          <h3 class="text-center font-bold text-title mb-4 tracking-widest uppercase text-sm">维度评分雷达图</h3>
          <div ref="radarChartRef" class="w-full h-72"></div>
        </div>
      </section>
      <!-- 3. 五个维度的详细评分卡片 -->
      <section class="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div v-for="(dim, idx) in evaluation.mark?.baseScore" :key="idx"
          class="bg-white p-6 rounded-[2rem] border border-block group hover:-translate-y-2 transition-all duration-300">
          <div class="flex justify-between items-start mb-4">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-inner"
              :style="{ backgroundColor: `${getDimensionColor(idx)}20`, color: getDimensionColor(idx) }">
              {{ getDimensionIcon(idx) }}
            </div>
            <div class="text-2xl font-black" :style="{ color: getDimensionColor(idx) }">
              {{ dim.score }}
            </div>
          </div>
          <h4 class="font-bold text-title mb-1">{{ dim.dimension }}评分</h4>
          <div class="text-[10px] text-desc font-bold uppercase tracking-widest mb-4">
            补正系数: <span class="text-highlight">x{{ dim.correction || 1.0 }}</span>
          </div>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="tag in dim.tag" :key="tag"
              class="px-2 py-1 bg-page text-[10px] text-body rounded-md border border-block group-hover:border-highlight/30 transition-colors">
              {{ tag }}
            </span>
          </div>
        </div>
      </section>
      <!-- 免责声明 -->
      <section class="bg-block/50 rounded-2xl p-3 border border-block">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class=" w-5 h-5 text-warn" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
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

const radarChartRef = ref<HTMLElement | null>(null)
let myChart: echarts.ECharts | null = null

// 维度图标
const getDimensionIcon = (idx: number) => {
  const icons = ['🎵', '🔞', '📖', '🎮', '🎭']
  return icons[idx] || '⭐'
}

// 维度颜色 (从 tailwind 配置中提取或补充)
const getDimensionColor = (idx: number) => {
  const colors = [
    '#B17E87', // highlight
    '#9D8189', // mauve
    '#D3AB9E', // taupe
    '#6B705C', // olive (补充)
    '#A5A58D'  // sage (补充)
  ]
  return colors[idx] || '#2E2E2E'
}

const initRadarChart = () => {
  if (!radarChartRef.value || !evaluation.value?.mark) return

  myChart = echarts.init(radarChartRef.value)

  const indicator = evaluation.value.mark.baseScore.map((dim, idx) => ({
    name: dim.dimension,
    max: 10,
    color: '#2E2E2E'
  }))

  const dataValues = evaluation.value.mark.baseScore.map(dim => dim.score)

  const option = {
    radar: {
      indicator,
      radius: '65%',
      splitNumber: 4,
      axisName: {
        fontWeight: 'bold',
        fontSize: 12,
        fontFamily: 'sans-serif'
      },
      splitLine: {
        lineStyle: {
          color: '#E5E5E5'
        }
      },
      splitArea: {
        areaStyle: {
          color: ['#FFFFFF', '#F8F5F6']
        }
      },
      axisLine: {
        lineStyle: {
          color: '#E5E5E5'
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
            symbolSize: 6,
            itemStyle: {
              color: '#B17E87'
            },
            areaStyle: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                {
                  offset: 0,
                  color: 'rgba(177, 126, 135, 0.2)'
                },
                {
                  offset: 1,
                  color: 'rgba(177, 126, 135, 0.6)'
                }
              ])
            },
            lineStyle: {
              width: 3,
              color: '#B17E87'
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
/* 可以在这里添加一些微调的样式 */
</style>
