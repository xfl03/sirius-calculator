import type { DataProvider } from '../data-provider/data-provider'
import { DataProviderFactory } from '../data-provider/data-provider-factory'
import { type PosterStory } from '../master/poster-story'

export class PosterStoryService {
  public constructor (private readonly dataProvider: DataProvider = DataProviderFactory.defaultDataProvider()) {}

  public async getPosterStories (posterId: number) {
    const posterStories = await this.dataProvider.getMasterData<PosterStory>('posterStory')
    return posterStories.filter(it => it.posterMasterId === posterId)
  }
}
