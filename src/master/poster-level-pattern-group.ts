export interface PosterLevelPatternGroup {
  id: number
  patterns: Array<{
    id: number
    levelPatternGroupId: number
    level: number
    itemMasterId: number
    quantity: number
  }>
}
