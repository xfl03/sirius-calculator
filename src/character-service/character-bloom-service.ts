import type { DataProvider } from '../data-provider/data-provider'
import { DataProviderFactory } from '../data-provider/data-provider-factory'
import { EffectService } from '../effect-service/effect-service'
import { type CharacterBloomBonusGroup } from '../master/character-bloom-bonus-group'
import { TranslationService } from '../translation-service/translation-service'

export class CharacterBloomService {
  private readonly effectService: EffectService
  public constructor (private readonly dataProvider: DataProvider = DataProviderFactory.defaultDataProvider()) {
    this.effectService = new EffectService(dataProvider)
  }

  private async getCharacterBloomBonusGroup (id: number): Promise<CharacterBloomBonusGroup> {
    return await this.dataProvider.getMasterDataById<CharacterBloomBonusGroup>('characterBloomBonusGroup', id)
  }

  /**
   * 获取特定类型的开花加成总值
   * @param id
   * @param type
   * @param bloom
   */
  public async getBloomBonusTotal (id: number, type: string, bloom: number = 5): Promise<number> {
    const bonus = await this.getCharacterBloomBonusGroup(id)
    const effects = await this.effectService
      .getEffects(bonus.bloomBonuses.filter(it => it.phase <= bloom)
        .map(it => it.effectMasterId))
    return effects
      .filter(it => it.type === type)
      .map(it => it.details[0].value)
      .reduce((sum, it) => sum + it, 0)
  }

  /**
   * 获得开花（bloom）加成的详细信息
   * @param id
   */
  public async getBloomBonusDetails (id: number): Promise<BloomBonusDetail[]> {
    const bonuses = await this.getCharacterBloomBonusGroup(id)
    return Array.from(new Set(bonuses.bloomBonuses.map(it => it.phase)))
      .sort((a, b) => a - b).map(phase => {
        const descriptions = bonuses.bloomBonuses
          .filter(it => it.phase === phase)
          .map(it => it.description)
        return {
          phase,
          descriptions,
          descriptionsChinese: descriptions
            .map(it => TranslationService.getInstance().getChineseTranslation(it))
        }
      })
  }
}

export interface BloomBonusDetail {
  phase: number
  descriptions: string[]
  descriptionsChinese: string[]
}
