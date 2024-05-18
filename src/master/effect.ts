export interface Effect {
  id: number
  type: string
  range: string
  calculationType: string
  details: Array<{
    level: number
    value: number
  }>
  conditions: Array<{
    condition: string
    value: number
  }>
  durationSecond: number
  triggers: Array<{
    trigger: string
    value: number
  }>
  fireTimingType: string
}

export interface EffectDetail {
  order: number
  effectMasterId: number
}

export interface EffectBranch {
  order: number
  branchEffects: EffectDetail[]
  judgeType1?: number
  parameter1?: number
  judgeType2?: number
  parameter2?: number
  id: number
}
