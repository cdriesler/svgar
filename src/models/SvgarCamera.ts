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

    public reset(): void {
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

    /**
     * Rotates basis x and y axis about current z axis.
     * @remarks Positive values are counterclockwise in picture plane.
     * @param {number} angle Rotation angle in radians.
     * @param {boolean} isDegrees Optional flag to declare input value is in degrees.
     */
    public rotate(angle: number, isDegrees: boolean = false): void {
        // Cache initial values
        const x = this.basisX;
        const y = this.basisY;
        const z = this.basisZ;

        // Convert angle to radians if necessary
        const rotation = isDegrees ? angle * (Math.PI / 180) : angle;

        // Perform rotations
        const xr: Point3d = this.cream.rotate(x.x, x.y, x.z, 0, 0, 0, z.x, z.y, z.z, rotation, false);
        const yr: Point3d = this.cream.rotate(y.x, y.y, y.z, 0, 0, 0, z.x, z.y, z.z, rotation, false);

        // Cache result values
        this.basisX = xr;
        this.basisY = yr;
    }

    public target(x: number, y: number, z: number): void {

    }
    
}