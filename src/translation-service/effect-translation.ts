import { type Translation } from './translation'

export const effectTranslations: Translation[] = [{
  japanese: '[:gauge]のプリンシパルゲージを獲得',
  chinese: '获得[:gauge]点Principle Gauge'
}, {
  japanese: '[:score]倍のスコアを獲得',
  chinese: '获得自身演技力[:score]倍的分数'
}, {
  japanese: '[:sec]秒間、[COMPANY]のアクターにスターアクトスコア[:param11]％UP効果',
  chinese: '[:sec]秒内，[COMPANY]的演员Star Act中获得的分数提升[:param11]%'
}, {
  japanese: '[:sec]秒間、[COMPANY]のアクターにセンススコア[:param11]％UP効果',
  chinese: '[:sec]秒内，[COMPANY]的演员Sense中获得的分数提升[:param11]%'
}, {
  japanese: '[COMPANY]のアクターのCTを[TIME]秒短縮',
  chinese: '[COMPANY]的演员CT缩短[TIME]秒'
}, {
  japanese: '[CHARACTER]のCTを[TIME]秒短縮',
  chinese: '[CHARACTER]的CT缩短[TIME]秒'
}, {
  japanese: 'ここな編成時、ここなが代わりにセンスを発動し、ここなのスコア獲得量[:pre1]％UP',
  chinese: '队伍中有凤心菜编成时，凤心菜代替发动Sense，同时使凤心菜的分数获得量提高[:pre1]%'
}, {
  japanese: 'ここな編成時、ここなが代わりにセンスを発動し、ここなのスコア獲得量[:pre2]％、スターアクトスコア獲得量[:pre3]％UP',
  chinese: '队伍中有凤心菜编成时，凤心菜代替发动Sense，同时使凤心菜的分数获得量提高[:pre2]%，Star Act分数获得量提升[:pre3]%'
}, {
  japanese: 'センス発動後、追加で[:param11]のプリンシパルゲージを獲得',
  chinese: 'Sense发动后，追加获得[:param11]点Principle Gauge'
}, {
  japanese: 'ライフが多いほど[CHARACTER]のスコア獲得量UP（最大＋100％）',
  chinese: '血量越多，[CHARACTER]的分数获得量越高（最大+100％）'
}, {
  japanese: 'ライフが少ないほど[CHARACTER]のスコア獲得量UP（最大+100％）',
  chinese: '血量越少，[CHARACTER]的分数获得量越高（最大+100％）'
}, {
  japanese: 'ライフを[:param11]回復',
  chinese: '回复[:param11]点血量'
}, {
  japanese: '効果無し（所持している「光」は維持される）',
  chinese: '无效果（维持目前所拥有的光）'
}, {
  japanese: '総演技力の[:score]倍のスコアを獲得',
  chinese: '获得总演技力[:score]倍的分数'
}]

export const effectTimes: number[] = [1, 2, 3, 5, 8, 9, 10]
