import { range } from '../../src'
import { expect } from 'chai'

describe('Range iterable', () => {
    it('returns the start of the range as the first item', () => {
        const rangeSequence = range(100, 5)
        const iterator = rangeSequence[Symbol.iterator]()
        expect(iterator.next()).to.deep.equal({ value: 100, done: false })
    })

    it('returns the correct number of items', () => {
        const rangeSequence = range(0, 7)
        const iterator = rangeSequence[Symbol.iterator]()
        
        expect(iterator.next()).to.deep.equal({ value: 0, done: false })
        expect(iterator.next()).to.deep.equal({ value: 1, done: false })
        expect(iterator.next()).to.deep.equal({ value: 2, done: false })
        expect(iterator.next()).to.deep.equal({ value: 3, done: false })
        expect(iterator.next()).to.deep.equal({ value: 4, done: false })
        expect(iterator.next()).to.deep.equal({ value: 5, done: false })
        expect(iterator.next()).to.deep.equal({ value: 6, done: false })
        expect(iterator.next()).to.deep.equal({ value: undefined, done: true })
    })

    it('can be spread into an array', () => {
        const rangeSequence = range(1, 13)
        const result = [...rangeSequence]
        expect(result).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
    })
})