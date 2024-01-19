import { type DataProvider } from '../data-provider/data-provider'
import { DataProviderFactory } from '../data-provider/data-provider-factory'
import { type Effect } from '../master/effect'
import { findOrThrow } from '../util/collection-util'
import { toFixedString, toRangeString } from '../util/number-util'

export class EffectService {
  public constructor (private readonly dataProvider: DataProvider = DataProviderFactory.defaultDataProvider()) {
  }

  private async getEffect (id: number): Promise<Effect> {
    return await this.dataProvider.getMasterDataById<Effect>('effect', id)
  }

  /**
   * 批量获取效果对象
   * @param ids
   */
  public async getEffects (ids: number[]): Promise<Effect[]> {
    return await Promise.all(ids.map(async it => await this.getEffect(it)))
  }

  private getEffectDetail (effect: Effect, level: number): number {
    const div = ['PercentageAddition', 'Multiplication'].includes(effect.calculationType) ? 100 : 1
    const detail = findOrThrow(effect.details, it => it.level === level)
    return detail.value / div
  }

  /**
   * 获取效果数值范围
   * 例如：1～2或1
   * @param id
   * @param from
   * @param to
   */
  public async getEffectRange (id: number, from: number = 1, to: number = 114514): Promise<string> {
    const effect = await this.getEffect(id)
    to = Math.min(effect.details.length, to)
    const f = this.getEffectDetail(effect, from)
    const t = this.getEffectDetail(effect, to)
    return toRangeString(f, t)
  }

  /**
   * 获得效果持续时间（秒）
   * @param id
   */
  public async getEffectDurationSecond (id: number): Promise<number> {
    const effect = await this.getEffect(id)
    return effect.durationSecond
  }
}
