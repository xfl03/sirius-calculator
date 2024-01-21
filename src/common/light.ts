export const lights = [
  {
    type: 'Alternative',
    typeChinese: '任意系',
    typeChineseShort: '任意',
    condition: 'freeLight',
    decrease: 'DecreaseRequireAlternativeLight'
  },
  {
    type: 'Support',
    typeChinese: '支援系',
    typeChineseShort: '绿',
    condition: 'supportLight',
    decrease: 'DecreaseRequireSupportLight'
  },
  {
    type: 'Control',
    typeChinese: '支配系',
    typeChineseShort: '红',
    condition: 'controlLight',
    decrease: 'DecreaseRequireControlLight'
  },
  {
    type: 'Amplification',
    typeChinese: '增幅系',
    typeChineseShort: '黄',
    condition: 'amplificationLight',
    decrease: 'DecreaseRequireAmplificationLight'
  },
  {
    type: 'Special',
    typeChinese: '特殊系',
    typeChineseShort: '蓝',
    condition: 'specialLight',
    decrease: 'DecreaseRequireSpecialLight'
  }
]
