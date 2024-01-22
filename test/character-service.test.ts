import { CharacterService } from '../src'
import { writeFileSync } from 'fs'

const characterService = new CharacterService()
test('character', async () => {
  const characterDetail = await characterService.getCharacterDetail(140320)
  writeFileSync('out/characterDetail.json', JSON.stringify(characterDetail, null, 2))
}, 30000)

test('characters', async () => {
  const characterDetails = await characterService.getAllCharacterDetails()
  const blooms: string[] = characterDetails.flatMap(it => it.bloomBonuses).flatMap(it => it.descriptions)
  const bloomSet = Array.from(new Set<string>(blooms)).sort()
  writeFileSync('out/blooms.json', JSON.stringify(bloomSet, null, 2))
  writeFileSync('out/characterDetails.json', JSON.stringify(characterDetails, null, 2))
}, 30000)
