import { UrlDataProvider } from './url-data-provider'

/**
 * 用于从CloudFlare中获取数据
 */
export class CloudFlareDataProvider extends UrlDataProvider {
  protected getUrl (key: string): string {
    return `https://sirius.3-3.dev/master/${key}.json`
  }
}
