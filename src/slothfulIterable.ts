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

    every(predicate: (item: T) => boolean) {
      for (const item of this.generator()) {
        if (!predicate(item)) {
          return false
        }
      }

      return true
    }

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

    forEach(action: (item: T) => void) {
      for (const item of this.generator()) {
        action(item)
      }
    }

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