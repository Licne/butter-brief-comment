<template>
  <div class="p-8 min-h-screen bg-page">
    <div class="max-w-7xl mx-auto">
      <div class="mb-10 text-center">
        <h1 class="text-4xl font-bold text-title mb-4">色卡 (Color Palette)</h1>
        <p class="text-desc">点击色块可快速复制颜色值</p>
      </div>

      <div v-for="(group, groupName) in colorGroups" :key="groupName" class="mb-12">
        <h2 class="text-2xl font-semibold text-title mb-6 border-l-4 border-btn-primary pl-4">
          {{ groupName }}
        </h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <div 
            v-for="color in group" 
            :key="color.key"
            class="group cursor-pointer transition-all duration-300 hover:scale-105"
            @click="copyColor(color.value)"
          >
            <div 
              class="h-24 rounded-t-xl shadow-sm border border-black/5"
              :style="{ backgroundColor: color.value }"
            ></div>
            <div class="bg-card p-4 rounded-b-xl shadow-md border-x border-b border-black/5">
              <div class="flex justify-between items-center mb-1">
                <span class="font-medium text-body text-sm">{{ color.label }}</span>
                <span class="text-xs text-desc font-mono opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
              </div>
              <div class="text-xs text-desc font-mono truncate">{{ color.value }}</div>
              <div class="mt-2 text-[10px] text-desc opacity-60 font-mono">{{ color.twClass }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const message = useMessage()

interface ColorItem {
  key: string
  label: string
  value: string
  twClass: string
}

const colorGroups: Record<string, ColorItem[]> = {
  '背景 (Background)': [
    { key: 'page', label: '页面背景', value: 'var(--bg-page)', twClass: 'bg-page' },
    { key: 'block', label: '区块背景', value: 'var(--bg-block)', twClass: 'bg-block' },
    { key: 'card', label: '卡片背景', value: 'var(--bg-card)', twClass: 'bg-card' },
    { key: 'card-active', label: '激活卡片', value: 'var(--bg-card-active)', twClass: 'bg-card-active' },
  ],
  '按钮 (Buttons)': [
    { key: 'btn-primary', label: '主要按钮', value: 'var(--btn-primary)', twClass: 'bg-btn-primary' },
    { key: 'btn-primary-hover', label: '主要按钮悬浮', value: 'var(--btn-primary-hover)', twClass: 'bg-btn-primary-hover' },
    { key: 'btn-secondary', label: '次要按钮', value: 'var(--btn-secondary)', twClass: 'bg-btn-secondary' },
  ],
  '文字 (Typography)': [
    { key: 'title', label: '标题文字', value: 'var(--text-title)', twClass: 'text-title' },
    { key: 'body', label: '正文文字', value: 'var(--text-body)', twClass: 'text-body' },
    { key: 'desc', label: '描述文字', value: 'var(--text-desc)', twClass: 'text-desc' },
    { key: 'white', label: '白色文字', value: 'var(--text-white)', twClass: 'text-white' },
  ],
  '强调 (Accent)': [
    { key: 'highlight', label: '高亮色', value: 'var(--color-highlight)', twClass: 'bg-highlight' },
    { key: 'mauve', label: '锦葵紫', value: 'var(--color-mauve)', twClass: 'bg-mauve' },
    { key: 'taupe', label: '灰褐色', value: 'var(--color-taupe)', twClass: 'bg-taupe' },
  ],
  '状态 (Status)': [
    { key: 'success', label: '成功', value: 'var(--color-success)', twClass: 'bg-success' },
    { key: 'warn', label: '警告', value: 'var(--color-warn)', twClass: 'bg-warn' },
    { key: 'danger', label: '危险', value: 'var(--color-danger)', twClass: 'bg-danger' },
  ],
  '图表 (Charts)': [
    { key: 'chart-grid', label: '图表网格', value: 'var(--chart-grid)', twClass: 'bg-chart-grid' },
    { key: 'chart-tooltip', label: '图表提示', value: 'var(--chart-tooltip)', twClass: 'bg-chart-tooltip' },
    { key: 'echart-1', label: '图表 1', value: 'var(--echart-1)', twClass: 'bg-echart-1' },
    { key: 'echart-2', label: '图表 2', value: 'var(--echart-2)', twClass: 'bg-echart-2' },
    { key: 'echart-3', label: '图表 3', value: 'var(--echart-3)', twClass: 'bg-echart-3' },
    { key: 'echart-4', label: '图表 4', value: 'var(--echart-4)', twClass: 'bg-echart-4' },
    { key: 'echart-5', label: '图表 5', value: 'var(--echart-5)', twClass: 'bg-echart-5' },
  ]
}

function copyColor(value: string) {
  // 获取 CSS 变量的值
  const variableName = value.replace('var(', '').replace(')', '')
  const computedValue = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim()
  
  const textToCopy = computedValue || value
  if (navigator.clipboard) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      message.success(`已复制颜色值: ${textToCopy}`)    
    }).catch(() => {
      message.error('复制失败')
    })
  } else {
    // 降级处理
    const input = document.createElement('input')
    input.value = textToCopy
    document.body.appendChild(input)
    input.select()
    try {
      document.execCommand('copy')
      message.success(`已复制颜色值: ${textToCopy}`)
    } catch (err) {
      message.error('复制失败')
    }
    document.body.removeChild(input)
  }
}
</script>


<style scoped>
.bg-page {
  background-color: var(--bg-page);
}
</style>