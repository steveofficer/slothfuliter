import { expect } from 'chai'
import { range } from '../../src'

describe('Range Every', () => {
    let rangeSequence = range(0, 10)

    it('returns true if all items match predicate', () => {
        const result = rangeSequence.every(x => x < 99999)
        expect(result).to.be.true
    })

    it('returns false if only 1 item matches predicate', () => {
        const result = rangeSequence.every(x => x === 8)
        expect(result).to.be.false
    })
    
    it('returns false if only 1 item fails to match predicate', () => {
        const result = rangeSequence.every(x => x !== 7)
        expect(result).to.be.false
    })

    it('returns false if no items match predicate', () => {
        const result = rangeSequence.every(x => x === 9999)
        expect(result).to.be.false
    })

    it('iterates the original iterable when called multiple times', () => {
        const result1 = rangeSequence.takeWhile(x => x < 3)
        expect([...result1]).to.deep.equal([0, 1, 2])

        const result2 = rangeSequence.takeWhile(x => x < 4)
        expect([...result2]).to.deep.equal([0, 1, 2, 3])
    })
})