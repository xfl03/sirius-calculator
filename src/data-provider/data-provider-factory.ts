import { type DataProvider } from './data-provider'
import { GithubMasterProvider } from './github-master-provider'
import { CachedDataProvider } from './cached-data-provider'

export class DataProviderFactory {
  /**
     * 获取默认数据提供者
     */
  public static defaultDataProvider (): DataProvider {
    return new CachedDataProvider(new GithubMasterProvider())
  }
}
