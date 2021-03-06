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
    public w: number = 100;
    public h: number = 100;

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

        this.elements = new SvgarElementsContext(this.creamModule, {});

        try {
        await rhino3dm().then(rhino => {
            this.rhinoModule = rhino;
            delete rhino['then']
        })
        } catch {

        }
        
        if (!this.rhinoModule) {
            console.log('Failed to load rhino3dm wasm. Falling back to svgar-only mode.')
            this.rhinoModule = {};
        }    

        this.elements = new SvgarElementsContext(this.creamModule, this.rhinoModule);

        return this.creamModule != undefined && this.rhinoModule != undefined;
    }

    public pingWasm(): string {
        return this.creamModule.greet('wasm');
    }

    public render(w?: number, h?: number): string {
        const [i, j, k] = this.camera.compile();
        const p = this.camera.position;

        this.w = w || this.w;
        this.h = h || this.h;

        const renderData: { coordinates: number[], distance: number, style: string }[] = [];

        this.elements.all().then(el => {
            const [ coordinates, distances ] = el.compile(p, i, j, k);
            const mat: string = Object.keys(el.material).map(x => { return `${x}="${el.material[x]}"` }).join(' ');

            coordinates.forEach((x, i) => {
                renderData.push({
                    coordinates: coordinates[i],
                    distance: distances[i],
                    style: mat
                })
            })
        });

        // Sort elements
        const sortedData = renderData.sort((a, b) => a.distance - b.distance);

        const paths: string[] = sortedData.map(element => {

            const el = element.coordinates;

            let path = `<path d="M ${el[0]} ${el[1]}`;

            for(let i = 0; i < el.length; i+=8) {
                path = path + ` C ${el[i + 2]} ${el[i + 3]}, ${el[i + 4]} ${el[i + 5]}, ${el[i + 6]} ${el[i + 7]}`
            };

            path = path + `" vector-effect="non-scaling-stroke" ${element.style} />`;

            return path;
        })
        
        const svg = [
            `<svg width="${this.w}" height="${this.h}" viewBox="-${this.camera.extents.w / 2} -${this.camera.extents.h / 2} ${this.camera.extents.w} ${this.camera.extents.h}" xmlns="http://www.w3.org/2000/svg">`,
            paths.join("\n"),
            `</svg>`
        ].join("\n");

        this.svg = svg;

        return svg;
    }

}

import Box from './../geometry/svgar/Box'
import LineCurve from './../geometry/svgar/LineCurve'
import Polyline from './../geometry/svgar/Polyline'
import Sphere from './../geometry/svgar/Sphere'

class SvgarElementSelection {

    private elements: Element[];

    constructor(elements: Element[]) {
        this.elements = elements;
    }

    public then(callback: (element: Element) => void) {
        this.elements.forEach(el => callback(el));
    }
}

interface SvgarAddElementContext {
    rhino: {
        object: (object: any) => void
    },
    svgar: {
        box: (min: Point3d, max: Point3d) => SvgarElementSelection,
        lineCurve: (from: Point3d, to: Point3d) => SvgarElementSelection,
        polyline: (pts: Point3d[], isClosed?: boolean) => SvgarElementSelection,
        sphere: (center: Point3d, radius: number) => SvgarElementSelection
    }
}

class SvgarElementsContext {

    private elements: Element[] = [];

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

    private addElement(geometry: SvgarGeometry): Element {
        const el = new Element(geometry, this.cream);
        this.elements.push(el);
        return el;
    }

    public add: SvgarAddElementContext = {
        rhino: {
            object: ((object: any) => {
                this.addElementFromRhino(object);
            }).bind(this)
        },
        svgar: {
            box: ((min: Point3d, max: Point3d): SvgarElementSelection => {
                const geo = new Box(min, max);
                const el = this.addElement(geo);
                return new SvgarElementSelection([el]);
            }).bind(this),
            lineCurve: ((from: Point3d, to: Point3d): SvgarElementSelection => {
                const geo = new LineCurve(from, to);
                const el = this.addElement(geo);
                return new SvgarElementSelection([el]);
            }).bind(this),
            polyline: ((pts: Point3d[], isClosed?: boolean): SvgarElementSelection => {
                const geo = new Polyline(pts, isClosed);
                const el = this.addElement(geo);
                return new SvgarElementSelection([el]);
            }).bind(this),
            sphere: ((center: Point3d, radius: number): SvgarElementSelection => {
                const geo = new Sphere(center, radius);
                const el = this.addElement(geo);
                return new SvgarElementSelection([el]);
            })
        }
    }

}