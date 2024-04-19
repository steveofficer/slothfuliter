import { SlothfulIterable } from './slothfulIterable'

/**
 * Generates a fixed size, lazy sequence of numbers starting at a given number. 
 * @param start The number to start the sequence at.
 * @param count The number of elements that the sequence will produce.
 * @returns The lazy sequence of numbers
 */
export function range(start: number, count: number) {
  function * iter(start: number, count: number) {
    for (let i = start; i < start + count; i++) {
      yield i
    }
  }

  return new SlothfulIterable<number>(() => iter(start, count))
}

/**
 * Generates an infinite sequence containing the provided item.
 * @param item The item to repeat in the infinite sequence.
 * @returns The lazy sequence of items
 */
export function infinite<T>(item: T) {
  function * iter() {
    while (true) {
      yield item
    }
  }

  return new SlothfulIterable<T>(() => iter())
}