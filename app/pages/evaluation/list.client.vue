<template>
    <div class="p-4 m-4">
        <n-card>
            <n-button type="primary" v-for="evaluation in evaluationList" :key="evaluation.id" @click="handleClick(evaluation)">{{ evaluation.titleCN }}</n-button>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const evaluationList = ref<Evaluation[]>([
    {
        id: 26040301,
        titleCN: '评测1',
        titleEN: 'Evaluation 1',
    }
])

const handleClick = (evaluation: Evaluation) => {
    navigateTo(`/evaluation/${evaluation.id}`)
}
</script>

<style lang="scss" scoped>
</style>