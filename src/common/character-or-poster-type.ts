export enum CharacterOrPosterType {
  NONE = 'None',
  INIT = 'Init', // 初始就有
  STORY_REWARD = 'StoryReward', // 读故事的奖励，也可以抽
  EVENT_EXCHANGE = 'EventExchange', // 活动奖励
  NORMAL = 'Normal', // 活动常驻
  TIME_LIMITED = 'TimeLimited', // 活动期间限定
  FESTIVAL_LIMITED = 'FestivalLimited', // FES限定
  CLUB_LIMITED = 'ClubLimited', // 联动限定
}

export function getCharacterPosterType (unlockText: string): CharacterOrPosterType {
  switch (unlockText) {
    case '初期から所持':
      return CharacterOrPosterType.INIT
    case 'メインストーリー読了、/n、またはガチャで入手':
      return CharacterOrPosterType.STORY_REWARD
    case 'ガチャで入手':
      return CharacterOrPosterType.NORMAL
    case 'イベントで入手':
      return CharacterOrPosterType.EVENT_EXCHANGE
    case 'ガチャ(期間限定)で入手':
      return CharacterOrPosterType.TIME_LIMITED
    case 'ガチャ(ユメフェス)で入手':
      return CharacterOrPosterType.FESTIVAL_LIMITED
    case 'ガチャ(コラボ限定)で入手':
      return CharacterOrPosterType.CLUB_LIMITED
  }
  return CharacterOrPosterType.NONE
}
