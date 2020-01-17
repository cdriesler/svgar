import SvgarMaterial from './SvgarMaterial'
import SvgarGeometry from './../geometry/SvgarGeometry'
import SvgarCamera from './SvgarCamera';

export default class SvgarElement {

    private camera: SvgarCamera;
    private geometry: SvgarGeometry;
    private material: SvgarMaterial;

    public creamModule: any;

    constructor(geometry?: SvgarGeometry, material?: SvgarMaterial) {
        this.geometry = geometry;
        this.material = material;
    }

    public compile(): string {
        return this.geometry.compile().toString();
    }
    
}