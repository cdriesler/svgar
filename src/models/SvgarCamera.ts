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

    public stage(): [Point3d, Point3d, Point3d] {
        return [this.basisX, this.basisY, this.basisZ];
    }

    /**
     * Translates camera position in world coordinate space.
     * @param {number} x Amount to move in direction of world x axis.
     * @param {number} y Amount to move in direction of world y axis.
     * @param {number} z Amount to move in direction of world z axis.
     */
    public move(x: number, y: number, z: number): void {
        // Cache initial values
        const p = this.position;

        // Apply motion to camera position
        this.position = {
            x: p.x + x,
            y: p.y + y,
            z: p.z + z
        }
    }

    /**
     * Translates camera position along current picture plane.
     * @param {number} x Amount to move in direction of basis x axis.
     * @param {number} y Amount to move in direction of basis y axis.
     */
    public track(x: number, y: number): void {
        // Cache initial values
        const [i, j, k] = this.stage();
        const p = this.position;

        // Calculate component motion
        const tx: Point3d = this.cream.amplitude(i.x, i.y, i.z, x);
        const ty: Point3d = this.cream.amplitude(j.x, j.y, j.z, y);
        
        // Calculate total motion
        const t: Point3d = { 
            x: tx.x + ty.y,
            y: tx.y + ty.y,
            z: tx.z + ty.z
        }

        // Apply motion to camera position
        this.position = {
            x: p.x + t.x,
            y: p.y + t.y,
            z: p.z + t.z
        }
    }

    /**
     * Rotates basis x and z axis about current y axis.
     * @remarks Positive values will look 'left' in picture plane.
     * @param {number} angle Rotation angle in radians.
     * @param {boolean} isDegrees Optional flag to declare input value is in degrees.
     */
    public pan(angle: number, isDegrees: boolean = false): void {
        // Cache initial values
        const [x, y, z] = this.stage();

        // Convert angle to radians if necessary
        const rotation = isDegrees ? angle * (Math.PI / 180) : angle;

        // Perform rotations
        const xr: Point3d = this.cream.rotate(x.x, x.y, x.z, 0, 0, 0, y.x, y.y, y.z, rotation, false);
        const zr: Point3d = this.cream.rotate(z.x, z.y, z.z, 0, 0, 0, y.x, y.y, y.z, rotation, false);

        // Cache result values
        this.basisX = xr;
        this.basisZ = zr;
    }

    /**
     * Rotates basis y and z axis about current x axis.
     * @remarks Positive values will look 'up' in picture plane.
     * @param {number} angle Rotation angle in radians.
     * @param {boolean} isDegrees Optional flag to declare input value is in degrees.
     */
    public tilt(angle: number, isDegrees: boolean = false): void {
        // Cache initial values
        const [x, y, z] = this.stage();

        // Convert angle to radians if necessary
        const rotation = isDegrees ? angle * (Math.PI / 180) : angle;

        // Perform rotations
        const yr: Point3d = this.cream.rotate(y.x, y.y, y.z, 0, 0, 0, x.x, x.y, x.z, rotation, false);
        const zr: Point3d = this.cream.rotate(z.x, z.y, z.z, 0, 0, 0, x.x, x.y, x.z, rotation, false);

        // Cache result values
        this.basisY = yr;
        this.basisZ = zr;
    }

    /**
     * Rotates basis x and y axis about current z axis.
     * @remarks Positive values are counterclockwise in picture plane.
     * @param {number} angle Rotation angle in radians.
     * @param {boolean} isDegrees Optional flag to declare input value is in degrees.
     */
    public rotate(angle: number, isDegrees: boolean = false): void {
        // Cache initial values
        const [x, y, z] = this.stage();

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