import { expect } from 'chai'
import { range } from '../../src'
import { SlothfulIterable } from '../../src'

describe('Range Cache', () => {
    let rangeSequence = range(0, 5)

    describe('iterable without cache', () => {
        let counter: number
        let iterable: SlothfulIterable<number>

        before(() => {
            counter = 0

            iterable = rangeSequence
                .map(x => {
                    counter++
                    return x
                })
        })

        it('starts without being iterated', () => {
            expect(counter).to.equal(0)
        })

        it('Runs pipeline on first iteration', () => {
            expect([...iterable]).to.deep.equal([0, 1, 2, 3, 4])
            expect(counter).to.equal(5)
        })

        it('Re-runs pipeline on second iteration', () => {
            expect([...iterable]).to.deep.equal([0, 1, 2, 3, 4])
            expect(counter).to.equal(10)
        })
    })

    describe('iterable with cache', () => {
        let counter: number
        let iterable: SlothfulIterable<number>

        before(() => {
            counter = 0

            iterable = rangeSequence
                .map(x => {
                    counter++
                    return x
                })
                .cache()
        })

        it('starts in an iterated state', () => {
            expect(counter).to.equal(5)
        })

        it('Does not run pipeline on first iteration', () => {
            expect([...iterable]).to.deep.equal([0, 1, 2, 3, 4])
            expect(counter).to.equal(5)
        })

        it('Does not re-run pipeline on second iteration', () => {
            expect([...iterable]).to.deep.equal([0, 1, 2, 3, 4])
            expect(counter).to.equal(10)
        })
    })
})