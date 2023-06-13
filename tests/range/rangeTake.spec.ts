import { expect } from 'chai'
import { range } from '../../src'

describe('Range Take', () => {
    let rangeSequence = range(0, 10)

    it('takes the correct amount', () => {
        const result = rangeSequence.take(3)
        expect([...result]).to.deep.equal([0, 1, 2])
    })

    it('iterates the original iterable when called multiple times', () => {
        const result1 = rangeSequence.take(3)
        expect([...result1]).to.deep.equal([0, 1, 2])

        const result2 = rangeSequence.take(3)
        expect([...result2]).to.deep.equal([0, 1, 2])
    })

    it('can be chained', () => {
        const result = rangeSequence
          .take(5)
          .take(2)
        expect([...result]).to.deep.equal([0, 1])
    })
})