import rhino3dm from 'rhino3dm';
import Camera from './SvgarCamera';
import Element from './SvgarElement';

export default class SvgarCube {
    
    public camera: Camera;
    private _elements: Element[];
    get elements(): Element[] {
        return this._elements;
    }
    set elements(value: Element[]) {
        value.forEach(el => {
            el.creamModule = this.creamModule;
        })
        this._elements = value;
    }

    public svg: string = '';

    private rhinoModule: undefined | any;
    private creamModule: undefined | any;
    
    constructor() {
        this.elements = [];
        this.camera = new Camera();

        Object.defineProperty(this._elements, "push", {
            enumerable: false,
            configurable: false,
            writable: false,
            value: (el: Element) => {
                el.creamModule = this.creamModule;
                this._elements[this._elements.length] = el;
            }
        });
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

        this.creamModule = await import('./../wasm/cream');

        rhino3dm().then(rhino => {
            this.rhinoModule = rhino;
        });

        // ( Chuck ) Current version of rhino3dm module "promise" does not resolve. Terrible temp workaround below.
        const wait = new Promise(resolve => setTimeout(resolve, 1000));
        await wait;

        return this.creamModule != undefined && this.rhinoModule != undefined;
    }

    public pingWasm(): string {
        return this.creamModule.greet('wasm');
    }

    // Convert coordinates to svg
    public render(w: number, h: number): string {

        const camera = this.camera;

        function toSvg(coordinates: number[]): string {
            if (coordinates.length < 12) return '';

            const x = camera.extents.w;
            const y = camera.extents.h;

            const xMax = x / 2;
            const xMin = x / -2;
            const yMax = y / 2;
            const yMin = y / -2;

            const c = coordinates;

            function normalize(min: number, max: number, value: number): number {
                return (value - min) / (max - min);
            }

            function toX(value: number): number {
                return normalize(xMin, xMax, value) * w;
            }

            function toY(value: number): number {
                return h - (normalize(yMin, yMax, value) * h);
            }

            var d: string[] = [`M ${toX(c[0])} ${toY(c[1])}`];

            for (let i = 0; i < coordinates.length; i+=12) {
                d.push(`C ${toX(c[i + 3])} ${toY(c[i + 4])} ${toX(c[i + 6])} ${toY(c[i + 7])} ${toX(c[i + 9])} ${toY(c[i + 10])}`);
            }
            return `<path d="${d.join(' ')}" stroke="black" fill="none" stroke-linecap="round" stroke-width="0.7mm" />`;
        }

        const svg = [
            `<svg version="1.1" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">`,
            this.elements.map(el => toSvg(el.compile(camera))).join('\n'),
            `</svg>`
        ].join('\n');

        this.svg = svg;

        return svg;
    }
}