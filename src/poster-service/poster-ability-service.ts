import type { DataProvider } from '../data-provider/data-provider'
import { DataProviderFactory } from '../data-provider/data-provider-factory'
import { type PosterAbility } from '../master/poster-ability'
import { type Poster } from '../master/poster'
import { EffectService } from '../effect-service/effect-service'
import { PosterLevelPatternGroupService } from './poster-level-pattern-group-service'
import { TranslationService } from '../translation-service/translation-service'

export class PosterAbilityService {
  private readonly effectService: EffectService
  private readonly posterLevelPatternGroupService: PosterLevelPatternGroupService
  private readonly translationService: TranslationService
  public constructor (private readonly dataProvider: DataProvider = DataProviderFactory.defaultDataProvider()) {
    this.effectService = new EffectService(dataProvider)
    this.posterLevelPatternGroupService = new PosterLevelPatternGroupService(dataProvider)
    this.translationService = TranslationService.getInstance()
  }

  private async getPosterAbilities (posterId: number): Promise<PosterAbility[]> {
    const posterAbilities = await this.dataProvider.getMasterData<PosterAbility>('posterAbility')
    return posterAbilities.filter(it => it.posterMasterId === posterId)
  }

  private async getPosterAbilityDescription (description: string, posterAbility: PosterAbility, maxLevel: number): Promise<string> {
    // [:param??]
    for (let i = 0; i < posterAbility.branches.length; ++i) {
      const branch = posterAbility.branches[i]
      for (let j = 0; j < branch.branchEffects.length; ++j) {
        const effect = branch.branchEffects[j]
        description = description.replaceAll(`[:param${i + 1}${j + 1}]`,
          await this.effectService.getEffectRange(effect.effectMasterId, 1, maxLevel))
      }
    }
    return description
  }

  private async getPosterAbilityEffectDetails (posterAbility: PosterAbility, maxLevel: number): Promise<number[][]> {
    const ret: number[][] = []
    for (const branch of posterAbility.branches) {
      for (const effect of branch.branchEffects) {
        ret.push(await this.effectService.getEffectDetails(effect.effectMasterId, maxLevel))
      }
    }
    return ret
  }

  private getDescriptionTranslation (description: string): string {
    const descriptions = description.split('　◆発動条件：')
    return descriptions.map(it => this.translationService.getChineseTranslation(it)).join('　◆发动条件：')
  }

  /**
   * 获得海报的具体能力
   * @param poster
   */
  public async getPosterAbilityDetails (poster: Poster): Promise<PosterAbilityDetail[]> {
    const posterAbilities = await this.getPosterAbilities(poster.id)
    const maxLevel =
      await this.posterLevelPatternGroupService.getPosterLevelMax(poster.levelPatternGroupMasterId)
    return await Promise.all(posterAbilities.map(async it => {
      return {
        name: it.name,
        description: await this.getPosterAbilityDescription(it.description, it, maxLevel),
        descriptionChinese: await this.getPosterAbilityDescription(
          this.getDescriptionTranslation(it.description), it, maxLevel),
        effectDetails: await this.getPosterAbilityEffectDetails(it, maxLevel),
        type: it.type,
        releaseLevelAt: it.releaseLevelAt
      }
    }))
  }
}

export interface PosterAbilityDetail {
  name: string
  description: string
  descriptionChinese: string
  effectDetails: number[][]
  type: string
  releaseLevelAt: number
}
