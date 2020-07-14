import { Svgar } from './index'
import { expect } from 'chai'
import 'mocha'

describe('given this context', () => {

    let svgar: Svgar = new Svgar()

    before(async () => {
        await svgar.initialize()
    })

    it('should run without issues', () => {
        svgar.doThing()
    })

    it('should allow me to modify the transform', () => {
        const pt = svgar.make(1, 2, 3)
        console.log(pt.render())
        console.log(pt.render_transform())
        console.log('Moving...')
        pt.translate(2, 3, 4)
        console.log(pt.render_transform())
    })
})