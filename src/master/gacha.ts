import { type Thing } from '../common/thing'

export interface Gacha {
  id: number
  name: string
  cardType: string
  gachaType: string
  gachaTextTemplateMasterId: number
  startDate: number
  endDate: number
  bonusThings: Thing[]
  gachaDetails: Array<{
    id: number
    paidJewelAmount: number
    isFree: boolean
    dailyRollLimit: number
    prizeCount: number
    fixedPrizeCount: number
    buttonType: string
    detailBonusThings: Thing[]
  }>
  things: Thing[]
  hasMovie: boolean
  attentionGachaTextTemplateMasterId: number
  isForceDisplay: boolean
  isHideEndDate: boolean
}
