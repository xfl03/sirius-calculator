import { AccessoryService } from '../src/accessory-service/accessory-service'
import { writeFileSync } from 'fs'

const accessoryServiceTest = new AccessoryService()

test('accessories', async () => {
  const accessoryDetails = await accessoryServiceTest.getAccessoryDetails()
  const accessoryEffects: string[] = accessoryDetails.flatMap(it => it.effects).map(it => it.description)
  const accessoryEffectSet = Array.from(new Set<string>(accessoryEffects)).sort()
  writeFileSync('out/accessoryEffects.json', JSON.stringify(accessoryEffectSet, null, 2))
  writeFileSync('out/accessoryDetails.json', JSON.stringify(accessoryDetails, null, 2))
}, 30000)
