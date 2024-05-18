import type { DataProvider } from '../data-provider/data-provider'
import { DataProviderFactory } from '../data-provider/data-provider-factory'
import { type Sense } from '../master/sense'
import { CharacterBloomService } from './character-bloom-service'
import { CharacterSkillEffectService } from './character-skill-effect-service'

export class SenseService {
  private readonly characterSkillEffectService: CharacterSkillEffectService
  private readonly characterBloomService: CharacterBloomService

  public constructor (private readonly dataProvider: DataProvider = DataProviderFactory.defaultDataProvider()) {
    this.characterSkillEffectService = new CharacterSkillEffectService(dataProvider)
    this.characterBloomService = new CharacterBloomService(dataProvider)
  }

  private async getSense (id: number): Promise<Sense> {
    return await this.dataProvider.getMasterDataById<Sense>('sense', id)
  }

  /**
   * 获得Sense（小技能）详情信息
   * @param id
   * @param bloomBonusGroupId
   */
  public async getSenseDetail (id: number, bloomBonusGroupId: number): Promise<SenseDetail> {
    const sense = await this.getSense(id)
    const { descriptions, descriptionsChinese } =
      await this.characterSkillEffectService.getSkillTranslation(sense, 5)

    return {
      // name: sense.name,
      descriptions,
      descriptionsChinese,
      type: sense.type,
      lightCount: sense.lightCount,
      acquirableGauge: sense.acquirableGauge,
      coolTime: {
        origin: sense.coolTime,
        bloom: sense.coolTime - await this.characterBloomService
          .getBloomBonusTotal(bloomBonusGroupId, 'SenseRecastDown')
      },
      effectTypes: await this.characterSkillEffectService.getSkillEffectTypes(sense)
    }
  }
}

export interface SenseDetail {
  // name: string
  descriptions: string[]
  descriptionsChinese: string[]
  type: string
  lightCount: number
  acquirableGauge: number
  coolTime: {
    origin: number
    bloom: number
  }
  effectTypes: string[]
}
