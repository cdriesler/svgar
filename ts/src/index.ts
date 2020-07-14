import rsvg, { Anchor } from 'rsvg'

export const run = async (): Promise<string> => {
    const wasm = await import('../node_modules/rsvg')
    return wasm.greet()
}

export class Svgar {

    private wasm: typeof rsvg | undefined

    constructor() {}

    public async initialize(): Promise<void> {
        this.wasm = await import('../node_modules/rsvg')
    }

    public doThing(): string {
        const a = this.wasm.Anchor.new(0, 0, 0)
        const b = Anchor.new(1, 1, 1)

        a.move_thing()
        console.log(`${a.render()}`)
        console.log(`${b.render()}`)

        return b.render()
    }

    public make(x: number, y: number, z: number): Anchor {
        console.log('making')
        return this.wasm.Anchor.new(x, y, z)
    }
}