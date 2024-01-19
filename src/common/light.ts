export const lights: Record<string, { condition: string, decrease: string }> = {
  Alternative: {
    condition: 'freeLight',
    decrease: 'DecreaseRequireAlternativeLight'
  },
  Support: {
    condition: 'supportLight',
    decrease: 'DecreaseRequireSupportLight'
  },
  Control: {
    condition: 'controlLight',
    decrease: 'DecreaseRequireControlLight'
  },
  Amplification: {
    condition: 'amplificationLight',
    decrease: 'DecreaseRequireAmplificationLight'
  },
  Special: {
    condition: 'specialLight',
    decrease: 'DecreaseRequireSpecialLight'
  }
}
