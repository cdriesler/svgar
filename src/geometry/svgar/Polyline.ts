import SvgarGeometry from '../SvgarGeometry'

interface Point3d {
    x: number,
    y: number,
    z: number
}

export default class LineCurve extends SvgarGeometry {

    public pts: Point3d[] = [];
    public isClosed: boolean;

    constructor(points: Point3d[], closed: boolean = false) {
        super('Polyline');
        this.pts = points;
        this.isClosed = closed;
    }

    public compile(): number[][] {
      if (this.pts.length < 2) {
        return []
      }

      if (this.isClosed) {
        this.pts.push(this.pts[0])
      }

      const c: number[] = []

      for(let i = 0; i < this.pts.length - 1; i++) {
        const a = this.pts[i]
        const b = this.pts[i + 1]
        const m: Point3d = {
          x: (a.x + b.x) / 2,
          y: (a.y + b.y) / 2,
          z: (a.z + b.z) / 2
        }

        c.push(...[
          a.x,
          a.y,
          a.z,
          m.x,
          m.y,
          m.z,
          m.x,
          m.y,
          m.z,
          b.x,
          b.y,
          b.z
        ])
      }

      return [c]
    }
  }