import type { DataProvider } from '../data-provider/data-provider'
import { DataProviderFactory } from '../data-provider/data-provider-factory'
import { EffectService } from '../effect-service/effect-service'
import { type StarAct } from '../master/star-act'
import { type StarActCondition } from '../master/star-act-condition'
import { CharacterBloomService } from './character-bloom-service'
import { toRangeString } from '../util/number-util'

export class StarActService {
  private readonly effectService: EffectService
  private readonly characterBloomService: CharacterBloomService
  public constructor (private readonly dataProvider: DataProvider = DataProviderFactory.defaultDataProvider()) {
    this.effectService = new EffectService(dataProvider)
    this.characterBloomService = new CharacterBloomService(dataProvider)
  }

  private async getStarAct (id: number): Promise<StarAct> {
    return await this.dataProvider.getMasterDataById<StarAct>('starAct', id)
  }

  private async getStarActCondition (id: number): Promise<StarActCondition> {
    return await this.dataProvider.getMasterDataById<StarActCondition>('starActCondition', id)
  }

  /**
   * 获得Star Act（大技能）的详情信息
   * @param id
   * @param bloomBonusGroupId
   */
  public async getStarActDetail (id: number, bloomBonusGroupId: number): Promise<StarActDetail> {
    const starAct = await this.getStarAct(id)
    const base = starAct.acquirableScorePercent / 100
    const level = starAct.scoreUpPerLevel / 100
    const description = starAct.description.replaceAll('[:score]', toRangeString(base, base + level * 5))
    const condition = await this.getStarActCondition(starAct.starActConditionMasterId)
    return {
      // name: starAct.name,
      description,
      condition: {
        origin: {
          freeLight: condition.freeLight,
          supportLight: condition.supportLight,
          controlLight: condition.controlLight,
          amplificationLight: condition.amplificationLight,
          specialLight: condition.specialLight
        },
        bloom: {
          freeLight: condition.freeLight,
          supportLight: condition.supportLight - await this.characterBloomService
            .getBloomBonusTotal(bloomBonusGroupId, 'DecreaseRequireSupportLight'),
          controlLight: condition.controlLight - await this.characterBloomService
            .getBloomBonusTotal(bloomBonusGroupId, 'DecreaseRequireControlLight'),
          amplificationLight: condition.amplificationLight - await this.characterBloomService
            .getBloomBonusTotal(bloomBonusGroupId, 'DecreaseRequireAmplificationLight'),
          specialLight: condition.specialLight - await this.characterBloomService
            .getBloomBonusTotal(bloomBonusGroupId, 'DecreaseRequireSpecialLight')
        }
      }
    }
  }
}

export interface StarActDetail {
  // name: string
  description: string
  condition: {
    origin: StarActConditionDetail
    bloom: StarActConditionDetail
  }
}

interface StarActConditionDetail {
  freeLight: number
  supportLight: number
  controlLight: number
  amplificationLight: number
  specialLight: number
}
