import { EffectService } from '../effect-service/effect-service'
import type { DataProvider } from '../data-provider/data-provider'
import { DataProviderFactory } from '../data-provider/data-provider-factory'
import { type AccessoryEffect } from '../master/accessory-effect'
import { TranslationService } from '../translation-service/translation-service'
import { accessoryRandomEffectTranslation } from './accessory-translation'

export class AccessoryEffectService {
  private readonly effectService: EffectService
  public constructor (private readonly dataProvider: DataProvider = DataProviderFactory.defaultDataProvider()) {
    this.effectService = new EffectService(dataProvider)
  }

  private async getAccessoryEffects (): Promise<AccessoryEffect[]> {
    return await this.dataProvider.getMasterData<AccessoryEffect>('accessoryEffect')
  }

  private async getAccessoryEffect (id: number): Promise<AccessoryEffect> {
    return await this.dataProvider.getMasterDataById<AccessoryEffect>('accessoryEffect', id)
  }

  /**
   * 获得固定效果
   * @param id 效果ID
   */
  public async getAccessoryEffectDetail (id: number): Promise<AccessoryEffectDetail> {
    const accessoryEffect = await this.getAccessoryEffect(id)
    const description = await this.getAccessoryEffectDescription(accessoryEffect, accessoryEffect.description)
    const descriptionChinese = await this.getAccessoryEffectDescription(accessoryEffect,
      TranslationService.getInstance().getChineseTranslationWithRequirement(accessoryEffect.description))
    return {
      name: accessoryEffect.name,
      description,
      descriptionChinese
    }
  }

  /**
   * 获得随机组合效果
   * @param groupId 组合ID
   */
  public async getAccessoryEffectDetails (groupId: number): Promise<AccessoryEffectDetail> {
    if (accessoryRandomEffectTranslation[groupId] === undefined) {
      return {
        name: `随机组${groupId}`,
        description: '待完善',
        descriptionChinese: '待完善'
      }
    }
    return accessoryRandomEffectTranslation[groupId]
  }

  private async getAccessoryEffectDescription (accessoryEffect: AccessoryEffect, description: string): Promise<string> {
    return description.replaceAll('[:param1]',
      await this.effectService.getEffectRange(accessoryEffect.effectMasterId, 1, 10))
  }
}

export interface AccessoryEffectDetail {
  name: string
  description: string
  descriptionChinese: string
}
