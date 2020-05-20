import SvgarGeometry from '../SvgarGeometry'

interface Point3d {
    x: number,
    y: number,
    z: number
}

export default class Sphere extends SvgarGeometry {

    public center: Point3d;
    public radius: number;

    constructor(center: Point3d, radius: number) {
        super('Sphere');
        this.center = center;
        this.radius = radius;
    }

    public compile(): number[][] {
      return[[this.center.x, this.center.y, this.center.z]]
    }
}