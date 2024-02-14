import type { DataProvider } from '../data-provider/data-provider'
import { DataProviderFactory } from '../data-provider/data-provider-factory'
import { type PosterLevelPatternGroup } from '../master/poster-level-pattern-group'

export class PosterLevelPatternGroupService {
  public constructor (private readonly dataProvider: DataProvider = DataProviderFactory.defaultDataProvider()) {
  }

  private async getPosterLevelPatternGroup (id: number): Promise<PosterLevelPatternGroup> {
    return await this.dataProvider.getMasterDataById<PosterLevelPatternGroup>('posterLevelPatternGroup', id)
  }

  /**
   * 获得海报的最高等级
   * @param id
   */
  public async getPosterLevelMax (id: number): Promise<number> {
    const group = await this.getPosterLevelPatternGroup(id)
    const maxLevel = group.patterns.map(it => it.level)
      .reduce((pre, it) => Math.max(pre, it))
    return maxLevel + 5 // 自带1级、重复4级
  }
}
