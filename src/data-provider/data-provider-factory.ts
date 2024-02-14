import { type DataProvider } from './data-provider'
import { CachedDataProvider } from './cached-data-provider'
import { CloudFlareDataProvider } from './cloudflare-data-provider'

/**
 * 静态工厂方法
 * 维护默认数据提供者
 */
export class DataProviderFactory {
  /**
   * 获取默认数据提供者
   */
  public static defaultDataProvider (): DataProvider {
    return new CachedDataProvider(new CloudFlareDataProvider())
  }
}
