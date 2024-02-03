import type { DataProvider } from '../data-provider/data-provider'
import { DataProviderFactory } from '../data-provider/data-provider-factory'
import { type Music } from '../master/music'

export class MusicService {
  public constructor (private readonly dataProvider: DataProvider = DataProviderFactory.defaultDataProvider()) {
  }

  private async getMusics (): Promise<Music[]> {
    return await this.dataProvider.getMasterData<Music>('music')
  }

  /**
   * 获得歌曲时长信息
   */
  public async getMusicTimes (): Promise<MusicTimeDetail[]> {
    const musics = await this.getMusics()
    return musics.map(it => {
      return {
        id: it.id,
        name: it.name,
        staminaConsumption: it.staminaConsumption,
        musicTimeSecond: it.musicTimeSecond
      }
    })
  }
}

export interface MusicTimeDetail {
  id: number
  name: string
  staminaConsumption: number
  musicTimeSecond: number
}
