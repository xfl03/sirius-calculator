import type { DataProvider } from '../data-provider/data-provider'
import { DataProviderFactory } from '../data-provider/data-provider-factory'
import { type PosterAbilityDetail, PosterAbilityService } from './poster-ability-service'
import { CharacterBaseService } from '../character-service/character-base-service'
import { type Poster } from '../master/poster'
import { siriusTimestampToDate } from '../util/time-util'
import { characterBaseChineseNames } from '../translation-service/character-translation'

export class PosterService {
  private readonly characterBaseService: CharacterBaseService
  private readonly posterAbilityService: PosterAbilityService
  public constructor (private readonly dataProvider: DataProvider = DataProviderFactory.defaultDataProvider()) {
    this.characterBaseService = new CharacterBaseService(dataProvider)
    this.posterAbilityService = new PosterAbilityService(dataProvider)
  }

  private async getPosters (): Promise<Poster[]> {
    return await this.dataProvider.getMasterData<Poster>('poster')
  }

  private async getPoster (id: number): Promise<Poster> {
    return await this.dataProvider.getMasterDataById<Poster>('poster', id)
  }

  /**
   * 获得海报信息
   * @param id
   */
  public async getPosterDetail (id: number): Promise<PosterDetail> {
    const poster = await this.getPoster(id)
    return {
      id: poster.id,
      name: poster.name,
      rarity: poster.rarity,
      pronounceName: poster.pronounceName,
      appearanceCharacterBases: await Promise.all(poster.appearanceCharacterBaseMasterIds
        .map(async it => await this.characterBaseService.getCharacterBaseName(it))),
      appearanceCharacterBasesChinese: poster.appearanceCharacterBaseMasterIds
        .map(it => characterBaseChineseNames[it]),
      displayStartAt: siriusTimestampToDate(poster.displayStartAt),
      abilities: await this.posterAbilityService.getPosterAbilityDetails(poster)
    }
  }

  /**
   * 批量获得海报信息
   */
  public async getAllPosterDetails (): Promise<PosterDetail[]> {
    const posters = await this.getPosters()
    return await Promise.all(posters.map(async it => await this.getPosterDetail(it.id)))
  }
}

interface PosterDetail {
  id: number
  name: string
  rarity: string
  pronounceName: string
  appearanceCharacterBases: string[]
  appearanceCharacterBasesChinese: string[]
  displayStartAt: Date
  abilities: PosterAbilityDetail[]
}
