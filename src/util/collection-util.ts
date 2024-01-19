export function findOrThrow<T> (arr: T[], p: (t: T) => boolean): T {
  const result = arr.find(p)
  if (result === undefined) throw new Error('object not found')
  return result
}

export function getOrThrow<K, V> (map: Map<K, V>, key: K): V {
  const value = map.get(key)
  if (value === undefined) throw new Error('key not found')
  return value
}
