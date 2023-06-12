import { expect } from 'chai'
import { SlothfulIter } from '../../src'

describe('Infinite Take', () => {
    let infiniteSequence = SlothfulIter.infinite('item')

    it('takes the correct amount', () => {
        const result = infiniteSequence.take(3)
        expect([...result]).to.deep.equal(['item', 'item', 'item'])
    })
})