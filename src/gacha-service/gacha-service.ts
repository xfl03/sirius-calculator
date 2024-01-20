import type { DataProvider } from '../data-provider/data-provider'
import { DataProviderFactory } from '../data-provider/data-provider-factory'
import { type Gacha } from '../master/gacha'

export class GachaService {
  public constructor (private readonly dataProvider: DataProvider = DataProviderFactory.defaultDataProvider()) {
  }

  private async getGachaes (): Promise<Gacha[]> {
    return await this.dataProvider.getMasterData<Gacha>('gacha')
  }

  /**
   * 获得角色首次出现的卡池
   * @param characterId
   */
  public async getCharacterFirstAppearGacha (characterId: number): Promise<Gacha | undefined> {
    const gachaes = (await this.getGachaes()).filter(it => it.cardType === 'Character')
      .sort((a, b) => a.startDate - b.startDate)
    for (const gacha of gachaes) {
      if (gacha.things.find(it => it.thingId === characterId) !== undefined) {
        return gacha
      }
    }
    return undefined
  }
}
