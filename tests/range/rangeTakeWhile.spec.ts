import { expect } from 'chai'
import { SlothfulIter } from '../../src'

describe('Range TakeWhile', () => {
    let rangeSequence = SlothfulIter.range(0, 10)

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
})