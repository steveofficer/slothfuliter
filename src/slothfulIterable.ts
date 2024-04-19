export class SlothfulIterable<T> implements Iterable<T> {
    constructor(private generator: () => IterableIterator<T>) {
    }
  
    [Symbol.iterator]() {
      function * iter(iterator: Iterable<T>) {
        for (const item of iterator) {
          yield item
        }
      }

      return iter(this.generator())
    }

    /**
     * Determines if all items of the sequence match the provided predicate.
     * 
     * @remarks
     * This function will immediately evaluate the sequence.
     * 
     * @param predicate The function evaluate each item against.
     * @returns true if all items match the predicate, otherwise false.
     */
    every(predicate: (item: T) => boolean) {
      for (const item of this.generator()) {
        if (!predicate(item)) {
          return false
        }
      }

      return true
    }

    /**
     * Creates a new lazy sequence that contains only the items that match the provided predicate.
     * 
     * @remarks
     * This function will not evaluate the sequence and will only apply when the sequence is iterated.
     * 
     * @param predicate The function evaluate each item against.
     * @returns a new sequence that when iterated contains only the items that matched the predicate.
     */
    filter(predicate: (item: T) => boolean) {
      function * iter(iterator: Iterable<T>) {
        for (const result of iterator) {
          if (predicate(result)) {
            yield result
          }
        }
      }
  
      return new SlothfulIterable<T>(() => iter(this.generator()))
    }

    /**
     * Iterates the sequence and executes the action against each item.
     * 
     * @remarks
     * This function will immediately evaluate the sequence.
     * 
     * @param action The action to execute against each item.
     */
    forEach(action: (item: T) => void) {
      for (const item of this.generator()) {
        action(item)
      }
    }

    /**
     * Creates a new lazy sequence that contains items that have been transformed by a provided function.
     * 
     * @remarks
     * This function will not evaluate the sequence and will only apply when the sequence is iterated.
     * 
     * @param f The transformation to apply against each item.
     * @returns a new sequence that when iterated contains the transformed items.
     */
    map<TResult>(f: (item: T) => TResult) {
      function * iter(iterator: Iterable<T>) {
        for (const result of iterator) {
          yield f(result)
        }
      }
  
      return new SlothfulIterable<TResult>(() => iter(this.generator()))
    }

    reduce<TResult>(reducer: (result: TResult, item: T) => TResult, initialValue: TResult) {
      let result = initialValue
      for (const item of this.generator()) {
        result = reducer(result, item)
      }

      return result
    }

    scan<TResult>(reducer: (state: TResult, item: T) => TResult, initialState: TResult) {
      function * iter(iterator: Iterable<T>) {
        let state = initialState
        for (const curr of iterator) {
          state = reducer(state, curr)
          yield state
        }
      }
      
      return new SlothfulIterable<TResult>(() => iter(this.generator()))
    }

    skip(count: number) {
      function * iter(iterator: Iterator<T>) {
        let counter = 0;
        let result = iterator.next()
        while(!result.done) {
          if (counter >= count) {
            yield result.value
          } else {
            counter++
          }
          result = iterator.next()
        }
      }
      
      return new SlothfulIterable(() => iter(this.generator()))
    }
  
    some(predicate: (item: T) => boolean) {
      for (const item of this.generator()) {
        if (predicate(item)) {
          return true
        }
      }

      return false
    }

    take(count: number) {
      function * iter(iterator: Iterator<T>) {
        let counter = 0
        let result = iterator.next()
        while(counter < count && !result.done) {
          yield result.value
          counter++
          result = iterator.next()
        }
      }

      return new SlothfulIterable(() => iter(this.generator()))
    }
  
    takeWhile(predicate: (item: T) => boolean) {
      function * iter(iterator: Iterator<T>) {
        let result = iterator.next()
        while(predicate(result.value) && !result.done) {
          yield result.value
          result = iterator.next()
        }
      }

      return new SlothfulIterable(() => iter(this.generator()))
    }

    cache() {
      const cachedIter = [...this.generator()]
      return new SlothfulIterable(() => cachedIter.values())
    }

    toMap<TKey, TValue>(keySelector: (item: T) => TKey, valueSelector: (item: T) => TValue) {
      let result = new Map<TKey, TValue>()
      for (const item of this.generator()) {
        result.set(keySelector(item), valueSelector(item))
      }

      return result
    }
  }