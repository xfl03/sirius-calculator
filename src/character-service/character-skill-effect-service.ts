import { EffectService } from '../effect-service/effect-service'
import { toRangeString } from '../util/number-util'
import type { DataProvider } from '../data-provider/data-provider'
import { DataProviderFactory } from '../data-provider/data-provider-factory'
import type { EffectBranch, EffectDetail } from '../master/effect'
import { TranslationService } from '../translation-service/translation-service'

export class CharacterSkillEffectService {
  private readonly effectService: EffectService

  public constructor (private readonly dataProvider: DataProvider = DataProviderFactory.defaultDataProvider()) {
    this.effectService = new EffectService(dataProvider)
  }

  /**
   * 获得Sense（小技能）或Star Act（大技能）的信息
   * @param skill
   * @param description
   * @param maxLevel
   */
  public async getSkillDescription (skill: CharacterSkill, description: string, maxLevel: number): Promise<string> {
    // [:pre?]
    for (let i = 0; i < skill.preEffects.length; ++i) {
      const effect = skill.preEffects[i]
      description = description.replaceAll(`[:pre${i + 1}]`,
        await this.effectService.getEffectRange(effect.effectMasterId, 1, maxLevel))
    }

    // [:param??] [:sec]
    for (let i = 0; i < skill.branches.length; ++i) {
      const branch = skill.branches[i]
      for (let j = 0; j < branch.branchEffects.length; ++j) {
        const effect = branch.branchEffects[j]
        description = description.replaceAll(`[:param${i + 1}${j + 1}]`,
          await this.effectService.getEffectRange(effect.effectMasterId, 1, maxLevel))
        const durationSecond = await this.effectService.getEffectDurationSecond(effect.effectMasterId)
        if (durationSecond > 0) {
          description = description.replaceAll('[:sec]', durationSecond.toString())
        }
      }
    }

    // [:gauge]
    const gauge = skill.acquirableGauge
    if (gauge !== undefined && gauge > 0) {
      description = description.replaceAll('[:gauge]', gauge.toString())
    }

    // [:score]
    const base = skill.acquirableScorePercent / 100
    const level = skill.scoreUpPerLevel / 100
    if (base > 0 || level > 0) {
      description = description.replaceAll('[:score]', toRangeString(base, base + level * (maxLevel - 1)))
    }

    return description
  }

  /**
   * 获得Sense（小技能）或Star Act（大技能）的信息翻译
   * @param sense
   * @param maxLevel
   */
  public async getSkillTranslation (sense: CharacterSkill, maxLevel: number): Promise<{
    descriptions: string[]
    descriptionsChinese: string[]
  }> {
    const descriptions = await Promise.all(sense.description.split('／')
      .map(async it => await this.getSkillDescription(sense, it, maxLevel)))
    const descriptionsChinese = await Promise.all(sense.description.split('／')
      .map(it => TranslationService.getInstance().getChineseTranslation(it))
      .map(async it => await this.getSkillDescription(sense, it, maxLevel)))

    return { descriptions, descriptionsChinese }
  }

  /**
   * 获得Sense（小技能）或Star Act（大技能）的效果类型
   * @param skill
   */
  public async getSkillEffectTypes (skill: CharacterSkill): Promise<string[]> {
    const set = new Set<string>()
    const preEffects = skill.preEffects.map(it => it.effectMasterId)
    for (const id of preEffects) {
      set.add(await this.effectService.getEffectType(id))
    }
    const branchEffects = skill.branches.flatMap(it => it.branchEffects)
      .map(it => it.effectMasterId)
    for (const id of branchEffects) {
      set.add(await this.effectService.getEffectType(id))
    }
    return Array.from(set)
  }
}

interface CharacterSkill {
  description: string
  acquirableScorePercent: number
  scoreUpPerLevel: number
  preEffects: EffectDetail[]
  branches: EffectBranch[]
  acquirableGauge?: number
  branchCondition1: string
  branchCondition2: string
}
