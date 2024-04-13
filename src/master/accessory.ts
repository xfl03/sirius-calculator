export interface Accessory {
  id: number
  name: string
  description: string
  rarity: string
  accessoryLevelPatternGroupId: number
  fixedAccessoryEffects: number[]
  randomEffectGroups: number[]
  pronounceName: string
  series: number
  maxLevel: number
}
