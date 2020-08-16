import rsvg, { Anchor, Scene } from 'rsvg'
import rhino3dm, { RhinoModule, Point3dList } from 'rhino3dm'

export const run = async (): Promise<string> => {
    const wasm = await import('../node_modules/rsvg')
    return wasm.greet()
}
export class Svgar {

    private wasm: typeof rsvg | undefined
    private rhino: RhinoModule | undefined
    public scene: Scene | undefined

    constructor() {}

    public async initialize(): Promise<void> {
        this.wasm = await import('../node_modules/rsvg') 
        await rhino3dm().then((r) => {
            delete r['then']
            this.rhino = r
        })
        this.scene = new Scene()       
    }

    public make(x: number, y: number, z: number): Anchor {
        return new Anchor(x, y, z)
    }

    public testRhino(): void {
        const pts = new this.rhino.Point3dList(1)
        pts.add(1, 2, 3)
    }
}