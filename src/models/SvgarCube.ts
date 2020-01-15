import rhino3dm, { RhinoModule } from 'rhino3dm';
import Camera from './SvgarCamera';
import Element from './SvgarElement';

export default class SvgarCube {
    
    public camera: Camera;
    public elements: Element[];

    private rhinoModule: undefined | RhinoModule;
    private creamModule: undefined | any;
    
    constructor() {
        this.camera = new Camera(this.onCameraChange);
        this.elements = [];
    }

    /**
     * Loads wasm dependencies and stores references in class instance.
     * 
     * @remarks
     * This method must be called and successfully resolved before any other functionality.
     * 
     * @returns `true` on successful load
     */
    public async initialize(): Promise<boolean> {
        try {
            const rhino = await rhino3dm();
            const cream = await import('./../wasm/cream');
        } catch (e) {
            console.log(e);
            return false;
        }

        return (this.rhinoModule !== undefined && this.creamModule !== undefined);
    }

    private onCameraChange(): void {
        console.log('after change')
    }
}