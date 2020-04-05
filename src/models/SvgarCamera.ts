import { Interval } from '../primitives/Interval';
import { Point3f } from '../primitives/Point3f';

export interface Point3d {
    x: number,
    y: number,
    z: number
}

export default class SvgarCamera {

    public position: Point3d;
    public target: Point3d;
    public extents: { w: number, h: number }; 

    constructor() {
        this.position = { x: 0, y: 0, z: 0 };
        this.target = { x: 0, y: 0, z: -1 };
        this.extents = { w: 10, h: 10 };        
    }

    public getNormal(): Point3d {
        return {
            x: this.target.x - this.position.x,
            y: this.target.y - this.position.y,
            z: this.target.z - this.position.z
        }
    }

    public pan(x: number, y: number): void {
        console.log('from camera');
    }

    public move(x: number, y: number, z: number): void {

    }

}