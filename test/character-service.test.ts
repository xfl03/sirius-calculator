import { CharacterService } from '../src'
import { writeFileSync } from 'fs'

const characterService = new CharacterService()
test('character', async () => {
  const characterDetail = await characterService.getCharacterDetail(140360)
  writeFileSync('out/characterDetail.json', JSON.stringify(characterDetail, null, 2))
})
