import { expect } from 'chai'
import { infinite } from '../../src'

describe('Infinite Take', () => {
    let infiniteSequence = infinite('item')

    it('takes the correct amount', () => {
        const result = infiniteSequence.take(3)
        expect([...result]).to.deep.equal(['item', 'item', 'item'])
    })
})