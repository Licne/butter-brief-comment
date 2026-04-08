export interface BaseScoreDimension {
    // 维度名
    dimension: string
    // 分数
    score: number
    // 打分标签
    tag?: string
    // 补正系数
    correction?: number
}

export interface Mark {
    // 基础分
    baseScore: Array<BaseScoreDimension>
    // 类型权重
    typeWeight: Array<number>
    // 最终分
    finalScore?: number
    // 评级名称
    ratingName?: string
}


export interface Evaluation {
    id: number
    // 游戏名-中文
    gameNameCN: string
    // 游戏名-原名
    gameName: string
    // 游戏类型
    gameType?: string
    // 游戏简评
    gameIntro?: string
    // 分数
    mark?: Mark
}