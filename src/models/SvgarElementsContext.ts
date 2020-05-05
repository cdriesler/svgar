import SvgarGeometry from './../geometry/SvgarGeometry'
import LineCurve from "./../geometry/svgar/LineCurve";
import rhino3dm, { RhinoModule } from 'rhino3dm';

interface Point3d {
    x: number,
    y: number,
    z: number
}

interface SvgarElement {
    id: string;
    tags: string[];
    material: any;
    geometry: SvgarGeometry;
}

class SvgarElementCollection {

    private elements: SvgarElement[];

    constructor(elements: SvgarElement[]) {
        this.elements = elements;
    }

    public then(callback: (element: SvgarElement) => void): void {
        this.elements.forEach(el => {
            callback(el);
        });
    }
}

export default class SvgarElementsContext {
    
    private elements: SvgarElement[] = [];
    private cream: any;
    private rhino: RhinoModule;
    
    /**
     * @hideconstructor
     */
    constructor(cream: any, rhino: any) {
        this.cream = cream;
        this.rhino = rhino;
    }

    public reset(): void {
        this.elements = [];
    }

    public all(): SvgarElementCollection {
        return new SvgarElementCollection(this.elements);
    }

    public find(search: (element: SvgarElement) => boolean): SvgarElementCollection {
        return new SvgarElementCollection(this.elements.filter(el => search(el)));
    }

    private addElement(geometry: SvgarGeometry): void {
        this.elements.push({
            id: '',
            tags: [],
            material: undefined,
            geometry: geometry
        });
    }

    private addElementFromRhino(geometry: any): void {
        const object = (this.rhino.CommonObject as any).decode(geometry);
        console.log(object.constructor.name);
        console.log(object.pointAtEnd);
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