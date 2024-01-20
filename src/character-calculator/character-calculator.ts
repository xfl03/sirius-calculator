import type { DataProvider } from '../data-provider/data-provider'
import { DataProviderFactory } from '../data-provider/data-provider-factory'
import { type CharacterLevel } from '../master/character-level'
import { findOrThrow } from '../util/collection-util'
import { type Character } from '../master/character'
import { CharacterBloomService } from '../character-service/character-bloom-service'
import { siriusTimestampToDate } from '../util/time-util'

export class CharacterCalculator {
  private readonly characterBloomService: CharacterBloomService
  public constructor (private readonly dataProvider: DataProvider = DataProviderFactory.defaultDataProvider()) {
    this.characterBloomService = new CharacterBloomService(dataProvider)
  }

  private async getCharacterLevel (level: number): Promise<CharacterLevel> {
    const levels = await this.dataProvider.getMasterData<CharacterLevel>('characterLevel')
    return findOrThrow(levels, it => it.level === level)
  }

  private async getMaxCharacterLevel (): Promise<number> {
    const levels = await this.dataProvider.getMasterData<CharacterLevel>('characterLevel')
    return levels.filter(it => siriusTimestampToDate(it.startDate).getTime() <= Date.now())
      .reduce((max, it) => Math.max(max, it.level), 0)
  }

  private static getEpisodeBonus (episode: CharacterEpisodeStatus): number {
    switch (episode) {
      case CharacterEpisodeStatus.NONE:
        return 0
      case CharacterEpisodeStatus.FIRST:
        return 2
      case CharacterEpisodeStatus.SECOND:
        return 5
    }
  }

  private static getStatus (base: number, levelBonus: number, bonus: number): number {
    return Math.floor(base * levelBonus * bonus)
  }

  /**
   * 获得角色三维
   * @param character
   * @param level
   * @param awakening
   * @param episode
   * @param bloom
   */
  public async getCharacterStatus (
    character: Character,
    { level = 1, awakening = false, episode = CharacterEpisodeStatus.NONE, bloom = 0 }: CharacterStatusPreset
  ): Promise<CharacterStatusDetail> {
    const level0 = await this.getCharacterLevel(level)
    const levelBonus = level0.characterStatusLevel / 100
    const base = CharacterCalculator.getEpisodeBonus(episode)
    const bonus = (100 + await this.characterBloomService
      .getBloomBonusTotal(character.bloomBonusGroupMasterId, 'BaseCorrection', bloom) / 100 +
        (awakening ? 10 : 0)) / 100
    return {
      preset: {
        level,
        awakening,
        episode,
        bloom
      },
      status: {
        vocal: CharacterCalculator.getStatus(character.minLevelStatus.vocal + base, levelBonus, bonus),
        expression: CharacterCalculator.getStatus(character.minLevelStatus.expression + base, levelBonus, bonus),
        concentration: CharacterCalculator
          .getStatus(character.minLevelStatus.concentration + base, levelBonus, bonus)
      }
    }
  }

  /**
   * 获得1级初始状态的三维
   * @param character
   */
  public async getMinCharacterStatus (character: Character): Promise<CharacterStatusDetail> {
    return await this.getCharacterStatus(character, {})
  }

  /**
   * 获得满级、满开花、前后剧情、觉醒的三维
   * @param character
   */
  public async getMaxCharacterStatus (character: Character): Promise<CharacterStatusDetail> {
    return await this.getCharacterStatus(character, {
      level: await this.getMaxCharacterLevel(), awakening: true, episode: CharacterEpisodeStatus.SECOND, bloom: 5
    })
  }
}

export interface CharacterStatusPreset {
  level?: number
  awakening?: boolean
  episode?: CharacterEpisodeStatus
  bloom?: number
}

export interface CharacterStatusDetail {
  preset: CharacterStatusPreset
  status: {
    vocal: number
    expression: number
    concentration: number
  }
}
export enum CharacterEpisodeStatus {
  NONE = 'None',
  FIRST = 'First',
  SECOND = 'Second'
}
