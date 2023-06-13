import { expect } from 'chai'
import { range } from '../../src'

describe('Range Reduce', () => {
    let rangeSequence = range(5, 4)

    it('returns the aggregated state', () => {
        const result = rangeSequence.reduce((result, x) => result + x, 0)
        expect(result).to.deep.equal(26)
    })

    it('iterates the original iterable when called multiple times', () => {
        const difference = rangeSequence.reduce((result, x) => result - x, 0)
        expect(difference).to.deep.equal(-26)

        const fizzBuzz = rangeSequence.reduce((result: (string|number)[], x) => {
            if (x % 3 === 0) {
                result.push('flozz')
            } else if (x % 5 === 0) {
                result.push('blozz')
            } else {
                result.push(x)
            }

            return result
        }, [])
        expect(fizzBuzz).to.deep.equal(['blozz', 'flozz', 7, 8])
    })
})