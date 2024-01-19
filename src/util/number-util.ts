/**
 * 固定小数位数数字文本，不含纯0小数
 * @param num
 * @param fractionDigits
 */
export function toFixedString (num: number, fractionDigits: number = 1): string {
  return num.toFixed(fractionDigits).replace(/\.0+$/, '')
}

export function toRangeString (from: number, to: number): string {
  return from === to ? toFixedString(from) : `${toFixedString(from)}~${toFixedString(to)}`
}
