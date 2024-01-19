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
  branchCondition2: string
}
