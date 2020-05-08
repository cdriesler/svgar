import rhino3dm from 'rhino3dm';
import Camera from './SvgarCamera';
import Element from './SvgarElement';
import SvgarGeometry from 'src/geometry/SvgarGeometry';

interface Point3d {
    x: number,
    y: number,
    z: number
}

export default class SvgarCube {
    
    public camera: Camera | undefined;
    public elements: SvgarElementsContext | undefined;

    public svg: string = '';

    private rhinoModule: undefined | any;
    private creamModule: undefined | any;
    
    constructor() {
        
    }

    /**
     * Loads wasm dependencies and stores references in class instance.
     * @remarks This method must be called and successfully resolved before any other functionality.
     * @returns {boolean} - `true` on successful load
     */
    public async initialize(): Promise<boolean> {

        this.creamModule = await import('./../wasm/cream');
        this.camera = new Camera(this.creamModule);

        await rhino3dm().then(rhino => {
            this.rhinoModule = rhino;
            delete rhino['then']
        });

        this.elements = new SvgarElementsContext(this.creamModule, this.rhinoModule);

        return this.creamModule != undefined && this.rhinoModule != undefined;
    }

    public pingWasm(): string {
        return this.creamModule.greet('wasm');
    }

    // Convert coordinates to svg
    public render(w: number, h: number): string {

        const camera = this.camera;
        const [i, j, k] = this.camera.compile();
        const extents = this.camera.extents;

        function toSvg(coordinates: number[]): string {
            if (coordinates.length < 12) return '';

            const x = extents.w;
            const y = extents.h;

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
            // this.elements.map(el => toSvg(el.compile(camera))).join('\n'),
            `</svg>`
        ].join('\n');

        this.svg = svg;

        return svg;
    }
}

import LineCurve from './../geometry/svgar/LineCurve'

class SvgarElementSelection {

    private elements: Element[];

    constructor(elements: Element[]) {
        this.elements = elements;
    }

    public then(callback: (element: Element) => void) {
        this.elements.forEach(el => callback(el));
    }
}

class SvgarElementsContext {

    private elements: Element[];

    private cream: any;
    private rhino: any;

    constructor(cream: any, rhino: any) {
        this.cream = cream;
        this.rhino = rhino;
    }

    public all(): SvgarElementSelection {
        return new SvgarElementSelection(this.elements);
    }

    public find(search: (element: Element) => boolean): SvgarElementSelection {
        return new SvgarElementSelection(this.elements.filter(el => search(el)));
    }

    public remove(search: (element: Element) => boolean): SvgarElementSelection {
        this.elements = this.elements.filter(el => !search(el));
        return new SvgarElementSelection(this.elements);
    }

    public reset(): void {
        this.elements = [];
    }

    private addElementFromRhino(geometry: any): void {
        const object = (this.rhino.CommonObject as any).decode(geometry);
        console.log(object.constructor.name);
        console.log(object.pointAtEnd);
    }

    private addElement(geometry: SvgarGeometry) {
        this.elements.push(new Element(geometry, this.cream));
    }

    public add = {
        rhino: {
            object: ((object: any) => {
                this.addElementFromRhino(object);
            }).bind(this) as (object: any) => void
        },
        svgar: {
            lineCurve: ((from: Point3d, to: Point3d) => {
                this.addElement(new LineCurve(from, to));
            }).bind(this) as (from: Point3d, to: Point3d) => void
        }
    }

}