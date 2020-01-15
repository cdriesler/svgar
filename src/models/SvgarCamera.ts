import { Interval } from '../primitives/Interval';
import { Point3f } from '../primitives/Point3f';

export default class SvgarCamera {

    public position: Point3f;
    public target: Point3f;
    public extents: { x: Interval, y: Interval }; 
    private onChange: () => void;

    constructor(hook: () => void) {
        this.position = { x: 0, y: 0, z: 0 };
        this.target = { x: 0, y: 0, z: -1 };
        this.extents = {
            x: {
                start: -5,
                end: 5
            },
            y: {
                start: -5,
                end: 5
            }
        }

        this.onChange = hook;
    }

    public pan(x: number, y: number): void {
        console.log('from camera');
        this.onChange();
    }

}