import { type EffectBranch, type EffectDetail } from './effect'

export interface Sense {
  id: number
  name: string
  description: string
  type: string
  preEffects: EffectDetail[]
  branches: EffectBranch[]
  acquirableGauge: number
  acquirableScorePercent: number
  scoreUpPerLevel: number
  lightCount: number
  coolTime: number
  branchCondition1: string
  conditionValue1?: number
  branchCondition2: string
  conditionValue2?: number
}
