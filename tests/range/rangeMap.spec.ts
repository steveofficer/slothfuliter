import { expect } from 'chai'
import { SlothfulIter } from '../../src'

describe('Range Map', () => {
    let rangeSequence = SlothfulIter.range(0, 4)

    it('returns the transformed values', () => {
        const result = rangeSequence.map(x => x*2)
        expect([...result]).to.deep.equal([0, 2, 4, 6])
    })

    it('iterates the original iterable when called multiple times', () => {
        const result1 = rangeSequence.map(x => x*2)
        expect([...result1]).to.deep.equal([0, 2, 4, 6])

        const result2 = rangeSequence.map(x => x*3)
        expect([...result2]).to.deep.equal([0, 3, 6, 9])
    })

    it('can be chained', () => {
        const result = rangeSequence
          .map(x => x*2)
          .map(x => x*3)
        expect([...result]).to.deep.equal([0, 6, 12, 18])
    })
})