export interface CharacterBloomBonusGroup {
  id: number
  bloomBonuses: Array<{
    bloomBonusType: string
    description: string
    phase: number
    effectMasterId: number
    iconPath: string
  }>
}
