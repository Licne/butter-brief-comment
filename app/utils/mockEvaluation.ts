// 游戏评价数据
// 游戏id 格式：[年份2位][分数分段][游戏序号][游戏测评版本]
// 已知类型 11 SLG
const evaluationData : Evaluation[] = [
    {   
        id: '2680011',
        gameNameCN: '能干的学妹葵酱！',
        gameName: 'できる後輩アオイちゃん～二人ぐらし始まっちゃいました～',
        gameType: 'SLG',
        gameIntro: '这是一款非常好的美少女SLG游戏',
        mark: {
            baseScore: [
                {
                    idx: 0,
                    dimension: '视听',
                    score: 8,
                    tag: ['素材精致','全优质配音','UI精良','风格舒适'],
                    correction: 1.1,
                },
                {
                    idx: 1,
                    dimension: '实用',
                    score: 7.5,
                    tag: ['3D','动态CG','独立CV配音','操作互动较好','多样CG形式'],
                    correction: 1.1,
                },
                {
                    idx: 2,
                    dimension: '剧情',
                    score: 7,
                    tag: ['舒适流畅','优秀人物塑造','较好纯爱描写'],
                    correction: 1,
                },
                {
                    idx: 3,
                    dimension: '游戏',
                    score: 7.5,
                    tag: ['较有趣核心玩法','流畅操作手感','合理游戏节奏','充足游戏深度','良好的自由度'],
                    correction: 1,
                },
                {
                    idx: 4,
                    dimension: '沉浸',
                    score: 9.5,
                    tag: ['丰富的台词大文本','全优质配音','生动表情动作','惊喜的人物逻辑','真实的人物塑造','生活感氛围'],
                    correction: 1,
                },
            ],
            typeWeight: [0.25, 0.3, 0.1, 0.15, 0.2],
            finalScore: 8.4,
            ratingName: ['A','卓越'],
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