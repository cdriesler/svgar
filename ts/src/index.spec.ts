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
})