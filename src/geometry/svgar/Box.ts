import SvgarGeometry from '../SvgarGeometry'

interface Point3d {
    x: number,
    y: number,
    z: number
}

function mid(a: Point3d, b: Point3d): Point3d {
    return {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2,
        z: (a.z + b.z) / 2
    }
}

function fitOrthogonalQuad(a: Point3d, b: Point3d, tolerance: number = 1): number[] {
    const o = [
        Math.abs(a.z - b.z), //xy
        Math.abs(a.y - b.y), //xz
        Math.abs(a.x - b.x)  //yz
    ]

    if (!o.find(x => x < tolerance)) {
        throw new Error('No quad available within tolerance.')
    }

    const orientation = o.indexOf(Math.min(...o));

    const m = mid(a, b);
    let c: number[] = [];

    switch(orientation) {
        case 0:
            // xy plane
            // a.z alignment
            c = [
                a.x,
                a.y,
                a.z,
                m.x,
                a.y,
                a.z,
                m.x,
                a.y,
                a.z,
                b.x,
                a.y,
                a.z, // 01
                b.x,
                a.y,
                a.z,
                b.x,
                m.y,
                a.z,
                b.x,
                m.y,
                a.z,
                b.x,
                b.y,
                a.z, // 02
                b.x,
                b.y,
                a.z,
                m.x,
                b.y,
                a.z,
                m.x,
                b.y,
                a.z,
                a.x,
                b.y,
                a.z, // 03
                a.x,
                b.y,
                a.z,
                a.x,
                m.y,
                a.z,
                a.x,
                m.y,
                a.z,
                a.x,
                a.y,
                a.z, // 04
            ]
            break;
        case 1:
            // xz plane
            // a.y alignment
            c = [
                a.x,
                a.y,
                a.z,
                m.x,
                a.y,
                a.z,
                m.x,
                a.y,
                a.z,
                b.x,
                a.y,
                a.z, // 01
                b.x,
                a.y,
                a.z,
                b.x,
                a.y,
                m.z,
                b.x,
                a.y,
                m.z,
                b.x,
                a.y,
                b.z, // 02
                b.x,
                a.y,
                b.z,
                m.x,
                a.y,
                b.z,
                m.x,
                a.y,
                b.z,
                a.x,
                a.y,
                b.z, // 03
                a.x,
                a.y,
                b.z,
                a.x,
                a.y,
                m.z,
                a.x,
                a.y,
                m.z,
                a.x,
                a.y,
                a.z, // 04
            ]
            break;
        case 2:
            // yz plane
            // a.x alignment
            c = [
                a.x,
                a.y,
                a.z,
                a.x,
                m.y,
                a.z,
                a.x,
                m.y,
                a.z,
                a.x,
                b.y,
                a.z, // 01
                a.x,
                b.y,
                a.z,
                a.x,
                b.y,
                m.z,
                a.x,
                b.y,
                m.z,
                a.x,
                b.y,
                b.z, // 02
                a.x,
                b.y,
                b.z,
                a.x,
                m.y,
                b.z,
                a.x,
                m.y,
                b.z,
                a.x,
                a.y,
                b.z, // 03
                a.x,
                a.y,
                b.z,
                a.x,
                a.y,
                m.z,
                a.x,
                a.y,
                m.z,
                a.x,
                a.y,
                a.z, // 04
            ]
            break;
        default:
            throw new Error();
    } 

    return c;
}

export default class Box extends SvgarGeometry {

    public min: Point3d;
    public max: Point3d;

    constructor(min: Point3d, max: Point3d) {
        super('Box');
        this.min = min;
        this.max = max;
    }

    public compile(): number[][] {
        const min = this.min;
        const max = this.max;

        const faces: [Point3d, Point3d][] = [
            [ { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 } ]
        ]

        return faces.map(x => fitOrthogonalQuad(x[0], x[1]));
    }

}