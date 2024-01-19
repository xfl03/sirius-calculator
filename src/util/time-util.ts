export function siriusTimestampToDate (timestamp: number): Date {
  return new Date(timestamp * 1000 - 9 * 3600 * 1000)
}
