export default class SvgarGeometry {
    
    public type: string;

    constructor(type: string) {
        this.type = type;
    }

    public compile(): number[][] {
        throw new Error(`Geometry type ${this.type} is currently not supported.`)
    }

}