import Cube from './SvgarCube';
import { expect } from 'chai';
import 'mocha';

interface Point3d {
    x: number,
    y: number,
    z: number
}

function equalsWithinTolerance(a: Point3d, b: Point3d, tolerance: number): boolean {
    const x = Math.abs(a.x) - Math.abs(b.x) < tolerance;
    const y = Math.abs(a.y) - Math.abs(b.y) < tolerance;
    const z = Math.abs(a.z) - Math.abs(b.z) < tolerance;

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

describe('given a default camera before tilting', () => {

    let svgar: Cube;
    const tolerance = 0.01;

    let x: Point3d;
    let y: Point3d;
    let z: Point3d;

    before(async () => {
        svgar = new Cube();
        await svgar.initialize();
    });

    beforeEach(() => {
        svgar.camera.reset();
    });

    describe('when tilted 32 degrees', () => {

        beforeEach(() => {
            svgar.camera.tilt(32, true);
            const [i, j, k] = svgar.camera.stage();
            x = i;
            y = j;
            z = k;
        });

        it('should correctly set basis x-axis', () => {
            const target: Point3d = { x: 1, y: 0, z: 0 }
            const result = equalsWithinTolerance(x, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis y-axis', () => {
            const target: Point3d = { x: 0, y: 0.848048, z: 0.529919 }
            const result = equalsWithinTolerance(y, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis z-axis', () => {
            const target: Point3d = { x: 0, y: -0.529919, z: 0.848048 }
            const result = equalsWithinTolerance(z, target, tolerance);
            expect(result).to.be.true;
        });

    });

    describe('when tilted 392 degrees', () => {

        beforeEach(() => {
            svgar.camera.tilt(32, true);
            const [i, j, k] = svgar.camera.stage();
            x = i;
            y = j;
            z = k;
        });

        it('should correctly set basis x-axis', () => {
            const target: Point3d = { x: 1, y: 0, z: 0 }
            const result = equalsWithinTolerance(x, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis y-axis', () => {
            const target: Point3d = { x: 0, y: 0.848048, z: 0.529919 }
            const result = equalsWithinTolerance(y, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis z-axis', () => {
            const target: Point3d = { x: 0, y: -0.529919, z: 0.848048 }
            const result = equalsWithinTolerance(z, target, tolerance);
            expect(result).to.be.true;
        });

    });

    describe('when tilted -12.2 degrees', () => {

        beforeEach(() => {
            svgar.camera.tilt(-12.2, true);
            const [i, j, k] = svgar.camera.stage();
            x = i;
            y = j;
            z = k;
        });

        it('should correctly set basis x-axis', () => {
            const target: Point3d = { x: 1, y: 0, z: 0 }
            const result = equalsWithinTolerance(x, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis y-axis', () => {
            const target: Point3d = { x: 0, y: 0.977416, z: -0.211325 }
            const result = equalsWithinTolerance(y, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis z-axis', () => {
            const target: Point3d = { x: 0, y: 0.211325, z: 0.977416 }
            const result = equalsWithinTolerance(z, target, tolerance);
            expect(result).to.be.true;
        });

    });

});

describe('given a default camera before rotation', () => {

    let svgar: Cube;
    const tolerance = 0.01;

    let x: Point3d;
    let y: Point3d;
    let z: Point3d;

    before(async () => {
        svgar = new Cube();
        await svgar.initialize();
    });

    beforeEach(() => {
        svgar.camera.reset();
    });

    describe('when rotated 50 degrees', () => {

        beforeEach(() => {
            svgar.camera.rotate(50, true);
            const [i, j, k] = svgar.camera.stage();
            x = i;
            y = j;
            z = k;
        });

        it('should correctly set basis x-axis', () => {
            const target: Point3d = { x: 0.642788, y: 0.766044, z: 0 }
            const result = equalsWithinTolerance(x, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis y-axis', () => {
            const target: Point3d = { x: -0.766044, y: 0.642788, z: 0 }
            const result = equalsWithinTolerance(y, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis z-axis', () => {
            const target: Point3d = { x: 0, y: 0, z: 1 }
            const result = equalsWithinTolerance(z, target, tolerance);
            expect(result).to.be.true;
        });

    });

    describe('when rotated 410 degrees', () => {

        beforeEach(() => {
            svgar.camera.rotate(410, true);
            const [i, j, k] = svgar.camera.stage();
            x = i;
            y = j;
            z = k;
        });

        it('should correctly set basis x-axis', () => {
            const target: Point3d = { x: 0.642788, y: 0.766044, z: 0 }
            const result = equalsWithinTolerance(x, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis y-axis', () => {
            const target: Point3d = { x: -0.766044, y: 0.642788, z: 0 }
            const result = equalsWithinTolerance(y, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis z-axis', () => {
            const target: Point3d = { x: 0, y: 0, z: 1 }
            const result = equalsWithinTolerance(z, target, tolerance);
            expect(result).to.be.true;
        });

    });

    describe('when rotated -22.5 degrees', () => {

        beforeEach(() => {
            svgar.camera.rotate(-22.5, true);
            const [i, j, k] = svgar.camera.stage();
            x = i;
            y = j;
            z = k;
        });

        it('should correctly set basis x-axis', () => {
            const target: Point3d = { x: 0.92388, y: -0.382683, z: 0 }
            const result = equalsWithinTolerance(x, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis y-axis', () => {
            const target: Point3d = { x: 0.382683, y: 0.92388, z: 0 }
            const result = equalsWithinTolerance(y, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis z-axis', () => {
            const target: Point3d = { x: 0, y: 0, z: 1 }
            const result = equalsWithinTolerance(z, target, tolerance);
            expect(result).to.be.true;
        });

    });

});

