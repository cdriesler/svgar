import { Svgar } from './index'
import { expect } from 'chai'
import 'mocha'

describe('given this context', () => {

    let svgar: Svgar = new Svgar()

    before(async () => {
        await svgar.initialize()
    })

    it('should allow me to modify the transform', () => {
        const pt = svgar.make(1, 1, 1)
        console.log(pt.render())
        console.log('Moving...')
        pt.translate(2, 3, 4)
        pt.translate(10, 0, 0)
        console.log(pt.render())
    })
})