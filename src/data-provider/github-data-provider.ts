import { UrlDataProvider } from './url-data-provider'

/**
 * 用于从GitHub中获取数据
 */
export class GithubDataProvider extends UrlDataProvider {
  protected getUrl (key: string): string {
    return `https://raw.githubusercontent.com/xfl03/sirius-master/main/${key}.json`
  }
}
