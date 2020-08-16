import rsvg, { Scene } from 'rsvg'
import rhino3dm, { RhinoModule } from 'rhino3dm'
import Element from './SvgarElement'
import { GeometryType } from 'src/enums'

export class SvgarCube {

    private wasm: typeof rsvg | undefined
    private rhino: RhinoModule | undefined
    private scene: rsvg.Scene | undefined

    constructor() {

    }

    public async initialize(): Promise<void> {
        this.wasm = await import('../../node_modules/rsvg')
        await rhino3dm().then((r) => {
            delete r['then']
            this.rhino = r
        })
        this.scene = new Scene()
    }

    public addElement(type: GeometryType): Element {
        const id = this.scene.add_element(type, new Float64Array())

        return new Element(id, type)
    }
}