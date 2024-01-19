import { type DataProvider, type HasId } from './data-provider'
import { findOrThrow } from '../util/collection-util'

export class GithubMasterProvider implements DataProvider {
  /**
     * 从GitHub中获取Master数据
     * @param key
     */
  async getMasterData<T>(key: string): Promise<T[]> {
    const res = await fetch(`https://raw.githubusercontent.com/xfl03/sirius-master/main/${key}.json`)
    const json = await res.json()
    return json as T[]
  }

  /**
     * 从ID获取Master数据
     * 建议套上缓存再用
     * @param key
     * @param id
     */
  async getMasterDataById<T extends HasId>(key: string, id: number): Promise<T> {
    return findOrThrow(await this.getMasterData<T>(key), it => it.id === id)
  }
}
