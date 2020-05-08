import SvgarGeometry from '../SvgarGeometry'

interface Point3d {
    x: number,
    y: number,
    z: number
}

export default class LineCurve extends SvgarGeometry {

    public from: Point3d;
    public to: Point3d;

    constructor(from: Point3d, to: Point3d) {
        super('LineCurve');
        this.from = from;
        this.to = to;
    }

    public compile(): number[][] {
        const from = this.from;
        const to = this.to;

        const midpoint: Point3d = {
            x: (from.x + to.x) / 2,
            y: (from.y + to.y) / 2,
            z: (from.z + to.z) / 2
        }

        return [[
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
        ]]

    }
}