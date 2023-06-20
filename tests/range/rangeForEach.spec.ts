import { expect } from 'chai'
import { range } from '../../src'

describe('Range Every', () => {
    let rangeSequence = range(0, 10)

    it('iterates over all items', () => {
        const items: number[] = []
        rangeSequence.forEach(x => items.push(x))
        expect(items).to.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    })

    it('iterates the original iterable when called multiple times', () => {
        const items1: number[] = []
        rangeSequence.forEach(x => items1.push(x))
        expect(items1).to.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

        const items2: number[] = []
        rangeSequence.forEach(x => items2.push(x))
        expect(items2).to.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
})