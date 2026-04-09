<template>
    <div>
        <n-card>
            {{ evaluation?.gameNameCN }}
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { getEvaluationById } from '~/utils/mockEvaluation'

const evaluation = ref<Evaluation>()

const route = useRoute()
const message = useMessage()
const evaluationId = route.params.id as string

// 从mockEvaluation中获取对应ID的评价
evaluation.value = getEvaluationById(evaluationId.toString())
// 判断：如果未找到对应ID的评价 → 退回上一页
if (!evaluation.value) {
    message.error('评测不存在')
    await navigateTo('/evaluation/list')
}
</script>

<style lang="scss" scoped></style>