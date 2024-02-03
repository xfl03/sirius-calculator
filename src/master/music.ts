export interface Music {
  id: number
  name: string
  description: string
  rewardRuleMasterId: number
  pronounceName: string
  lyricWriter: string
  composer: string
  arranger: string
  isLongVersion: boolean
  releasedAt: number
  staminaConsumption: number
  musicTimeSecond: number
  invisible: boolean
  sampleStartSeconds: number
  sampleEndSeconds: number
  delaySeconds: number
  vocalVersions: Array<{
    id: number
    musicMasterId: number
    vocalVersion: number
    singer: string
    name: string
    musicTimeSecond: number
    sampleStartSeconds: number
    sampleEndSeconds: number
    musicVideoType: string
    characters: number[]
  }>
  unlockConditionType: string
  musicVideoType: string
  musicCoverType: string
  unlockText?: string
  unlockConditionValue?: number
}
