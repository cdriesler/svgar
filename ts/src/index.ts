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

    public make(x: number, y: number, z: number): Anchor {
        return new Anchor(x, y, z)
    }
}