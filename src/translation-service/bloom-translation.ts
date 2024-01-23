import { type Translation } from './translation'

export const bloomTranslations: Translation[] = [{
  japanese: 'スターアクト発動に必要な[LIGHT]の光の個数が1個減少',
  chinese: 'Star Act发动所需要的[LIGHT]光个数减1'
}, {
  japanese: 'センスのCTが[TIME]秒減少',
  chinese: 'Sense的CT缩短[TIME]秒'
}, {
  japanese: '公演での報酬量が10％上昇',
  chinese: '公演的报酬量上升10%'
}, {
  japanese: '初期プリンシパルゲージが[PG]上昇',
  chinese: '初始Principle Gauge上升[PG]'
}, {
  japanese: '初期ライフが[LIFE]上昇',
  chinese: '初始血量上升[LIFE]'
}, {
  japanese: '基礎スコアが[SCORE]％上昇',
  chinese: '基础分数提升[SCORE]%'
}, {
  japanese: '演技力[STATUS]％UP',
  chinese: '演技力上升[STATUS]%'
}]

export const bloomPrincipleGaugeBonuses = [20, 30, 50]
export const bloomLifeBonuses = [40, 60, 100]
export const bloomScoreBonuses = [1, 2, 3, 5, 10]
export const bloomStatusBonuses = [2, 3, 4, 6, 8, 12, 16, 18, 24]
