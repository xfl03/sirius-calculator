import { findOrThrow } from '../util/collection-util'

/**
 * 数据获取抽象类
 */
export abstract class DataProvider {
  /**
   * 获得Master Data
   * 需要实现
   * @param key
   */
  public abstract getMasterData<T>(key: string): Promise<T[]>

  /**
   * 根据id字段获得Master Data
   * 有默认实现
   * @param key
   * @param id
   */
  public async getMasterDataById <T extends HasId>(key: string, id: number): Promise<T> {
    return findOrThrow(await this.getMasterData<T>(key), it => it.id === id)
  }
}

export interface HasId {
  id: number
}
