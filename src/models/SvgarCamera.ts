interface Point3d {
    x: number,
    y: number,
    z: number
}

export default class SvgarCamera {

    // All basis values to be anchored to origin and unitized
    // basisZ points away from subject, towards viewer, for intuitive rotation (+ is CCW)
    private basisX: Point3d;
    private basisY: Point3d;
    private basisZ: Point3d;

    // Simpler interface
    public position: Point3d;
    // Determines what is 'in frame'
    public extents: { w: number, h: number };

    private cream: any;

    constructor(cream: any) {
        this.reset();
        this.cream = cream;
    }

    private reset(): void {
        this.basisX = { x: 1, y: 0, z: 0 }
        this.basisY = { x: 0, y: 1, z: 0 }
        this.basisZ = { x: 0, y: 0, z: 1 }
        this.position = { x: 0, y: 0, z: 0 }
        this.extents = { w: 10, h: 0 }
    }

    public compile(): [Point3d, Point3d] {
        return [this.position, this.basisZ];
    }

    public getBasis(): [Point3d, Point3d, Point3d] {
        return [this.basisX, this.basisY, this.basisZ];
    }

    public move(x: number, y: number, z: number): void {

    }

    public track(x: number, y: number): void {

    }

    // + left
    public pan(angle: number, isDegrees: boolean = false): void {

    }

    // + up
    public tilt(angle: number, isDegrees: boolean = false): void {

    }

    // + CCW
    public rotate(angle: number, isDegrees: boolean = false): void {

    }

    public target(x: number, y: number, z: number): void {

    }
    
}