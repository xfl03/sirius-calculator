import type { DataProvider } from '../data-provider/data-provider'
import { DataProviderFactory } from '../data-provider/data-provider-factory'
import { type StarAct } from '../master/star-act'
import { type StarActCondition } from '../master/star-act-condition'
import { CharacterBloomService } from './character-bloom-service'
import { lights } from '../common/light'
import { CharacterSkillEffectService } from './character-skill-effect-service'

export class StarActService {
  private readonly characterSkillEffectService: CharacterSkillEffectService
  private readonly characterBloomService: CharacterBloomService

  public constructor (private readonly dataProvider: DataProvider = DataProviderFactory.defaultDataProvider()) {
    this.characterSkillEffectService = new CharacterSkillEffectService(dataProvider)
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
    const { descriptions, descriptionsChinese } =
      await this.characterSkillEffectService.getSkillTranslation(starAct, 6)
    const condition = await this.getStarActCondition(starAct.starActConditionMasterId)
    const conditions = await Promise.all(
      [condition.freeLight, condition.supportLight, condition.controlLight,
        condition.amplificationLight, condition.specialLight].map(async (it, i) => {
        const { type, typeChinese, decrease } = lights[i]
        return {
          type,
          typeChinese,
          origin: it,
          bloom: it - await this.characterBloomService.getBloomBonusTotal(bloomBonusGroupId, decrease)
        }
      }))
    return {
      // name: starAct.name,
      descriptions,
      descriptionsChinese,
      conditions
    }
  }
}

export interface StarActDetail {
  // name: string
  descriptions: string[]
  descriptionsChinese: string[]
  conditions: StarActLightCondition[]
}

interface StarActLightCondition {
  type: string
  typeChinese: string
  origin: number
  bloom: number
}
