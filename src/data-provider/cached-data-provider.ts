import { type DataProvider, type HasId } from './data-provider'
import { getOrThrow } from '../util/collection-util'

export class CachedDataProvider implements DataProvider {
  public constructor (private readonly dataProvider: DataProvider) {
  }

  private static readonly globalCache = new Map<string, any>()
  private static readonly runningPromise = new Map<string, Promise<any>>()

  private async getData (cache: Map<string, any>, cacheKey: string, promise: () => Promise<any>): Promise<any> {
    // 如果本来就有缓存，不需要通过promise获取数据
    if (cache.has(cacheKey)) return cache.get(cacheKey)
    // 等待之前的promise执行完成
    while (CachedDataProvider.runningPromise.has(cacheKey)) {
      await CachedDataProvider.runningPromise.get(cacheKey)
    }
    // 再次检查是否存在缓存（之前的Promise执行结果）
    if (cache.has(cacheKey)) return cache.get(cacheKey)

    // 生成并执行新的promise，将结果写入缓存
    CachedDataProvider.runningPromise.set(cacheKey, promise())
    const data = await getOrThrow(CachedDataProvider.runningPromise, cacheKey).then(data => {
      cache.set(cacheKey, data)
      return data
    })
    CachedDataProvider.runningPromise.delete(cacheKey)
    return data
  }

  public async getMasterData<T>(key: string): Promise<T[]> {
    return await this.getData(CachedDataProvider.globalCache, key,
      async () => await this.dataProvider.getMasterData(key))
  }

  private static readonly idMapCache = new Map<string, Map<number, any>>()

  public async getMasterDataById<T extends HasId>(key: string, id: number): Promise<T> {
    if (!CachedDataProvider.idMapCache.has(key)) {
      const map = new Map<number, any>()
      const arr = await this.getMasterData<T>(key)
      arr.forEach(it => map.set(it.id, it))
      CachedDataProvider.idMapCache.set(key, map)
    }
    return getOrThrow(getOrThrow(CachedDataProvider.idMapCache, key), id)
  }
}
