import { infinite } from '../../src'
import { expect } from 'chai'

describe('Infinite iterable', () => {
    it('can be initialized', () => {
        const infiniteSequence = infinite<string>('hello')
        const iterator = infiniteSequence[Symbol.iterator]()
        expect(iterator.next()).to.deep.equal({ value: 'hello', done: false })
    })
})