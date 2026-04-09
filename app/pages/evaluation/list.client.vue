<template>
    <div class="p-4 m-4">
        <n-card>
            <n-space vertical>
                <n-button v-for="evaluation in evaluationList" :key="evaluation.id" @click="handleClick(evaluation)" type="primary">{{ evaluation.gameNameCN }}</n-button>
            </n-space>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllEvaluationWithoutMark } from '~/utils/mockEvaluation'

const evaluationList = ref<Evaluation[]>([])


onMounted(() => {
    evaluationList.value = getAllEvaluationWithoutMark()
})

const handleClick = (evaluation: Evaluation) => {
    navigateTo(`/evaluation/${evaluation.id}`)
}
</script>

<style lang="scss" scoped>
</style>