<template>
    <div>
        <n-card>
            {{ evaluation.titleCN }}
        </n-card>
    </div>
</template>

<script setup lang="ts">

const evaluation = ref<Evaluation>({
    id: 0,
    gameNameCN: '',
    gameName: '',
    gameType: '',
    gameIntro: '',
    mark: {
        baseScore: [],
        typeWeight: [],
        finalScore: 0,
        ratingName: ''
    }
})

const route = useRoute()
const message = useMessage()

const evaluationId = Number(route.params.id)

// 判断：如果不是有效数字 → 退回上一页
if (isNaN(evaluationId) || evaluationId <= 0) {
    message.error('评测ID无效')
    await navigateTo('/evaluation/list')
}

</script>

<style lang="scss" scoped></style>