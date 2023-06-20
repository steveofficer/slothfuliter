import { expect } from 'chai'
import { range } from '../../src'

describe('Range Filter', () => {
    let rangeSequence = range(0, 10)

    it('returns nothing when no items match predicate', () => {
        const result = rangeSequence.filter(x => x > 99999)
        expect([...result]).to.be.deep.equal([])
    })

    it('returns everything when all items match predicate', () => {
        const result = rangeSequence.filter(x => x > -1)
        expect([...result]).to.be.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
    
    it('returns only the items that match the predicate', () => {
        const result = rangeSequence.filter(x => x % 2 === 0)
        expect([...result]).to.be.deep.equal([0, 2, 4, 6, 8])
    })

    it('iterates the original iterable when called multiple times', () => {
        const odds = rangeSequence.filter(x => x % 2 === 1)
        expect([...odds]).to.be.deep.equal([0, 1, 3, 5, 7, 9])

        const result = rangeSequence.filter(x => x % 3 === 0)
        expect([...result]).to.be.deep.equal([0, 3, 6, 9])
    })

    it('can be chained', () => {
        const result = rangeSequence
            .filter(x => x % 2 === 0)
            .filter(x => x < 6)
        expect([...result]).to.be.deep.equal([0, 2, 4])
    })
})