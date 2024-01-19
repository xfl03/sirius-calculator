import type { DataProvider } from '../data-provider/data-provider'
import { DataProviderFactory } from '../data-provider/data-provider-factory'
import { type CharacterBase } from '../master/character-base'

export class CharacterBaseService {
  public constructor (private readonly dataProvider: DataProvider = DataProviderFactory.defaultDataProvider()) {
  }

  private async getCharacterBase (id: number): Promise<CharacterBase> {
    return await this.dataProvider.getMasterDataById<CharacterBase>('characterBase', id)
  }

  /**
   * 获取基本角色名称
   * 例如：鳳ここな
   * @param id
   */
  public async getCharacterBaseName (id: number): Promise<string> {
    const characterBase = await this.getCharacterBase(id)
    return characterBase.name
  }
}
