// 游戏评价数据
// 游戏id 格式：[年份2位][游戏类型1位][游戏评分版本2位][序号4位]
// 已知类型 11 SLG
const evaluationData : Evaluation[] = [
    {
        id: '26h110001',
        gameNameCN: '游戏1',
        gameName: 'Game1',
        gameType: 'SLG',
        gameIntro: '这是一款SLG游戏',
        mark: {
            baseScore: [
                {
                    idx: 0,
                    dimension: '视听',
                    score: 80,
                    tag: ['好'],
                    correction: 0.5,
                },
                {
                    idx: 1,
                    dimension: '实用',
                    score: 80,
                    tag: ['好'],
                    correction: 0.5,
                },
                {
                    idx: 2,
                    dimension: '剧情',
                    score: 80,
                    tag: ['好'],
                    correction: 0.5,
                },
                {
                    idx: 3,
                    dimension: '游戏',
                    score: 80,
                    tag: ['好'],
                    correction: 0.5,
                },
                {
                    idx: 4,
                    dimension: '沉浸',
                    score: 80,
                    tag: ['好'],
                    correction: 0.5,
                },
            ],
            typeWeight: [0.2, 0.2, 0.2, 0.2, 0.2],
            finalScore: 80,
            ratingName: 'A',
        }
    },
]

// 根据id获取游戏评价
export function getEvaluationById(id: string) {
    return evaluationData.find((item) => item.id === id);
}

// 获取所有游戏评价 不包含Mark
export function getAllEvaluationWithoutMark() {
    return evaluationData.map((item) => ({
        ...item,
        mark: undefined,
    }));
}