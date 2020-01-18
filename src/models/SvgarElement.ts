import SvgarMaterial from './SvgarMaterial'
import SvgarGeometry from './../geometry/SvgarGeometry'
import SvgarCamera from './SvgarCamera';
import { Point3f } from 'src/primitives/Point3f';

export default class SvgarElement {

    public camera: SvgarCamera;
    private geometry: SvgarGeometry;
    private material: SvgarMaterial;

    public creamModule: any;

    private worldCoordinates: number[];
    private cameraCoordinates: number[];
    private pageCoordinates: number[];

    constructor(geometry?: SvgarGeometry, material?: SvgarMaterial) {
        this.geometry = geometry;
        this.material = material;

        this.worldCoordinates = geometry.compile();
        this.cameraCoordinates = [];
    }

    // Update numbers in camera space
    public project(): void {
        this.cameraCoordinates = [];
        for (let i = 0; i < this.worldCoordinates.length; i += 3) {
            const x = this.worldCoordinates[i];
            const y = this.worldCoordinates[i + 1];
            const z = this.worldCoordinates[i + 2];
            const c = this.camera;

            const pt: Point3f = this.creamModule.project_and_remap(
                x,
                y,
                z,
                c.direction.x,
                c.direction.y,
                c.direction.z,
                c.position.x,
                c.position.y,
                c.position.z,
                0
            )

            this.cameraCoordinates = this.cameraCoordinates.concat([pt.x, pt.y, pt.z]);
        }
    }

    // Spit out svg based on
    public compile(): string {
        return this.cameraCoordinates.toString();
    }
    
}