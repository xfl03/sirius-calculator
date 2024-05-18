import type { DataProvider } from '../data-provider/data-provider'
import { DataProviderFactory } from '../data-provider/data-provider-factory'
import { type Accessory } from '../master/accessory'
import { type AccessoryEffectDetail, AccessoryEffectService } from './accessory-effect-service'

export class AccessoryService {
  private readonly accessoryEffectService: AccessoryEffectService
  public constructor (private readonly dataProvider: DataProvider = DataProviderFactory.defaultDataProvider()) {
    this.accessoryEffectService = new AccessoryEffectService(dataProvider)
  }

  private async getAccessories (): Promise<Accessory[]> {
    return await this.dataProvider.getMasterData<Accessory>('accessory')
  }

  private async getAccessory (id: number): Promise<Accessory> {
    return await this.dataProvider.getMasterDataById<Accessory>('accessory', id)
  }

  /**
   * 获得饰品详情信息
   * @param id 饰品ID
   */
  public async getAccessoryDetail (id: number): Promise<AccessoryDetail> {
    const accessory = await this.getAccessory(id)
    const effects = await Promise.all(accessory.fixedAccessoryEffects
      .map(async (it) => await this.accessoryEffectService.getAccessoryEffectDetail(it)))
    const randomEffects = await Promise.all(accessory.randomEffectGroups
      .map(async (it) => await this.accessoryEffectService.getAccessoryEffectDetails(it)))
    return {
      id,
      name: accessory.name,
      rarity: accessory.rarity,
      effects,
      randomEffects
    }
  }

  /**
   * 获得所有饰品信息
   */
  public async getAccessoryDetails (): Promise<AccessoryDetail[]> {
    const accessories = await this.getAccessories()
    return await Promise.all(accessories.map(async it => await this.getAccessoryDetail(it.id)))
  }
}

interface AccessoryDetail {
  id: number
  name: string
  rarity: string
  effects: AccessoryEffectDetail[]
  randomEffects: AccessoryEffectDetail[]
}
