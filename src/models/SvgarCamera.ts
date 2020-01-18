import { Interval } from '../primitives/Interval';
import { Point3f } from '../primitives/Point3f';

export default class SvgarCamera {

    private _position: Point3f;
    set position(value: Point3f) {
        this._position = value;
        this.updateNormal();
    }
    get position(): Point3f {
        return this._position;
    }
    private _target: Point3f;
    set target(value: Point3f) {
        this._target = value;
        this.updateNormal()
    }
    get target(): Point3f {
        return this._target;
    }
    public direction: Point3f;
    public extents: { w: number, h: number }; 

    constructor() {
        this.position = { x: 0, y: 0, z: 0 };
        this.target = { x: 0, y: 0, z: -1 };
        this.extents = { w: 10, h: 10 };        
    }

    private updateNormal(): void {
        if(this.position === undefined || this.target === undefined) {
            this.direction = {
                x: 0,
                y: 0,
                z: -1
            }
            return;
        }
        this.direction = {
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