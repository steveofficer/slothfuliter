import { expect } from 'chai'
import { range } from '../../src'

describe('Range Scan', () => {
    let rangeSequence = range(5, 4)

    it('returns the aggregated state', () => {
        const result = rangeSequence.scan((result, x) => result + x, 0)
        expect([...result]).to.deep.equal([5, 11, 18, 26])
    })

    it('iterates the original iterable when called multiple times', () => {
        const difference = rangeSequence.scan((result, x) => result - x, 0)
        expect([...difference]).to.deep.equal([-5, -11, -18, -26])

        const fizzBuzz = rangeSequence.scan((result: (string|number)[], x) => {
            let nextResult = [...result]
            if (x % 3 === 0) {
                nextResult.push('flozz')
            } else if (x % 5 === 0) {
                nextResult.push('blozz')
            } else {
                nextResult.push(x)
            }

            return nextResult
        }, [])
        
        expect([...fizzBuzz]).to.deep.equal([
            ['blozz'], 
            ['blozz', 'flozz'], 
            ['blozz', 'flozz', 7], 
            ['blozz', 'flozz', 7, 8]
        ])
    })
})