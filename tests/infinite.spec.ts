import { SlothfulIter } from '../src'
import { expect } from 'chai'

describe('Infinite iterable', () => {
    it('can be initialized', () => {
        const infiniteSequence = SlothfulIter.infinite<string>('hello')
        const iterator = infiniteSequence[Symbol.iterator]()
        expect(iterator.next()).to.deep.equal({ value: 'hello', done: false })
    })
})