import { getOrDefault, getOrThrow } from '../util/collection-util'
import { effectTimes, effectTranslations } from './effect-translation'
import { type Translation } from './translation'
import { characterBaseTranslations } from './character-translation'
import { companyTranslations } from './company-translation'
import {
  bloomLifeBonuses,
  bloomPrincipleGaugeBonuses,
  bloomScoreBonuses,
  bloomStatusBonuses,
  bloomTranslations
} from './bloom-translation'
import { lightTranslations } from './light-translation'

export class TranslationService {
  private static readonly translationService: TranslationService = new TranslationService()

  private readonly chineseTranslationMap = new Map<string, string>()

  private constructor () {
    this.buildChineseTranslationMap()
  }

  /**
   * 饿汉式单例模式
   * 注：线程安全
   */
  public static getInstance (): TranslationService {
    return TranslationService.translationService
  }

  private addChineseTranslation (translation: Translation): void {
    this.chineseTranslationMap.set(translation.japanese, translation.chinese)
  }

  private dfsAddChineseTranslation (translation: Translation, replacements: Map<string, Translation[]>): void {
    for (const key of replacements.keys()) {
      if (translation.japanese.includes(key)) {
        getOrThrow(replacements, key).forEach(replacement => {
          const newTranslation = {
            japanese: translation.japanese.replaceAll(key, replacement.japanese),
            chinese: translation.chinese.replaceAll(key, replacement.chinese)
          }
          this.dfsAddChineseTranslation(newTranslation, replacements)
        })
        return
      }
    }

    // 走到这里说明没有任何需要替换的了
    this.chineseTranslationMap.set(translation.japanese, translation.chinese)
  }

  private static addReplacements (replacements: Map<string, Translation[]>, key: string, numbers: number[]): void {
    replacements.set(key, numbers.map(it => { return { japanese: it.toString(), chinese: it.toString() } }))
  }

  private buildChineseTranslationMap (): void {
    if (this.chineseTranslationMap.size > 0) {
      return
    }

    characterBaseTranslations.forEach(it => { this.addChineseTranslation(it) })
    companyTranslations.forEach(it => { this.addChineseTranslation(it) })

    const replacements = new Map<string, Translation[]>()
    TranslationService.addReplacements(replacements, '[TIME]', effectTimes)
    TranslationService.addReplacements(replacements, '[PG]', bloomPrincipleGaugeBonuses)
    TranslationService.addReplacements(replacements, '[LIFE]', bloomLifeBonuses)
    TranslationService.addReplacements(replacements, '[SCORE]', bloomScoreBonuses)
    TranslationService.addReplacements(replacements, '[STATUS]', bloomStatusBonuses)
    replacements.set('[CHARACTER]', characterBaseTranslations)
    replacements.set('[COMPANY]', companyTranslations)
    replacements.set('[LIGHT]', lightTranslations)

    effectTranslations.forEach(it => { this.dfsAddChineseTranslation(it, replacements) })
    bloomTranslations.forEach(it => { this.dfsAddChineseTranslation(it, replacements) })
  }

  public getChineseTranslation (japanese: string): string {
    return getOrDefault(this.chineseTranslationMap, japanese, japanese)
  }
}
