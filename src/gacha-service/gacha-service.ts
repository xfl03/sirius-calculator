import type { DataProvider } from '../data-provider/data-provider'
import { DataProviderFactory } from '../data-provider/data-provider-factory'
import { type Gacha } from '../master/gacha'
import { type GachaTextTemplate } from '../master/gacha-text-template'
import { siriusTimestampToDate } from '../util/time-util'

export class GachaService {
  public constructor (private readonly dataProvider: DataProvider = DataProviderFactory.defaultDataProvider()) {
  }

  private async getGachaes (): Promise<Gacha[]> {
    return await this.dataProvider.getMasterData<Gacha>('gacha')
  }

  private async getGacha (id: number): Promise<Gacha> {
    return await this.dataProvider.getMasterDataById<Gacha>('gacha', id)
  }

  private async getGachaTextTemplate (id: number): Promise<GachaTextTemplate> {
    return await this.dataProvider.getMasterDataById<GachaTextTemplate>('gachaTextTemplate', id)
  }

  private async getGachaType (gacha: Gacha): Promise<GachaType> {
    const description = (await this.getGachaTextTemplate(gacha.gachaTextTemplateMasterId)).description
    if (gacha.name.includes('ユメフェスガチャ')) {
      return GachaType.FESTIVAL_LIMITED
    }
    if (gacha.name.includes('復刻')) {
      return GachaType.LIMITED_REOPEN
    }
    if (gacha.name.includes('★4セレクトピックアップガチャ')) {
      return GachaType.SELECT_PICKUP
    }
    if (gacha.name.includes('ピックアップガチャ')) {
      return GachaType.PICKUP
    }
    if (gacha.name.includes('10連ガチャ')) {
      return GachaType.FREE
    }
    if (description.includes('コラボ限定')) {
      return GachaType.CLUB_LIMITED
    }
    if (description.includes('期間限定')) {
      return GachaType.TIME_LIMITED
    }
    return GachaType.NORMAL
  }

  /**
   * 获取卡池信息
   * @param id
   */
  public async getGachaDetail (id: number): Promise<GachaDetail> {
    const gacha = await this.getGacha(id)
    return {
      id: gacha.id,
      name: gacha.name,
      cardType: gacha.cardType,
      startDate: siriusTimestampToDate(gacha.startDate),
      type: await this.getGachaType(gacha)
    }
  }

  private async getFirstAppearGacha (cardType: string, thingId: number, notAfterTime: number = Date.now()): Promise<GachaDetailSimple> {
    const gachaes = (await this.getGachaes()).filter(it => it.cardType === cardType)
      .sort((a, b) => a.startDate - b.startDate)
    for (const gacha of gachaes) {
      if (gacha.startDate > notAfterTime) break
      if (gacha.things.find(it => it.thingId === thingId) !== undefined) {
        return await this.getGachaDetail(gacha.id)
      }
    }
    return {
      name: '无',
      type: GachaType.NONE
    }
  }

  /**
   * 获得角色首次出现的卡池
   * @param characterId
   * @param notAfterTime
   */
  public async getCharacterFirstAppearGacha (characterId: number, notAfterTime: number = Date.now()): Promise<GachaDetailSimple> {
    return await this.getFirstAppearGacha('Character', characterId, notAfterTime)
  }

  /**
   * 获得海报首次出现的卡池
   * @param posterId
   * @param notAfterTime
   */
  public async getPosterFirstAppearGacha (posterId: number, notAfterTime: number = Date.now()): Promise<GachaDetailSimple> {
    return await this.getFirstAppearGacha('Poster', posterId, notAfterTime)
  }
}

interface GachaDetail {
  id: number
  name: string
  cardType: string
  startDate: Date
  type: GachaType
}

interface GachaDetailSimple {
  name: string
  type: GachaType
}

export enum GachaType {
  NONE = 'None',
  NORMAL = 'Normal', // 活动常驻
  TIME_LIMITED = 'TimeLimited', // 活动期间限定
  FESTIVAL_LIMITED = 'FestivalLimited', // FES限定
  CLUB_LIMITED = 'ClubLimited', // 联动限定
  LIMITED_REOPEN = 'LimitedReopen', // 限定复刻
  PICKUP = 'Pickup', // 特定四星UP
  SELECT_PICKUP = 'SelectPickup', // 自选四星UP
  FREE = 'Free' // 免费10连
}
