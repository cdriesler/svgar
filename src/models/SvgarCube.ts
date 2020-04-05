import rhino3dm from 'rhino3dm';
import Camera, { Point3d } from './SvgarCamera';
import Element from './SvgarElement';

class CameraContext {

    private camera: Camera;
    private cream: any | undefined;

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

    constructor(camera: Camera, cream: any) {
        this.camera = camera;
        this.cream = cream;
    }

    public move(x: number, y: number, z: number): void {

    }

    public track(x: number, y: number, z: number): void {

    }

    public rotate(angle: number, isDegrees: boolean): void {

    }

    public tilt(angle: number, isDegrees: boolean): void {

    }

    public pan(angle: number, isDegrees: boolean): void {

    }

    public orbit(angle: number, tilt: number, isDegrees: boolean): void {

    }

}

export default class SvgarCube {
    
    private _camera: Camera;
    public camera: CameraContext | undefined;

    public elements: Element[];

    public svg: string = '';

    private rhinoModule: undefined | any;
    private creamModule: undefined | any;
    
    constructor() {
        this.elements = [];
        this._camera = new Camera();
    }

    /**
     * Loads wasm dependencies and stores references in class instance.
     * 
     * @remarks
     * This method must be called and successfully resolved before any other functionality.
     * 
     * @returns `true` on successful load
     */
    public async initialize(): Promise<boolean> {

        this.creamModule = await import('./../wasm/cream');
        this.camera = new CameraContext(this._camera, this.creamModule);

        rhino3dm().then(rhino => {
            this.rhinoModule = rhino;
        });

        // ( Chuck ) Current version of rhino3dm module "promise" does not resolve. Terrible temp workaround below.
        const wait = new Promise(resolve => setTimeout(resolve, 1000));
        await wait;

        return this.creamModule != undefined && this.rhinoModule != undefined;
    }

    public pingWasm(): string {
        return this.creamModule.greet('wasm');
    }

    // Convert coordinates to svg
    public render(w: number, h: number): string {

        const camera = this.camera;

        function toSvg(coordinates: number[]): string {
            if (coordinates.length < 12) return '';

            const x = camera.extents.w;
            const y = camera.extents.h;

            const xMax = x / 2;
            const xMin = x / -2;
            const yMax = y / 2;
            const yMin = y / -2;

            const c = coordinates;

            function normalize(min: number, max: number, value: number): number {
                return (value - min) / (max - min);
            }

            function toX(value: number): number {
                return normalize(xMin, xMax, value) * w;
            }

            function toY(value: number): number {
                return h - (normalize(yMin, yMax, value) * h);
            }

            var d: string[] = [`M ${toX(c[0])} ${toY(c[1])}`];

            for (let i = 0; i < coordinates.length; i+=12) {
                d.push(`C ${toX(c[i + 3])} ${toY(c[i + 4])} ${toX(c[i + 6])} ${toY(c[i + 7])} ${toX(c[i + 9])} ${toY(c[i + 10])}`);
            }
            return `<path d="${d.join(' ')}" stroke="black" fill="none" stroke-linecap="round" stroke-width="0.7mm" />`;
        }

        const svg = [
            `<svg version="1.1" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">`,
            // this.elements.map(el => toSvg(el.compile(camera))).join('\n'),
            `</svg>`
        ].join('\n');

        this.svg = svg;

        return svg;
    }
}