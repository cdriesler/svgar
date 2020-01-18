import SvgarGeometry from '../SvgarGeometry'
import { Point3f } from './../../primitives/Point3f';

export default class LineCurve implements SvgarGeometry {

    private from: Point3f;
    private to: Point3f;

    constructor(from: Point3f, to: Point3f) {
        this.from = from;
        this.to = to;
    }

    // Returns svgar-style coordinates in 3D space
    public compile(): number[] {
        const from = this.from;
        const to = this.to;

        const midpoint: Point3f = {
            x: (from.x + to.x) / 2,
            y: (from.y + to.y) / 2,
            z: (from.z + to.z) / 2
        }

        return [
            from.x,
            from.y,
            from.z,
            midpoint.x,
            midpoint.y,
            midpoint.z,
            midpoint.x,
            midpoint.y,
            midpoint.z,
            to.x,
            to.y,
            to.z
        ]

    }
}