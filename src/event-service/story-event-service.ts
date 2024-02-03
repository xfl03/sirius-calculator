import type { DataProvider } from '../data-provider/data-provider'
import { DataProviderFactory } from '../data-provider/data-provider-factory'
import { type StoryEvent } from '../master/story-event'

export class StoryEventService {
  public constructor (private readonly dataProvider: DataProvider = DataProviderFactory.defaultDataProvider()) {
  }

  private async getStoryEvents (): Promise<StoryEvent[]> {
    return await this.dataProvider.getMasterData<StoryEvent>('storyEvent')
  }

  /**
   * 卡牌首次出现的活动
   * @param displayStartAt
   */
  public async getCharacterFirstAppearStoryEvent (displayStartAt: number): Promise<StoryEvent | undefined> {
    const events = await this.getStoryEvents()
    return events.find(it => it.startDate <= displayStartAt && displayStartAt < it.forceEndDate)
  }
}
