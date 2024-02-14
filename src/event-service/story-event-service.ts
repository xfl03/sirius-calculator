import type { DataProvider } from '../data-provider/data-provider'
import { DataProviderFactory } from '../data-provider/data-provider-factory'
import { type StoryEvent } from '../master/story-event'

export class StoryEventService {
  public constructor (private readonly dataProvider: DataProvider = DataProviderFactory.defaultDataProvider()) {
  }

  private async getStoryEvents (): Promise<StoryEvent[]> {
    return await this.dataProvider.getMasterData<StoryEvent>('storyEvent')
  }

  private async getStoryEvent (id: number): Promise<StoryEvent> {
    return await this.dataProvider.getMasterDataById<StoryEvent>('storyEvent', id)
  }

  /**
   * 获得活动信息
   * @param id
   */
  public async getStoryEventDetail (id: number): Promise<StoryEventDetail> {
    const event = await this.getStoryEvent(id)
    return {
      id: event.id,
      title: event.title
    }
  }

  /**
   * 卡牌、海报等首次出现的活动
   * @param displayStartAt
   */
  public async getFirstAppearStoryEvent (displayStartAt: number): Promise<{ title: string }> {
    const events = await this.getStoryEvents()
    const event = events
      .find(it => it.startDate <= displayStartAt && displayStartAt < it.forceEndDate)
    if (event !== undefined) {
      return await this.getStoryEventDetail(event.id)
    }
    return {
      title: '无'
    }
  }
}

interface StoryEventDetail {
  id: number
  title: string
}
