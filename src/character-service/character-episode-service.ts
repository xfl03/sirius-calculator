import type { DataProvider } from '../data-provider/data-provider'
import { DataProviderFactory } from '../data-provider/data-provider-factory'
import { type CharacterEpisode } from '../master/character-episode'

export class CharacterEpisodeService {
  public constructor (private readonly dataProvider: DataProvider = DataProviderFactory.defaultDataProvider()) {
  }

  private async getCharacterEpisodes (): Promise<CharacterEpisode[]> {
    return await this.dataProvider.getMasterData<CharacterEpisode>('characterEpisode')
  }

  /**
   * 获得卡牌剧情
   * @param characterId
   */
  public async getCharacterEpisodeDetails (characterId: number): Promise<CharacterEpisodeDetail[]> {
    const episodes = await this.getCharacterEpisodes()
    return episodes.filter(it => it.characterMasterId === characterId).map(it => {
      return {
        id: it.id,
        episodeOrder: it.episodeOrder
      }
    })
  }

  /**
   * 获得卡牌剧情最后一章
   * @param characterId
   */
  public async getCharacterMaxEpisodeStatus (characterId: number): Promise<CharacterEpisodeStatus> {
    const episodes = (await this.getCharacterEpisodes())
      .filter(it => it.characterMasterId === characterId)
      .map(it => it.episodeOrder)
    if (episodes.includes('Second')) {
      return CharacterEpisodeStatus.SECOND
    }
    if (episodes.includes('First')) {
      return CharacterEpisodeStatus.FIRST
    }
    return CharacterEpisodeStatus.NONE
  }
}

export interface CharacterEpisodeDetail {
  id: number
  episodeOrder: string
}

export enum CharacterEpisodeStatus {
  NONE = 'None',
  FIRST = 'First',
  SECOND = 'Second'
}
