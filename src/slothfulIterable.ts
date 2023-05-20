export class SlothfulIterable<T> implements Iterable<T> {
    constructor(private generator: () => Generator<T>) {
    }
  
    [Symbol.iterator]() {
      function * iter(iterator: Iterable<T>) {
        for (const item of iterator) {
          yield item;
        }
      }
      return iter(this.generator())
    }

    filter(predicate: (item: T) => boolean) {
      function * filterImpl(iterator: Iterable<T>) {
        for (const result of iterator) {
          if (predicate(result)) {
            yield result;
          }
        }
      }
  
      return new SlothfulIterable<T>(() => filterImpl(this.generator()))
    }

    forEach(action: (item: T) => void) {
      for (const item of this.generator()) {
        action(item);
      }
    }

    map<TResult>(f: (item: T) => TResult) {
      function * mapImpl(iterator: Iterable<T>) {
        for (const result of iterator) {
          yield f(result);
        }
      }
  
      return new SlothfulIterable<TResult>(() => mapImpl(this.generator()))
    }

    scan<TState>(f: (curr: T, state: TState) => TState, initialState: TState) {
      function * scanImpl(iterator: Iterable<T>) {
        let state = initialState
        for (const curr of iterator) {
          state = f(curr, state)
          yield state
        }
      }
      return new SlothfulIterable<TState>(() => scanImpl(this.generator()))
    }

    skip(count: number) {
      function * skipImpl(iterator: Iterator<T>) {
        let counter = 0;
        let result = iterator.next()
        while(!result.done) {
          if (counter >= count) {
            yield result.value;
          } else {
            counter++
          }
          result = iterator.next();
        }
      }
      
      return new SlothfulIterable(() => skipImpl(this.generator()))
    }
  
    take(count: number) {
      function * takeImpl(iterator: Iterator<T>) {
        let counter = 0;
        let result = iterator.next()
        while(counter < count && !result.done) {
          yield result.value;
          counter++;
          result = iterator.next();
        }
      }
      return new SlothfulIterable(() => takeImpl(this.generator()))
    }
  
    takeWhile(predicate: (item: T) => boolean) {
      function * takeWhileImpl(iterator: Iterator<T>) {
        let result = iterator.next()
        while(predicate(result.value) && !result.done) {
          yield result.value;
          result = iterator.next();
        }
      }
      return new SlothfulIterable(() => takeWhileImpl(this.generator()))
    }  
  }