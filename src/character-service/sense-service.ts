import type { DataProvider } from '../data-provider/data-provider'
import { DataProviderFactory } from '../data-provider/data-provider-factory'
import { EffectService } from '../effect-service/effect-service'
import { type Sense } from '../master/sense'
import { CharacterBloomService } from './character-bloom-service'
import { toRangeString } from '../util/number-util'
import { TranslationService } from '../translation-service/translation-service'

export class SenseService {
  private readonly effectService: EffectService
  private readonly characterBloomService: CharacterBloomService
  private readonly translationService: TranslationService

  public constructor (private readonly dataProvider: DataProvider = DataProviderFactory.defaultDataProvider()) {
    this.effectService = new EffectService(dataProvider)
    this.characterBloomService = new CharacterBloomService(dataProvider)
    this.translationService = new TranslationService()
  }

  private async getSense (id: number): Promise<Sense> {
    return await this.dataProvider.getMasterDataById<Sense>('sense', id)
  }

  private async getSenseDescription (sense: Sense, description: string): Promise<string> {
    // [:pre?]
    for (let i = 0; i < sense.preEffects.length; ++i) {
      const effect = sense.preEffects[i]
      description = description.replaceAll(`[:pre${i + 1}]`,
        await this.effectService.getEffectRange(effect.effectMasterId, 1, 5))
    }

    // [:param??] [:sec]
    for (let i = 0; i < sense.branches.length; ++i) {
      const branch = sense.branches[i]
      for (let j = 0; j < branch.branchEffects.length; ++j) {
        const effect = branch.branchEffects[i]
        description = description.replaceAll(`[:param${i + 1}${j + 1}]`,
          await this.effectService.getEffectRange(effect.effectMasterId, 1, 5))
        const durationSecond = await this.effectService.getEffectDurationSecond(effect.effectMasterId)
        if (durationSecond > 0) {
          description = description.replaceAll('[:sec]', durationSecond.toString())
        }
      }
    }

    // [:gauge]
    const gauge = sense.acquirableGauge
    if (gauge > 0) {
      description = description.replaceAll('[:gauge]', gauge.toString())
    }

    // [:score]
    const base = sense.acquirableScorePercent / 100
    const level = sense.scoreUpPerLevel / 100
    if (base > 0 || level > 0) {
      description = description.replaceAll('[:score]', toRangeString(base, base + level * 5))
    }

    return description
  }

  /**
   * 获得Sense（小技能）详情信息
   * @param id
   * @param bloomBonusGroupId
   */
  public async getSenseDetail (id: number, bloomBonusGroupId: number): Promise<SenseDetail> {
    const sense = await this.getSense(id)
    const descriptions = await Promise.all(sense.description.split('／')
      .map(async it => await this.getSenseDescription(sense, it)))
    const descriptionsChinese = await Promise.all(sense.description.split('／')
      .map(it => this.translationService.getChineseTranslation(it))
      .map(async it => await this.getSenseDescription(sense, it)))

    return {
      // name: sense.name,
      descriptions,
      descriptionsChinese,
      type: sense.type,
      lightCount: sense.lightCount,
      coolTime: {
        origin: sense.coolTime,
        bloom: sense.coolTime - await this.characterBloomService
          .getBloomBonusTotal(bloomBonusGroupId, 'SenseRecastDown')
      }
    }
  }
}

export interface SenseDetail {
  // name: string
  descriptions: string[]
  descriptionsChinese: string[]
  type: string
  lightCount: number
  coolTime: {
    origin: number
    bloom: number
  }
}
