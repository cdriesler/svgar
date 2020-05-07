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

const tolerance = 0.001;

describe('given a newly initialized cube', () => {

    let svgar: Cube;

    before(async () => {
        svgar = new Cube();
        await svgar.initialize();
    });

    beforeEach(() => {
        svgar.camera.reset();
    });

    it('should create a camera object', () => {
        expect(svgar.camera).to.not.be.undefined;
    });

    it('should assign the default "2D" basis', () => {
        const [i, j, k] = svgar.camera.compile();

        const ti: Point3d = { x: 1, y: 0, z: 0 }
        const ri = equalsWithinTolerance(ti, i, tolerance);
        expect(ri).to.be.true;

        const tj: Point3d = { x: 0, y: 1, z: 0 }
        const rj = equalsWithinTolerance(tj, j, tolerance);
        expect(rj).to.be.true;

        const tk: Point3d = { x: 0, y: 0, z: 1 }
        const rk = equalsWithinTolerance(tk, k, tolerance);
        expect(rk).to.be.true;
    });

    it('should set camera position to the origin', () => {
        const target: Point3d = { x: 0, y: 0, z: 0 }
        const result = equalsWithinTolerance(svgar.camera.position, target, tolerance);
        expect(result).to.be.true;
    });

    it('should set camera extents to 10x10 square', () => {
        expect(svgar.camera.extents.w).to.equal(10);
        expect(svgar.camera.extents.h).to.equal(10);
    });

});

describe('given a default camera before tracking', () => {

    let svgar: Cube;

    before(async () => {
        svgar = new Cube();
        await svgar.initialize();
    });

    beforeEach(() => {
        svgar.camera.reset();
    });

    describe('when tracking (3, 5.5) from (0, 0, 0)', () => {

        beforeEach(() => {
            svgar.camera.track(3, 5.5);
        });

        it('should set camera.position.x to correct value', () => {
            const result = Math.abs(svgar.camera.position.x - 3) < tolerance;
            expect(result).to.be.true;
        });

        it('should set camera.position.y to correct value', () => {
            const result = Math.abs(svgar.camera.position.y - 5.5) < tolerance;
            expect(result).to.be.true;
        });

        it('should set camera.position.z to correct value', () => {
            const result = Math.abs(svgar.camera.position.z - 0) < tolerance;
            expect(result).to.be.true;
        });

    });

    describe('when tracking (-2, 11) from (5, 2, 7.5)', () => {

        beforeEach(() => {
            svgar.camera.position = { x: 5, y: 2, z: 7.5 };
            svgar.camera.track(-2, 11);
        });

        it('should set camera.position.x to correct value', () => {
            const result = Math.abs(svgar.camera.position.x - 3) < tolerance;
            expect(result).to.be.true;
        });

        it('should set camera.position.y to correct value', () => {
            const result = Math.abs(svgar.camera.position.y - 13) < tolerance;
            expect(result).to.be.true;
        });

        it('should set camera.position.z to correct value', () => {
            const result = Math.abs(svgar.camera.position.z - 7.5) < tolerance;
            expect(result).to.be.true;
        });

    });

    describe('when rotated 57 degrees and then tracking (5.25, -2.5) from (0, 0, 0)', () => {

        beforeEach(() => {
            svgar.camera.rotate(57, true)
            svgar.camera.track(5.25, -2.5);
        });

        it('should set camera.position.x to correct value', () => {
            const result = Math.abs(svgar.camera.position.x - 4.95603) < tolerance;
            expect(result).to.be.true;
        });

        it('should set camera.position.y to correct value', () => {
            const result = Math.abs(svgar.camera.position.y - 3.04142) < tolerance;
            expect(result).to.be.true;
        });

        it('should set camera.position.z to correct value', () => {
            const result = Math.abs(svgar.camera.position.z - 0) < tolerance;
            expect(result).to.be.true;
        });

    });

    describe('when rotated 57 degrees and then tracking (5.25, -2.5) from (1, 2, 3)', () => {

        beforeEach(() => {
            svgar.camera.position = { x: 1, y: 2, z: 3 }
            svgar.camera.rotate(57, true)
            svgar.camera.track(5.25, -2.5);
        });

        it('should set camera.position.x to correct value', () => {
            const result = Math.abs(svgar.camera.position.x - 5.95603) < tolerance;
            expect(result).to.be.true;
        });

        it('should set camera.position.y to correct value', () => {
            const result = Math.abs(svgar.camera.position.y - 5.04142) < tolerance;
            expect(result).to.be.true;
        });

        it('should set camera.position.z to correct value', () => {
            const result = Math.abs(svgar.camera.position.z - 3) < tolerance;
            expect(result).to.be.true;
        });

    });

    describe('when panned -25 degrees and then tracking (-5, -2) from (0, -1, -3)', () => {

        beforeEach(() => {
            svgar.camera.position = { x: 0, y: -1, z: -3 }
            svgar.camera.pan(-25, true);
            svgar.camera.track(-5, -2);
        });

        it('should set camera.position.x to correct value', () => {
            const result = Math.abs(svgar.camera.position.x - (-4.53154)) < tolerance;
            expect(result).to.be.true;
        });

        it('should set camera.position.y to correct value', () => {
            const result = Math.abs(svgar.camera.position.y - (-3)) < tolerance;
            expect(result).to.be.true;
        });

        it('should set camera.position.z to correct value', () => {
            const result = Math.abs(svgar.camera.position.z - (-5.11309)) < tolerance;
            expect(result).to.be.true;
        });

    });

    describe('when tilted 88 degrees and then tracking (7, 3.5) from (-2, 1, 2)', () => {

        beforeEach(() => {
            svgar.camera.position = { x: -2, y: 1, z: 2 }
            svgar.camera.tilt(88, true)
            svgar.camera.track(7, 3.5);
        });

        it('should set camera.position.x to correct value', () => {
            const result = Math.abs(svgar.camera.position.x - 5) < tolerance;
            expect(result).to.be.true;
        });

        it('should set camera.position.y to correct value', () => {
            const result = Math.abs(svgar.camera.position.y - 1.12215) < tolerance;
            expect(result).to.be.true;
        });

        it('should set camera.position.z to correct value', () => {
            const result = Math.abs(svgar.camera.position.z - 5.49787) < tolerance;
            expect(result).to.be.true;
        });

    });

    describe('when arbitrarily positioned and then tracking (9, -9.9) from (4, -8, 12)', () => {

        beforeEach(() => {
            svgar.camera.position = { x: 4, y: -8, z: 12 }
            svgar.camera.rotate(27.5, true);
            svgar.camera.pan(-33, true);
            svgar.camera.tilt(64.5, true);
            svgar.camera.track(9, -9.9);
        });

        it('should set camera.position.x to correct value', () => {
            const result = Math.abs(svgar.camera.position.x - 16.98) < tolerance;
            expect(result).to.be.true;
        });

        it('should set camera.position.y to correct value', () => {
            const result = Math.abs(svgar.camera.position.y - (-6.04802)) < tolerance;
            expect(result).to.be.true;
        });

        it('should set camera.position.z to correct value', () => {
            const result = Math.abs(svgar.camera.position.z - 9.40773) < tolerance;
            expect(result).to.be.true;
        });

    });

});

describe('given a default camera before panning', () => {

    let svgar: Cube;

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

    describe('when panned 127 degrees', () => {

        beforeEach(() => {
            svgar.camera.pan(127, true);
            const [i, j, k] = svgar.camera.compile();
            x = i;
            y = j;
            z = k;
        });

        it('should correctly set basis x-axis', () => {
            const target: Point3d = { x: -0.601815, y: 0, z: -0.798636 }
            const result = equalsWithinTolerance(x, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis y-axis', () => {
            const target: Point3d = { x: 0, y: 1, z: 0 }
            const result = equalsWithinTolerance(y, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis z-axis', () => {
            const target: Point3d = { x: 0.798636, y: 0, z: -0.601815 }
            const result = equalsWithinTolerance(z, target, tolerance);
            expect(result).to.be.true;
        });

    });

    describe('when panned 487 degrees', () => {

        beforeEach(() => {
            svgar.camera.pan(487, true);
            const [i, j, k] = svgar.camera.compile();
            x = i;
            y = j;
            z = k;
        });

        it('should correctly set basis x-axis', () => {
            const target: Point3d = { x: -0.601815, y: 0, z: -0.798636 }
            const result = equalsWithinTolerance(x, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis y-axis', () => {
            const target: Point3d = { x: 0, y: 1, z: 0 }
            const result = equalsWithinTolerance(y, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis z-axis', () => {
            const target: Point3d = { x: 0.798636, y: 0, z: -0.601815 }
            const result = equalsWithinTolerance(z, target, tolerance);
            expect(result).to.be.true;
        });

    });

    describe('when panned -5.25 degrees', () => {

        beforeEach(() => {
            svgar.camera.pan(-5.25, true);
            const [i, j, k] = svgar.camera.compile();
            x = i;
            y = j;
            z = k;
        });

        it('should correctly set basis x-axis', () => {
            const target: Point3d = { x: 0.995805, y: 0, z: 0.0915016 }
            const result = equalsWithinTolerance(x, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis y-axis', () => {
            const target: Point3d = { x: 0, y: 1, z: 0 }
            const result = equalsWithinTolerance(y, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis z-axis', () => {
            const target: Point3d = { x: -0.0915016, y: 0, z: 0.995805 }
            const result = equalsWithinTolerance(z, target, tolerance);
            expect(result).to.be.true;
        });

    });

});

describe('given a default camera before tilting', () => {

    let svgar: Cube;

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
            const [i, j, k] = svgar.camera.compile();
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
            const [i, j, k] = svgar.camera.compile();
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
            const [i, j, k] = svgar.camera.compile();
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
            const [i, j, k] = svgar.camera.compile();
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
            const [i, j, k] = svgar.camera.compile();
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
            const [i, j, k] = svgar.camera.compile();
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

describe('given a default camera before composite motion', () => {

    let svgar: Cube;

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

    describe('when rotated 20 degrees and then tilted -35 degrees', () => {

        beforeEach(() => {
            svgar.camera.rotate(20, true);
            svgar.camera.tilt(-35, true);
            const [i, j, k] = svgar.camera.compile();
            x = i;
            y = j;
            z = k;
        });

        it('should correctly set basis x-axis', () => {
            const target: Point3d = { x: 0.939693, y: 0.34202, z: 0 }
            const result = equalsWithinTolerance(x, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis y-axis', () => {
            const target: Point3d = { x: -0.280166, y: 0.769751, z: -0.573576 }
            const result = equalsWithinTolerance(y, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis z-axis', () => {
            const target: Point3d = { x: -0.196175, y: 0.538986, z: 0.819152 }
            const result = equalsWithinTolerance(z, target, tolerance);
            expect(result).to.be.true;
        });

    });

    describe('when tilted 125 degrees and then panned 15 degrees', () => {

        beforeEach(() => {
            svgar.camera.tilt(125, true);
            svgar.camera.pan(15, true);
            const [i, j, k] = svgar.camera.compile();
            x = i;
            y = j;
            z = k;
        });

        it('should correctly set basis x-axis', () => {
            const target: Point3d = { x: 0.965926, y: 0.212012, z: 0.148453 }
            const result = equalsWithinTolerance(x, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis y-axis', () => {
            const target: Point3d = { x: 0, y: -0.573576, z: 0.819152 }
            const result = equalsWithinTolerance(y, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis z-axis', () => {
            const target: Point3d = { x: 0.258819, y: -0.79124, z: -0.554032 }
            const result = equalsWithinTolerance(z, target, tolerance);
            expect(result).to.be.true;
        });

    });

    describe('when panned 217 degrees and then rotated -67 degrees', () => {

        beforeEach(() => {
            svgar.camera.pan(217, true);
            svgar.camera.rotate(-67, true);
            const [i, j, k] = svgar.camera.compile();
            x = i;
            y = j;
            z = k;
        });

        it('should correctly set basis x-axis', () => {
            const target: Point3d = { x: -0.312052, y: -0.920505, z: 0.235148 }
            const result = equalsWithinTolerance(x, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis y-axis', () => {
            const target: Point3d = { x: -0.735148, y: 0.390731, z: 0.553974 }
            const result = equalsWithinTolerance(y, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis z-axis', () => {
            const target: Point3d = { x: -0.601815, y: 0, z: -0.798636 }
            const result = equalsWithinTolerance(z, target, tolerance);
            expect(result).to.be.true;
        });

    });

    describe('when arbitrarily transformed', () => {

        beforeEach(() => {
            svgar.camera.rotate(20, true);
            svgar.camera.tilt(30, true);
            svgar.camera.pan(40, true);
            svgar.camera.tilt(-10, true);
            const [i, j, k] = svgar.camera.compile();
            x = i;
            y = j;
            z = k;
        });

        it('should correctly set basis x-axis', () => {
            const target: Point3d = { x: 0.609923, y: 0.564014, z: -0.55667 }
            const result = equalsWithinTolerance(x, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis y-axis', () => {
            const target: Point3d = { x: -0.419334, y: 0.825758, z: 0.377203 }
            const result = equalsWithinTolerance(y, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis z-axis', () => {
            const target: Point3d = { x: 0.672423, y: 0.00336572, z: 0.740159 }
            const result = equalsWithinTolerance(z, target, tolerance);
            expect(result).to.be.true;
        });

    });

});

describe('given a default camera before target motion', () => {

    let svgar: Cube;

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

    describe('when targeting (2, 2, -6) from (0, 0, 0)', () => {

        beforeEach(() => {
            svgar.camera.target(2, 2, -6);
            const [i, j, k] = svgar.camera.compile();
            x = i;
            y = j;
            z = k;
        });

        it('should correctly set basis x-axis', () => {
            const target: Point3d = { x: 0.952267, y: -0.047733, z: 0.301511 }
            const result = equalsWithinTolerance(x, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis y-axis', () => {
            const target: Point3d = { x: -0.047733, y: 0.952267, z: 0.301511 }
            const result = equalsWithinTolerance(y, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis z-axis', () => {
            const target: Point3d = { x: -0.301511, y: -0.301511, z: 0.904534 }
            const result = equalsWithinTolerance(z, target, tolerance);
            expect(result).to.be.true;
        });

    });

    describe('when targeting (5, -3, -5) from (3, 1.5, 4)', () => {

        beforeEach(() => {
            svgar.camera.position = { x: 3, y: 1.5, z: 4 }
            svgar.camera.target(5, -3, -5);
            const [i, j, k] = svgar.camera.compile();
            x = i;
            y = j;
            z = k;
        });

        it('should correctly set basis x-axis', () => {
            const target: Point3d = { x: 0.979755, y: 0.0455506, z: 0.194948 }
            const result = equalsWithinTolerance(x, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis y-axis', () => {
            const target: Point3d = { x: 0.0455506, y: 0.897511, z: -0.438633 }
            const result = equalsWithinTolerance(y, target, tolerance);
            expect(result).to.be.true;
        });

        it('should correctly set basis z-axis', () => {
            const target: Point3d = { x: -0.194948, y: 0.438633, z: 0.877266 }
            const result = equalsWithinTolerance(z, target, tolerance);
            expect(result).to.be.true;
        });

    });

});
