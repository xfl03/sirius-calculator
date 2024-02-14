import { TranslationService } from '../src/translation-service/translation-service'
import { writeFileSync } from 'fs'

const translationService = TranslationService.getInstance()

test('translation', async () => {
  const obj: any = {}
  translationService.getAllTranslations().forEach((v, k) => { obj[k] = v })
  writeFileSync('out/translations.json', JSON.stringify(obj, null, 2))
})
