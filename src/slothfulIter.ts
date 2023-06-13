import { SlothfulIterable } from './slothfulIterable'

export function range(start: number, count: number) {
  function * iter(start: number, count: number) {
    for (let i = start; i < start + count; i++) {
      yield i
    }
  }

  return new SlothfulIterable<number>(() => iter(start, count))
}
  
export function infinite<T>(item: T) {
  function * iter() {
    while (true) {
      yield item
    }
  }

  return new SlothfulIterable<T>(() => iter())
}