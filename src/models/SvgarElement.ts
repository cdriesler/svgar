import SvgarGeometry from './../geometry/SvgarGeometry'

interface Point3d {
    x: number,
    y: number,
    z: number
}

export default class SvgarElement {

    private geometry: SvgarGeometry;

    public creamModule: any;

    private worldCoordinates: number[];
    private cameraCoordinates: number[];
    private pageCoordinates: number[];

    constructor(geometry: SvgarGeometry) {
        this.geometry = geometry;

        this.worldCoordinates = SvgarGeometry.compile(geometry);
        this.cameraCoordinates = [];
    }

    // Update numbers in camera space
    private project(position: Point3d, normal: Point3d): void {
        this.cameraCoordinates = [];
        for (let i = 0; i < this.worldCoordinates.length; i += 3) {
            const x = this.worldCoordinates[i];
            const y = this.worldCoordinates[i + 1];
            const z = this.worldCoordinates[i + 2];
            const n = normal;
            const c = position;

            const pt: Point3d = this.creamModule.project_and_remap(
                x,
                y,
                z,
                n.x,
                n.y,
                n.z,
                c.x,
                c.y,
                c.z,
                0
            )

            this.cameraCoordinates = this.cameraCoordinates.concat([pt.x, pt.y, pt.z]);
        }
    }

    // Return svgar-style coordinates in 2D camera space
    public compile(): number[] {
        this.project({x: 0, y: 0, z: 0}, {x: 0, y: 0, z: -1});
        return this.cameraCoordinates;
    }
    
}