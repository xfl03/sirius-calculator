export interface Poster {
  id: number
  name: string
  organizeRestrictGroupId?: number
  rarity: string
  levelPatternGroupMasterId: number
  subTitlePositionX1: number
  subTitlePositionY1: number
  subTitlePositionX2?: number
  subTitlePositionY2?: number
  subTitlePositionX3?: number
  subTitlePositionY3?: number
  releaseItemGroupId: number
  pronounceName: string
  costumes: Array<{
    phase: number
    costumeMasterId: number
  }>
  appearanceCharacterBaseMasterIds: number[]
  isRestrictItemBreakThrough: boolean
  displayStartAt: number
  displayEndAt: number
  unlockText: string
}
