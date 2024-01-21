import { getOrDefault, getOrThrow } from '../util/collection-util'
import { effectTimes, effectTranslations } from '../common/effect'
import { type Translation } from '../common/translation'
import { characterBaseTranslations } from '../common/character'
import { companyTranslations } from '../common/company'

export class TranslationService {
  private readonly chineseTranslationMap = new Map<string, string>()
  public constructor () {
    this.buildChineseTranslationMap()
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

  private buildChineseTranslationMap (): void {
    if (this.chineseTranslationMap.size > 0) {
      return
    }

    characterBaseTranslations.forEach(it => { this.addChineseTranslation(it) })
    companyTranslations.forEach(it => { this.addChineseTranslation(it) })

    const replacements = new Map<string, Translation[]>()
    replacements.set('[TIME]',
      effectTimes.map(it => { return { japanese: it.toString(), chinese: it.toString() } }))
    replacements.set('[CHARACTER]', characterBaseTranslations)
    replacements.set('[COMPANY]', companyTranslations)

    effectTranslations.forEach(it => { this.dfsAddChineseTranslation(it, replacements) })
  }

  public getChineseTranslation (japanese: string): string {
    return getOrDefault(this.chineseTranslationMap, japanese, japanese)
  }
}
