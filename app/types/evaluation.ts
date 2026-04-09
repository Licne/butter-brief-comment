export interface BaseScoreDimension {
    idx: number
    // 维度名
    dimension: string
    // 分数 (0-10)
    score: number
    // 打分标签 (该维度的打分标签)
    tag?: string[]
    // 补正系数 (用于调整该维度的分数)
    correction?: number
}

export interface Mark {
    // 基础分 (5个维度)
    baseScore: Array<BaseScoreDimension>
    // 类型权重 (5个维度，用于计算总分)
    typeWeight: Array<number>
    // 最终分 
    finalScore?: number
    // 评级名称 (['字母评级','中文评级'])
    ratingName?: string[]
}


export interface Evaluation {
    id: string
    // 游戏名-中文 (主要)
    gameNameCN: string
    // 游戏名-原名 (次要)
    gameName: string
    // 游戏类型 
    gameType?: string
    // 游戏简评 (一两句话的简单评价)
    gameIntro?: string
    // 分数 
    mark?: Mark
}