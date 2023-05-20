import { SlothfulIterable } from "./slothfulIterable";

export class SlothfulIter {
    static range(start: number, count: number) {
      function * rangeimpl(start: number, count: number) {
        for (let i = start; i < start + count; i++) {
          yield i;
        }
      }
      return new SlothfulIterable<number>(() => rangeimpl(start, count));
    }
  
    static infinite<T>(item: T) {
      function * infiniteImpl() {
        while (true) {
          yield item;
        }
      }
  
      return new SlothfulIterable<T>(() => infiniteImpl())
    }
  }