import Cube from './SvgarCube';
import { expect } from 'chai';
import 'mocha';

describe('given a default camera context', () => {

    let svgar: Cube;
    const tolerance = 0.1;

    before(async () => {
        svgar = new Cube();
        await svgar.initialize();
    });

    beforeEach(() => {
        svgar.camera.reset();
    })

    describe('when initialized', () => {

        it('should store a camera context object in the cube', () => {
            expect(svgar.camera).to.not.be.undefined;
        });

    });

    describe('when modifying camera position', () => {

        beforeEach(() => {
            svgar.camera.position = {
                x: 0,
                y: 0,
                z: 0
            }
        });

        it('should allow it to be changed through context property', () => {
            svgar.camera.position = {
                x: 1,
                y: 2,
                z: 3
            }
            expect(svgar.camera.position.x).to.equal(1);
            expect(svgar.camera.position.y).to.equal(2);
            expect(svgar.camera.position.z).to.equal(3);
        });

        it('should allow it to be changed through context move() function', () => {
            svgar.camera.movePosition(4, 5, 6);
            expect(svgar.camera.position.x).to.equal(4);
            expect(svgar.camera.position.y).to.equal(5);
            expect(svgar.camera.position.z).to.equal(6);
        });

    });

    describe('when modifying camera target', () => {

        beforeEach(() => {
            svgar.camera.target = {
                x: 0,
                y: 0,
                z: 0
            }
        });

        it('should allow it to be changed through context property', () => {
            svgar.camera.target = {
                x: 1,
                y: 2,
                z: 3
            }
            expect(svgar.camera.target.x).to.equal(1);
            expect(svgar.camera.target.y).to.equal(2);
            expect(svgar.camera.target.z).to.equal(3);
        });

        it('should allow it to be changed through context move() function', () => {
            svgar.camera.moveTarget(4, 5, 6);
            expect(svgar.camera.target.x).to.equal(4);
            expect(svgar.camera.target.y).to.equal(5);
            expect(svgar.camera.target.z).to.equal(6);
        });

    });

    describe('when modifying camera rotation', () => {

        beforeEach(() => {
            svgar.camera.rotation = 0;
        });

        it('should allow it to be changed through context property', () => {
            svgar.camera.rotation = 25;
            expect(svgar.camera.rotation).to.equal(25);
        });

        it('should allow it to be changed with degrees', () => {
            svgar.camera.rotate(90, true);
            expect(svgar.camera.rotation * (180/Math.PI)).to.equal(90);
        });

        it('should allow it to be changed with radians', () => {
            svgar.camera.rotate(0.544);
            expect(svgar.camera.rotation).to.equal(0.544);
        });

        it('should allow it to be changed consecutively', () => {
            svgar.camera.rotate(0.33);
            svgar.camera.rotate(-0.25);
            svgar.camera.rotate(0.25);
            expect(svgar.camera.rotation).to.equal(0.33);
        });

    });

    describe('when asking the default camera to track', () => {

        beforeEach(() => {
            svgar.camera.track(2, 3.5);
        });

        it('should move to the correct x coordinate', () => {
            expect(svgar.camera.position.x).to.equal(2);
        });

        it('should move to the correct y coordinate', () => {
            expect(svgar.camera.position.y).to.equal(3.5);
        });

        it('should move to the correct z coordinate', () => {
            expect(svgar.camera.position.z).to.equal(0);
        })

    });

    describe('when asking a rotated default camera to track', () => {

        beforeEach(() => {
            svgar.camera.rotate(45, true);
            svgar.camera.track(1.5, 2);
        });

        it('should move to the correct x coordinate', () => {
            const result = Math.abs(svgar.camera.position.x - (-0.353553)) < tolerance;
            expect(result).to.be.true;
        });

        it('should move to the correct y coordinate', () => {
            const result = Math.abs(svgar.camera.position.y - 2.47487) < tolerance;
            expect(result).to.be.true;
        });

        it('should move to the correct z coordinate', () => {
            expect(svgar.camera.position.z).to.equal(0);
        })

    });

    describe('when asking a tilted camera to track', () => {

        beforeEach(() => {
            svgar.camera.tilt(30, true);
            svgar.camera.track(-2, 3.2);
        });

        it('should move to the correct x coordinate', () => {
            const result = Math.abs(svgar.camera.position.x - (-2)) < tolerance;
            expect(result).to.be.true;
        });

        it('should move to the correct y coordinate', () => {
            const result = Math.abs(svgar.camera.position.y - 2.77128) < tolerance;
            expect(result).to.be.true;
        });

        it('should move to the correct x coordinate', () => {
            const result = Math.abs(svgar.camera.position.z - 1.6) < tolerance;
            expect(result).to.be.true;
        });

    });

    describe('when asking a panned camera to track', () => {
        
        beforeEach(() => {
            svgar.camera.pan(-15, true);
            svgar.camera.track(2.2, -5);
        });

        it('should move to the correct x coordinate', () => {
            const result = Math.abs(svgar.camera.position.x - 2.12504) < tolerance;
            expect(result).to.be.true;
        });

        it('should move to the correct y coordinate', () => {
            const result = Math.abs(svgar.camera.position.y - (-5)) < tolerance;
            expect(result).to.be.true;
        });

        it('should move to the correct z coordinate', () => {
            const result = Math.abs(svgar.camera.position.z - (-0.569402)) < tolerance;
            expect(result).to.be.true;
        });

    });

    describe('when asking an arbitrarily angled and rotated camera to track', () => {

        beforeEach(() => {
            svgar.camera.tilt(20, true);
            svgar.camera.pan(-35, true);
            svgar.camera.rotate(27, true);
            svgar.camera.track(-4.25, 2.1);
        });

        it('should move to the correct x coordinate', () => {
            const result = Math.abs(svgar.camera.position.x - (-2.32098)) < tolerance;
            expect(result).to.be.true;
        });

        it('should move to the correct y coordinate', () => {
            const result = Math.abs(svgar.camera.position.y - 3.01553) < tolerance;
            expect(result).to.be.true;
        });

        it('should move to the correct z coordinate', () => {
            const result = Math.abs(svgar.camera.position.z - 2.82703) < tolerance;
            expect(result).to.be.true;
        });

    });

    describe('when asking an arbitrarily angled, rotated, and translated camera to track', () => {

        beforeEach(() => {
            svgar.camera.tilt(20, true);
            svgar.camera.pan(-35, true);
            svgar.camera.rotate(27, true);
            svgar.camera.movePosition(2, 3.3, -4.2);
            svgar.camera.moveTarget(2, 3.3, -4.2);
            svgar.camera.track(3.1, 2.1);
        });

        it('should move to the correct x coordinate', () => {
            const result = Math.abs(svgar.camera.position.x - 5.04356) < tolerance;
            expect(result).to.be.true;
        });

        it('should move to the correct y coordinate', () => {
            const result = Math.abs(svgar.camera.position.y - 4.46466) < tolerance;
            expect(result).to.be.true;
        });

        it('should move to the correct z coordinate', () => {
            const result = Math.abs(svgar.camera.position.z - (-6.04399)) < tolerance;
            expect(result).to.be.true;
        });

    });

    describe('when tilting the default camera', () => {

        beforeEach(() => {
            svgar.camera.tilt(20, true);
        });

        it('should set the target to the correct x value', () => {
            expect(svgar.camera.target.x).to.equal(0);
        });

        it('should set the camera target to the correct y value', () => {
            const result = Math.abs(svgar.camera.target.y - 0.34202) < tolerance;
            expect(result).to.be.true;
        });

        it('should set the camera target to the correct z value', () => {
            const result = Math.abs(svgar.camera.target.z - (-0.939693)) < tolerance;
            expect(result).to.be.true;
        });

    })

});