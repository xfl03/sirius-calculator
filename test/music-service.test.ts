import { MusicService } from '../src/music-service/music-service'
import { writeFileSync } from 'fs'

const musicService = new MusicService()

test('times', async () => {
  const musicTimes = await musicService.getMusicTimes()
  const speed = musicTimes.map(it => {
    return {
      name: it.name,
      staminaConsumption: it.staminaConsumption,
      musicTimeSecond: it.musicTimeSecond,
      gap20: it.staminaConsumption / (it.musicTimeSecond + 20),
      gap40: it.staminaConsumption / (it.musicTimeSecond + 40)
    }
  })
  speed.sort((a, b) => b.gap20 - a.gap20)
  writeFileSync('out/musicTimes20.json', JSON.stringify(speed, null, 2))
  speed.sort((a, b) => b.gap40 - a.gap40)
  writeFileSync('out/musicTimes40.json', JSON.stringify(speed, null, 2))
}, 30000)
