import LineCurve from './svgar/LineCurve';

export default class SvgarGeometry {
    
    public type: string;
    public transform: number[][];

    constructor(type: string) {
        this.type = type;
        this.transform = [];
    }

    public static compile(geometry: SvgarGeometry): number[] {
        switch(geometry.type) {
            case 'LineCurve':
                const geo = geometry as LineCurve;
                return this.compileLineCurve(geo);
            default:
                console.log(`Geometry type ${geometry.type} currently unsupported.`);
                return [];
        }
    }

    private static compileLineCurve(geometry: LineCurve): number[] {
        const from = geometry.from;
        const to = geometry.to;

        const midpoint = {
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