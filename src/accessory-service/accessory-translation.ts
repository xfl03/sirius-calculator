import { type Translation } from '../translation-service/translation'
import { type AccessoryEffectDetail } from './accessory-effect-service'

export const accessoryTranslation: Translation[] = [{
  japanese: 'センス発動により光を付与するとき、同系統の光を追加で1個付与する。',
  chinese: '在Sense发动给予光时，追加给予1个同系统的光'
}, {
  japanese: '公演と協力公演の公演報酬が[:param1]%増加（アクセサリーを除く）',
  chinese: '公演和协力公演的公演报酬增加[:param1]%（饰品除外）'
}, {
  japanese: '公演開始時、「SP光」を[:param1]付与（SP光はどの系統の光としても扱われる）',
  chinese: '公演开始时，给予[:param1]个「SP光」'
}, {
  japanese: '公演開始時、ライフが[:param1]上昇',
  chinese: '公演开始时，提升[:param1]点血量'
}, {
  japanese: '初期プリンシパルゲージが[:param1]上昇',
  chinese: '初始Principal Gauge上升[:param1]点'
}, {
  japanese: '基礎スコアが[:param1]％上昇',
  chinese: '基础分数上升[:param1]%'
}, {
  japanese: '自身の[CHARACTER_STATUS]が[:param1]%上昇',
  chinese: '自身的[CHARACTER_STATUS]提升[:param1]%'
}, {
  japanese: '自身の[CHARACTER_STATUS]が[:param1]％上昇',
  chinese: '自身的[CHARACTER_STATUS]提升[:param1]%'
}, {
  japanese: 'いろはが装備かつ劇団電姫に所属しているアクターのみで編成',
  chinese: '由伊吕波装备且队伍内只有剧团电姬的演员编成'
}, {
  japanese: 'カトリナ・ぱんだ・知冴・暦・リリヤ・緋花里が装備',
  chinese: '由卡特莉娜·格利贝尔/柳场潘达/流石知冴/千寿历/莉莉亚·库尔特贝/与那国绯花里装备'
}]

export const accessoryRandomEffectTranslation: Record<number, AccessoryEffectDetail> = {
  1: {
    name: '歌唱力/集中力/表现力上升 +1~6',
    description: '自身的歌唱力/集中力/表现力上升(40~400)~(80~800)点',
    descriptionChinese: '自身的歌唱力/集中力/表现力上升(40~400)~(80~800)点'
  },
  2: {
    name: '歌唱力/集中力/表现力上升 +6',
    description: '自身的歌唱力/集中力/表现力上升80~800点',
    descriptionChinese: '自身的歌唱力/集中力/表现力上升80~800点'
  },
  3: {
    name: 'CT减少 +1~3',
    description: '自身的Sense的CT减少1~3秒',
    descriptionChinese: '自身的Sense的CT减少1~3秒'
  },
  4: {
    name: 'CT减少 +3',
    description: '自身的Sense的CT减少3秒',
    descriptionChinese: '自身的Sense的CT减少3秒'
  },
  5: {
    name: '初始Principal Gauge上升 +1～6',
    description: '初始Principal Gauge上升2～15点',
    descriptionChinese: '初始Principal Gauge上升2～15点'
  },
  6: {
    name: '初始Principal Gauge上升 +6',
    description: '初始Principal Gauge上升15点',
    descriptionChinese: '初始Principal Gauge上升15点'
  }
}
