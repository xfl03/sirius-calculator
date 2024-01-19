/**
 * 数据获取接口
 */
export interface DataProvider {
  /**
     * 获得Master Data
     * @param key
     */
  getMasterData: <T>(key: string) => Promise<T[]>
  /**
   * 根据id字段获得Master Data
   * @param key
   */
  getMasterDataById: <T extends HasId>(key: string, id: number) => Promise<T>
}

export interface HasId {
  id: number
}
