import type { DataProvider } from '../data-provider/data-provider'
import { DataProviderFactory } from '../data-provider/data-provider-factory'
import { EffectService } from '../effect-service/effect-service'
import { type CharacterBloomBonusGroup } from '../master/character-bloom-bonus-group'

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
   */
  public async getBloomBonusTotal (id: number, type: string): Promise<number> {
    const bonus = await this.getCharacterBloomBonusGroup(id)
    const effects = await this.effectService
      .getEffects(bonus.bloomBonuses.map(it => it.effectMasterId))
    return effects
      .filter(it => it.type === type)
      .map(it => it.details[0].value)
      .reduce((sum, it) => sum + it, 0)
  }
}
