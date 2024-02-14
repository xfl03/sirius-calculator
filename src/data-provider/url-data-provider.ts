import { DataProvider } from './data-provider'

/**
 * 用于从URL中获取数据
 */
export abstract class UrlDataProvider extends DataProvider {
  /**
   * 从URL中获取Master数据
   * @param key
   */
  public async getMasterData<T>(key: string): Promise<T[]> {
    const res = await fetch(this.getUrl(key))
    const json = await res.json()
    return json as T[]
  }

  protected abstract getUrl (key: string): string
}
