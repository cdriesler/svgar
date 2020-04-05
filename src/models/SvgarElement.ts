import SvgarMaterial from './SvgarMaterial'
import SvgarGeometry from './../geometry/SvgarGeometry'
import SvgarCamera from './SvgarCamera';
import { Point3f } from 'src/primitives/Point3f';

export default class SvgarElement {

    private geometry: SvgarGeometry;
    private material: SvgarMaterial;

    public creamModule: any;

    private worldCoordinates: number[];
    private cameraCoordinates: number[];
    private pageCoordinates: number[];

    constructor(geometry: SvgarGeometry, material?: SvgarMaterial) {
        this.geometry = geometry;
        this.material = material;

        this.worldCoordinates = geometry.compile();
        this.cameraCoordinates = [];
    }

    // Update numbers in camera space
    private project(camera: SvgarCamera): void {
        this.cameraCoordinates = [];
        for (let i = 0; i < this.worldCoordinates.length; i += 3) {
            const x = this.worldCoordinates[i];
            const y = this.worldCoordinates[i + 1];
            const z = this.worldCoordinates[i + 2];
            const c = camera;
            const n = camera.getNormal();

            const pt: Point3f = this.creamModule.project_and_remap(
                x,
                y,
                z,
                n.x,
                n.y,
                n.z,
                c.position.x,
                c.position.y,
                c.position.z,
                0
            )

            this.cameraCoordinates = this.cameraCoordinates.concat([pt.x, pt.y, pt.z]);
        }
    }

    // Return svgar-style coordinates in 2D camera space
    public compile(camera: SvgarCamera): number[] {
        this.project(camera);
        return this.cameraCoordinates;
    }
    
}