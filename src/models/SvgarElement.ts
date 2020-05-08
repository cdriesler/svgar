import Geometry from '../geometry/SvgarGeometry'

interface Point3d {
    x: number,
    y: number,
    z: number
}

function newGuid() {
    return 'sxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
    });
}

export default class SvgarElement {

    public material: { [key: string]: string } = {};
    public tags: string[] = [];
    public readonly id: string;

    private geometry: Geometry;
    private cream: any;

    constructor(geometry: Geometry, cream: any) {
        this.id = newGuid();
        this.geometry = geometry;
        this.cream = cream;
    }

    public compile(a: Point3d, i: Point3d, j: Point3d, k: Point3d): number[][] {
        const c = this.geometry.compile();
        return [];
    } 
    
}