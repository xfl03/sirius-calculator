import { CharacterService } from '../src'
import { writeFileSync } from 'fs'

const characterService = new CharacterService()
test('character', async () => {
  const characterDetail = await characterService.getCharacterDetail(140320)
  writeFileSync('out/characterDetail.json', JSON.stringify(characterDetail, null, 2))
}, 30000)

test('characters', async () => {
  const characterDetails = await characterService.getAllCharacterDetails()
  writeFileSync('out/characterDetails.json', JSON.stringify(characterDetails, null, 2))
}, 30000)
