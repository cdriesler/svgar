import rhino3dm, { RhinoModule } from 'rhino3dm';
import Camera from './SvgarCamera';
import Element from './SvgarElement';

export default class SvgarCube {
    
    public camera: Camera;
    private _elements: Element[];
    get elements(): Element[] {
        console.log('from getter');
        return this._elements;
    }
    set elements(value: Element[]) {
        console.log('from setter');
        value.forEach(el => {
            el.creamModule = this.creamModule;
        })
        this._elements = value;
    }

    private rhinoModule: undefined | RhinoModule;
    private creamModule: undefined | any;
    
    constructor() {
        this.camera = new Camera(this.onCameraChange);
        this.elements = [];
        console.log('constructor done')

        Object.defineProperty(this._elements, "push", {
            enumerable: false,
            configurable: false,
            writable: false,
            value: (element: Element) => {
                element.creamModule = this.creamModule;
                this._elements[this._elements.length] = element;
                console.log('from array push setter')
            }
        })
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
            //this.rhinoModule = await import('./../wasm/rhino3dm')
            this.creamModule = await import('./../wasm/cream');
        } catch (e) {
            console.log(e);
            return false;
        }
        
        return (this.creamModule !== undefined);
    }

    public pingWasm(): string {
        return this.creamModule.greet('wasm');
    }

    public compile(): string {
        return this.elements.map(el => el.compile()).join('\n');
    }

    private onCameraChange(): void {
        console.log('after change')
    }
}