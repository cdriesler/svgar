import rsvg, { Scene } from 'rsvg'
import Element from './SvgarElement'
import { GeometryType } from 'src/enums'

export class SvgarCube {

    private wasm: typeof rsvg | undefined
    private scene: rsvg.Scene | undefined

    constructor() {

    }

    public async initialize(): Promise<void> {
        this.wasm = await import('../../node_modules/rsvg')
        this.scene = new Scene()
    }

    public addElement(type: GeometryType): Element {
        const id = this.scene.add_element(type, new Float64Array())

        return new Element(id, type)
    }
}