import { type EffectBranch, type EffectDetail } from './effect'

export interface StarAct {
  id: number
  name: string
  description: string
  starActConditionMasterId: number
  acquirableScorePercent: number
  scoreUpPerLevel: number
  preEffects: EffectDetail[]
  branches: EffectBranch[]
  branchCondition1: string
  conditionValue1?: number
  branchCondition2: string
  conditionValue2?: number
}
