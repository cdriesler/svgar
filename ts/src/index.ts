import rsvg, { Anchor, Scene } from 'rsvg'

export const run = async (): Promise<string> => {
    const wasm = await import('../node_modules/rsvg')
    return wasm.greet()
}
export class Svgar {

    private wasm: typeof rsvg | undefined
    public scene: Scene | undefined

    constructor() {}

    public async initialize(): Promise<void> {
        this.wasm = await import('../node_modules/rsvg') 
        this.scene = new Scene()       
    }

    public make(x: number, y: number, z: number): Anchor {
        return new Anchor(x, y, z)
    }

    public add
}