import Cube from './SvgarCube';
import { expect } from 'chai';
import 'mocha';

interface Point3d {
    x: number,
    y: number,
    z: number
}

function equalsWithinTolerance(a: Point3d, b: Point3d, tolerance: number): boolean {
    const x = Math.abs(a.x - b.x) < tolerance;
    const y = Math.abs(a.y - b.y) < tolerance;
    const z = Math.abs(a.z - b.z) < tolerance;

    return x && y && z;
}

describe('given a default camera', () => {

    let svgar: Cube;

    before(async () => {
        svgar = new Cube();
        await svgar.initialize();
    });

    beforeEach(() => {
        svgar.camera.position = { x: 0, y: 0, z: 0 };
        svgar.camera.target(0, 0, -1);
    });

    it('should be created when the cube is initialized', () => {
        expect(svgar.camera).to.not.be.undefined;
    });

});

describe('given a default camera before rotation', () => {

    let svgar: Cube;
    const tolerance = 0.01;

    before(async () => {
        svgar = new Cube();
        await svgar.initialize();
    });

    beforeEach(() => {
        svgar.camera.position = { x: 0, y: 0, z: 0 };
        svgar.camera.target(0, 0, -1);
    });

    describe('when rotated 50 degrees', () => {

        let x: Point3d;
        let y: Point3d;
        let z: Point3d;

        beforeEach(() => {
            svgar.camera.rotate(50, true);
            const [i, j, k] = svgar.camera.getBasis();
            x = i;
            y = j;
            z = k;
        });

        it('should correctly set basis x-axis', () => {
            const target: Point3d = { x: 0, y: 0, z: 0 }
            const result = equalsWithinTolerance(x, target, tolerance);

            expect(result).to.be.true;
        });

    });

});