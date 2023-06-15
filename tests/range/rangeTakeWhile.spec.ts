import { expect } from 'chai'
import { range } from '../../src'

describe('Range TakeWhile', () => {
    let rangeSequence = range(0, 10)

    it('takes the correct amount', () => {
        const result = rangeSequence.takeWhile(x => x < 5)
        expect([...result]).to.deep.equal([0, 1, 2, 3, 4])
    })

    it('iterates the original iterable when called multiple times', () => {
        const result1 = rangeSequence.takeWhile(x => x < 3)
        expect([...result1]).to.deep.equal([0, 1, 2])

        const result2 = rangeSequence.takeWhile(x => x < 4)
        expect([...result2]).to.deep.equal([0, 1, 2, 3])
    })

    it('can be chained', () => {
        const result = rangeSequence
          .takeWhile(x => x < 5)
          .takeWhile(x => x < 2)
        expect([...result]).to.deep.equal([0, 1])
    })

    it('iterates the entire sequence if predicate is always true', () => {
        const result = rangeSequence.takeWhile(x => x < 99999)
        expect([...result]).to.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
})