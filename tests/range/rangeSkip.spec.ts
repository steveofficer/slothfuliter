import { expect } from 'chai'
import { range } from '../../src'

describe('Range Skip', () => {
    let rangeSequence = range(0, 10)

    it('skips the correct amount', () => {
        const result = rangeSequence.skip(3)
        expect([...result]).to.deep.equal([3, 4, 5, 6, 7, 8, 9])
    })

    it('iterates the original iterable when called multiple times', () => {
        const result1 = rangeSequence.skip(5)
        expect([...result1]).to.deep.equal([5, 6, 7, 8, 9])

        const result2 = rangeSequence.skip(3)
        expect([...result2]).to.deep.equal([3, 4, 5, 6, 7, 8, 9])
    })

    it('can be chained', () => {
        const result = rangeSequence
          .skip(5)
          .skip(2)
        expect([...result]).to.deep.equal([7, 8, 9])
    })
})