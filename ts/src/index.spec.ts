import { run } from './index'
import { expect } from 'chai'
import 'mocha'

describe('given this context', () => {

    let message = 'waiting'

    before(async () => {
        message = await run()
    })

    it('should run without issues', () => {
        expect(message).to.equal("Howdy, from wasm!")
    })
})