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
     * @param predicate The function to evaluate each item against.
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
     * This function will not immediately evaluate the sequence and will only apply when the sequence is iterated.
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
     * This function will not immediately evaluate the sequence and will only apply when the sequence is iterated.
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

    /**
     * Iterates over each item the sequence and allows the item to be aggregated into a final result.
     * 
     * @remarks
     * This function will immediately evaluate the sequence.
     * 
     * @param reducer A function that accepts the current result and the current item and returns a new result.
     * @param initialValue The initial result to provide to the very first iteration.
     * @returns The result produced by the final iteration.
     */
    reduce<TResult>(reducer: (result: TResult, item: T) => TResult, initialValue: TResult) {
      let result = initialValue
      for (const item of this.generator()) {
        result = reducer(result, item)
      }

      return result
    }

    /**
     * Operates similarly to {@link reduce}, however it produces the aggregated state after each item is
     * iterated over.
     * 
     * @remarks
     * This function will not immediately evaluate the sequence and will only apply when the sequence is iterated.
     * 
     * @param reducer A function that accepts the current result and the current item and returns a new result.
     * @param initialState The initial result to provide to the very first iteration.
     * @returns a new sequence that when iterated contains the running output of the {@link reducer}.
     */
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

    /**
     * Creates a new sequence that excludes the first {@link count} items
     * 
     * @remarks
     * This function will not immediately evaluate the sequence and will only apply when the sequence is iterated.
     * 
     * @param count The number of items to skip over
     * @returns a new sequence that exludes the first {@link count} items
     */
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
  
    /**
     * Similar to {@link every} with the exception that it only requires a single item to match the predicate.
     * 
     * @remarks
     * This function will immediately evaluate the sequence.
     * 
     * @param predicate The function to evaluate each item against.
     * @returns true if at least one item matches the predicate, otherwise false.
     */
    some(predicate: (item: T) => boolean) {
      for (const item of this.generator()) {
        if (predicate(item)) {
          return true
        }
      }

      return false
    }

    /**
     * Creates a new sequence that contains at most {@link count} items.
     * 
     * @remarks
     * This function will not immediately evaluate the sequence and will only apply when the sequence is iterated.
     * 
     * @param count The number of items to return from the underlying sequence
     * @returns a new sequence that contains at most {@link count} items
     */
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
  
    /**
     * Creates a new sequence that terminates when the provided predicate is fulfilled.
     * 
     * @remarks
     * This function will not immediately evaluate the sequence and will only apply when the sequence is iterated.
     * 
     * @param predicate The function to evaluate each item against.
     * @returns a sequence that terminates when either the underlying sequence is done, or {@link predicate} is fulfilled.
     */
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

    /**
     * Iterates the underlying sequence once and then returns a new sequence based on the values obtained from the first iteration.
     * 
     * @remarks
     * This function will immediately evaluate the sequence.
     * 
     * @returns a new sequence based on the values obtained from the immediate evaluation of the underlying sequence.
     */
    cache() {
      const cachedIter = [...this.generator()]
      return new SlothfulIterable(() => cachedIter.values())
    }

    /**
     * Converts the underlying sequence to a Map
     * 
     * @remarks
     * This function will immediately evaluate the sequence.
     * 
     * @param keySelector A function that returns the key for the Map given the current item from the sequence
     * @param valueSelector A function that returns the value for the Map given the current item from the sequence
     * @returns A Map that is derived from the underlying sequence.
     */
    toMap<TKey, TValue>(keySelector: (item: T) => TKey, valueSelector: (item: T) => TValue) {
      let result = new Map<TKey, TValue>()
      for (const item of this.generator()) {
        result.set(keySelector(item), valueSelector(item))
      }

      return result
    }
  }