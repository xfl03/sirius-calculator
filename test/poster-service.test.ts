import { PosterService } from '../src'
import { writeFileSync } from 'fs'

const posterService = new PosterService()
test('poster', async () => {
  const posterDetail = await posterService.getPosterDetail(330010)
  writeFileSync('out/posterDetail.json', JSON.stringify(posterDetail, null, 2))
}, 30000)

test('posters', async () => {
  const posterDetails = await posterService.getAllPosterDetails()
  writeFileSync('out/posterDetails.json', JSON.stringify(posterDetails, null, 2))
}, 30000)
