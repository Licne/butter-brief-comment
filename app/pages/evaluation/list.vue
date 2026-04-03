<template>
    <div class="p-4 m-4 bg-block">
        <n-card>
            <n-button type="primary">按钮</n-button>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Evaluation {
    id: number
    titleCN: string
    titleEN: string
}

const evaluationList = ref<Evaluation[]>([
    {
        id: 26040301,
        titleCN: '评测1',
        titleEN: 'Evaluation 1',
    }
])

</script>

<style lang="scss" scoped></style>