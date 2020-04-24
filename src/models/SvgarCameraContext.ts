interface Point3d {
    x: number,
    y: number,
    z: number
}

interface SvgarCamera {
    position: Point3d;
    target: Point3d;
    extents: { w: number, h: number }; 
    rotation: number;
}

export default class SvgarCameraContext {

    private camera: SvgarCamera;
    private cream: any;

    get position(): Point3d {
        return this.camera.position;
    }
    set position(value: Point3d) {
        this.camera.position = value;
    }

    get target(): Point3d {
        return this.camera.target;
    }
    set target(value: Point3d) {
        this.camera.target = value;
    }

    get extents(): {w: number, h: number} {
        return this.camera.extents;
    }
    set extents(value: {w: number, h: number}) {
        this.camera.extents = value;
    }

    /**
     * Current camera rotation in radians.
     * @remarks Rotation is CCW in picture plane.
     */
    get rotation(): number {
        return this.camera.rotation;
    }
    set rotation(value: number) {
        this.camera.rotation = value;
    }

    /**
     * @hideconstructor
     */
    constructor(cream: any) {
        this.reset();
        this.cream = cream;
    }

    /**
     * Generate camera information necessary for render.
     * @returns {Array<Point3d>} [position, normal, extents: { x: w, y: h, z: 0 }]
     */
    public compile(): Point3d[] {
        return [
            this.position,
            this.getNormal(),
            this.getExtents()
        ];
    }

    private getNormal(): Point3d {
        return {
            x: this.target.x - this.position.x,
            y: this.target.y - this.position.y,
            z: this.target.z - this.position.z
        }
    }

    private getExtents(): Point3d {
        return {
            x: this.extents.w,
            y: this.extents.h,
            z: 0
        }
    }

    /**
     * @returns {Point3d} Vector representation of positive x axis anchored at the origin
     */
    private getBasisX(): Point3d {
        const n = this.getNormal();
        const y: Point3d = this.normalIsVertical()[0] 
            ? { x: 1, y: 0, z: 0 }
            : this.cream.cross(n.x, n.y, n.z, 0, 0, 1);
        const rot: Point3d = this.cream.rotate(y.x, y.y, y.z, 0, 0, 0, n.x, n.y, n.z, this.getInverseRotation(), false);
        
        const pt: Point3d = { x: rot.x, y: rot.y, z: rot.z };

        return pt;
    }

    /**
     * @returns {Point3d} Vector representation of positive y axis anchored at the origin
     */
    private getBasisY(): Point3d {
        const n = this.getNormal();
        const y = this.getBasisX();

        return this.cream.rotate(y.x, y.y, y.z, 0, 0, 0, n.x, n.y, n.z, -90, true);
    }

    /**
     * Helper function that returns `this.rotation * -1`
     * @remarks Meant to increase code legibility.
     */
    private getInverseRotation(): number {
        return this.rotation * -1;
    }

    /**
     * @returns {Array<boolean>} [ true if vertical, true if +z ]
     */
    private normalIsVertical(): boolean[] {
        const n = this.getNormal();
        const vertical = n.x == 0 && n.y == 0 && n.z != 0;

        return vertical 
            ? [true, n.z > 0]
            : [false, false]
    }

    /**
     * Reset camera to default 2D configuration.
     */
    public reset(): void {
        this.camera = {
            position: { 
                x: 0,
                y: 0,
                z: 0 
            },
            target: {
                x: 0,
                y: 0,
                z: -1
            },
            extents: {
                w: 10,
                h: 10
            },
            rotation: 0
        }
    }

    /**
     * Translate camera position and target in world coordinate space.
     * @param {number} x Magnitude of x coordinate translation. 
     * @param {number} y Magnitude of y coordinate translation. 
     * @param {number} z Magnitude of z coordinate translation. 
     */
    public move(x: number, y: number, z: number): void {
        this.movePosition(x, y, z);
        this.moveTarget(x, y, z);
    }

    /**
     * Translate camera position in world coordinate space.
     * @argument {number} x Magnitude of x coordinate translation.
     * @argument {number} y Magnitude of y coordinate translation.
     * @argument {number} z Magnitude of z coordinate translation.
     */
    public movePosition(x: number, y: number, z: number): void {
        const currentPosition = this.position;
        this.position = {
            x: currentPosition.x + x,
            y: currentPosition.y + y,
            z: currentPosition.z + z
        }
    }

    /**
     * Translate camera target in world coordinate space.
     * @argument {number} x Magnitude of x coordinate translation.
     * @argument {number} y Magnitude of y coordinate translation.
     * @argument {number} z Magnitude of z coordinate translation.
     */
    public moveTarget(x: number, y: number, z: number): void {
        const currentTarget = this.target;
        this.target = {
            x: currentTarget.x + x,
            y: currentTarget.y + y,
            z: currentTarget.z + z
        }
    }

    /**
     * Translate camera position and target in current orientation's plane.
     * @param {number} x Magnitude of x coordinate translation. 
     * @param {number} y Magnitude of y coordinate translation. 
     */
    public track(x: number, y: number): void {

    }

    /**
     * Modify rotation of camera orientation plane.
     * @param {number} angle Angle (in radians) to rotate plane ccw.
     * @param {boolean} isDegrees Optional flag to declare input angle is in degrees.
     */
    public rotate(angle: number, isDegrees: boolean = false): void {
        const rotation = isDegrees
            ? (Math.PI / 180) * angle
            : angle;
        this.rotation = this.rotation + rotation;
    }

    /**
     * Have camera 'look' up or down. Rotates camera target about x axis of camera
     * position's orientation plane. Current camera rotation is considered.
     * @param {number} angle Angle (in radians) to rotate target. Positive is upwards.
     * @param {boolean} isDegrees Optional flag to declare input angle is in degrees. 
     */
    public tilt(angle: number, isDegrees: boolean = false): void {
        // Cache necessary initial values
        const a = this.getBasisX();
        const p = this.position;
        const t = this.target;

        // Convert tilt angle to radians if necessary
        const rotation = isDegrees ? angle * (Math.PI / 180) : angle;

        // Perform tilt
        const tilt: Point3d = this.cream.rotate(t.x, t.y, t.z, p.x, p.y, p.z, a.x + p.x, a.y + p.y, a.z + p.z, rotation, false);

        // Store result in camera object
        this.camera.target = {
            x: tilt.x,
            y: tilt.y,
            z: tilt.z
        };
    }

    /**
     * Have camera 'look' left or right. Rotates camera target about y axis of camera
     * position's orientation plane. Current camera rotation is considered.
     * @param {number} angle Angle (in radians) to rotate target. Positive is right.
     * @param {boolean} isDegrees Optional flag to declare input angle is in degrees.
     */
    public pan(angle: number, isDegrees: boolean = false): void {

    }

    /**
     * Rotate camera position about y axis of orientation plane at target location.
     * Optionally rotate axis about plane normal. Current camera rotation is ignored.
     * @param {number} angle Angle (in radians) to rotate position. 
     * @param {number} tilt Angle (in radians) to rotate initial axis. 
     * @param {boolean} isDegrees Optional flag to decalre input angles are in degrees. 
     */
    public orbit(angle: number, tilt: number, isDegrees: boolean = false): void {

    }

}