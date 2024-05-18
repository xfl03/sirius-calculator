export function multiSplit (str: string, spectators: string[]): string[] {
  let ret = [str]
  for (const spectator of spectators) {
    ret = ret.flatMap(it => it.split(spectator))
  }
  return ret
}
