import { type EffectBranch } from './effect'

export interface PosterAbility {
  id: number
  name: string
  description: string
  posterMasterId: number
  type: string
  frameNumber: number
  releaseLevelAt: number
  hidden: boolean
  branches: EffectBranch[]
  branchConditionType1: string
  branchConditionType2: string
  conditionValue1?: number
}
