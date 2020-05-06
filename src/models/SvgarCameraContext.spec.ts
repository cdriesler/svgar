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
        svgar.cameraContext.reset();
    })

    describe('when initialized', () => {

        it('should store a camera context object in the cube', () => {
            expect(svgar.cameraContext).to.not.be.undefined;
        });

    });

    describe('when modifying camera position', () => {

        beforeEach(() => {
            svgar.cameraContext.position = {
                x: 0,
                y: 0,
                z: 0
            }
        });

        it('should allow it to be changed through context property', () => {
            svgar.cameraContext.position = {
                x: 1,
                y: 2,
                z: 3
            }
            expect(svgar.cameraContext.position.x).to.equal(1);
            expect(svgar.cameraContext.position.y).to.equal(2);
            expect(svgar.cameraContext.position.z).to.equal(3);
        });

        it('should allow it to be changed through context move() function', () => {
            svgar.cameraContext.movePosition(4, 5, 6);
            expect(svgar.cameraContext.position.x).to.equal(4);
            expect(svgar.cameraContext.position.y).to.equal(5);
            expect(svgar.cameraContext.position.z).to.equal(6);
        });

    });

    describe('when modifying camera target', () => {

        beforeEach(() => {
            svgar.cameraContext.target = {
                x: 0,
                y: 0,
                z: 0
            }
        });

        it('should allow it to be changed through context property', () => {
            svgar.cameraContext.target = {
                x: 1,
                y: 2,
                z: 3
            }
            expect(svgar.cameraContext.target.x).to.equal(1);
            expect(svgar.cameraContext.target.y).to.equal(2);
            expect(svgar.cameraContext.target.z).to.equal(3);
        });

        it('should allow it to be changed through context move() function', () => {
            svgar.cameraContext.moveTarget(4, 5, 6);
            expect(svgar.cameraContext.target.x).to.equal(4);
            expect(svgar.cameraContext.target.y).to.equal(5);
            expect(svgar.cameraContext.target.z).to.equal(6);
        });

    });

    describe('when modifying camera rotation', () => {

        beforeEach(() => {
            svgar.cameraContext.rotation = 0;
        });

        it('should allow it to be changed through context property', () => {
            svgar.cameraContext.rotation = 25;
            expect(svgar.cameraContext.rotation).to.equal(25);
        });

        it('should allow it to be changed with degrees', () => {
            svgar.cameraContext.rotate(90, true);
            expect(svgar.cameraContext.rotation * (180/Math.PI)).to.equal(90);
        });

        it('should allow it to be changed with radians', () => {
            svgar.cameraContext.rotate(0.544);
            expect(svgar.cameraContext.rotation).to.equal(0.544);
        });

        it('should allow it to be changed consecutively', () => {
            svgar.cameraContext.rotate(0.33);
            svgar.cameraContext.rotate(-0.25);
            svgar.cameraContext.rotate(0.25);
            expect(svgar.cameraContext.rotation).to.equal(0.33);
        });

    });

    describe('when asking the default camera to track', () => {

        beforeEach(() => {
            svgar.cameraContext.track(2, 3.5);
        });

        it('should move to the correct x coordinate', () => {
            expect(svgar.cameraContext.position.x).to.equal(2);
        });

        it('should move to the correct y coordinate', () => {
            expect(svgar.cameraContext.position.y).to.equal(3.5);
        });

        it('should move to the correct z coordinate', () => {
            expect(svgar.cameraContext.position.z).to.equal(0);
        })

    });

    describe('when asking a rotated default camera to track', () => {

        beforeEach(() => {
            svgar.cameraContext.rotate(45, true);
            svgar.cameraContext.track(1.5, 2);
        });

        it('should move to the correct x coordinate', () => {
            const result = Math.abs(svgar.cameraContext.position.x - (-0.353553)) < tolerance;
            expect(result).to.be.true;
        });

        it('should move to the correct y coordinate', () => {
            const result = Math.abs(svgar.cameraContext.position.y - 2.47487) < tolerance;
            expect(result).to.be.true;
        });

        it('should move to the correct z coordinate', () => {
            expect(svgar.cameraContext.position.z).to.equal(0);
        })

    });

    describe('when asking a tilted camera to track', () => {

        beforeEach(() => {
            svgar.cameraContext.tilt(30, true);
            svgar.cameraContext.track(-2, 3.2);
        });

        it('should move to the correct x coordinate', () => {
            const result = Math.abs(svgar.cameraContext.position.x - (-2)) < tolerance;
            expect(result).to.be.true;
        });

        it('should move to the correct y coordinate', () => {
            const result = Math.abs(svgar.cameraContext.position.y - 2.77128) < tolerance;
            expect(result).to.be.true;
        });

        it('should move to the correct x coordinate', () => {
            const result = Math.abs(svgar.cameraContext.position.z - 1.6) < tolerance;
            expect(result).to.be.true;
        });

    });

    describe('when asking a panned camera to track', () => {
        
        beforeEach(() => {
            svgar.cameraContext.pan(-15, true);
            svgar.cameraContext.track(2.2, -5);
        });

        it('should move to the correct x coordinate', () => {
            const result = Math.abs(svgar.cameraContext.position.x - 2.12504) < tolerance;
            expect(result).to.be.true;
        });

        it('should move to the correct y coordinate', () => {
            const result = Math.abs(svgar.cameraContext.position.y - (-5)) < tolerance;
            expect(result).to.be.true;
        });

        it('should move to the correct z coordinate', () => {
            const result = Math.abs(svgar.cameraContext.position.z - (-0.569402)) < tolerance;
            expect(result).to.be.true;
        });

    });

    describe('when asking an arbitrarily angled and rotated camera to track', () => {

        beforeEach(() => {
            svgar.cameraContext.tilt(20, true);
            svgar.cameraContext.pan(-35, true);
            svgar.cameraContext.rotate(27, true);
            svgar.cameraContext.track(-4.25, 2.1);
        });

        it('should move to the correct x coordinate', () => {
            const result = Math.abs(svgar.cameraContext.position.x - (-2.32098)) < tolerance;
            expect(result).to.be.true;
        });

        it('should move to the correct y coordinate', () => {
            const result = Math.abs(svgar.cameraContext.position.y - 3.01553) < tolerance;
            expect(result).to.be.true;
        });

        it('should move to the correct z coordinate', () => {
            const result = Math.abs(svgar.cameraContext.position.z - 2.82703) < tolerance;
            expect(result).to.be.true;
        });

    });

    describe('when asking an arbitrarily angled, rotated, and translated camera to track', () => {

        beforeEach(() => {
            svgar.cameraContext.tilt(20, true);
            svgar.cameraContext.pan(-35, true);
            svgar.cameraContext.rotate(27, true);
            svgar.cameraContext.movePosition(2, 3.3, -4.2);
            svgar.cameraContext.moveTarget(2, 3.3, -4.2);
            svgar.cameraContext.track(3.1, 2.1);
        });

        it('should move to the correct x coordinate', () => {
            const result = Math.abs(svgar.cameraContext.position.x - 5.04356) < tolerance;
            expect(result).to.be.true;
        });

        it('should move to the correct y coordinate', () => {
            const result = Math.abs(svgar.cameraContext.position.y - 4.46466) < tolerance;
            expect(result).to.be.true;
        });

        it('should move to the correct z coordinate', () => {
            const result = Math.abs(svgar.cameraContext.position.z - (-6.04399)) < tolerance;
            expect(result).to.be.true;
        });

    });

    describe('when tilting the default camera', () => {

        beforeEach(() => {
            svgar.cameraContext.tilt(20, true);
        });

        it('should set the camera target to the correct x value', () => {
            expect(svgar.cameraContext.target.x).to.equal(0);
        });

        it('should set the camera target to the correct y value', () => {
            const result = Math.abs(svgar.cameraContext.target.y - 0.34202) < tolerance;
            expect(result).to.be.true;
        });

        it('should set the camera target to the correct z value', () => {
            const result = Math.abs(svgar.cameraContext.target.z - (-0.939693)) < tolerance;
            expect(result).to.be.true;
        });

    });

    describe('when tilting a rotated default camera', () => {

        beforeEach(() => {
            svgar.cameraContext.rotate(23, true);
            svgar.cameraContext.tilt(40, true);
        });

        it('should set the camera target to the correct x value', () => {
            const result = Math.abs(svgar.cameraContext.target.x - (-0.251157)) < tolerance;
            expect(result).to.be.true;
        });

        it('should set the camera target to the correct y value', () => {
            const result = Math.abs(svgar.cameraContext.target.y - 0.591689) < tolerance;
            expect(result).to.be.true;
        });

        it('should set the camera target to the correct z value', () => {
            const result = Math.abs(svgar.cameraContext.target.z - (-0.766044)) < tolerance;
            expect(result).to.be.true;
        });

    });

    describe('when tilting a rotated and moved default camera', () => {

        beforeEach(() => {
            svgar.cameraContext.move(2, 3, -4.25);
            svgar.cameraContext.rotate(23, true);
            svgar.cameraContext.tilt(40, true);
        });

        it('should set the camera target to the correct x value', () => {
            const result = Math.abs(svgar.cameraContext.target.x - 1.74884) < tolerance;
            expect(result).to.be.true;
        });

        it('should set the camera target to the correct y value', () => {
            const result = Math.abs(svgar.cameraContext.target.y - 3.59169) < tolerance;
            expect(result).to.be.true;
        });

        it('should set the camera target to the correct z value', () => {
            const result = Math.abs(svgar.cameraContext.target.z - (-5.01604)) < tolerance;
            expect(result).to.be.true;
        });

    });

    describe('when tilting an arbitrarily positioned camera', () => {

        beforeEach(() => {
            svgar.cameraContext.position = { x: -0.0110431, y: -16.226, z: 12.2101 }
            svgar.cameraContext.target = { x: -1.61355, y: -18.4241, z: 8.71716 }
            svgar.cameraContext.tilt(-27, true);
        });

        it('should set the camera target to the correct x value', () => {
            const result = Math.abs(svgar.cameraContext.target.x - (-0.504682)) < tolerance;
            expect(result).to.be.true;
        });

        it('should set the camera target to the correct y value', () => {
            const result = Math.abs(svgar.cameraContext.target.y - (-16.9031)) < tolerance;
            expect(result).to.be.true;
        });

        it('should set the camera target to the correct z value', () => {
            const result = Math.abs(svgar.cameraContext.target.z - 7.86293) < tolerance;
            expect(result).to.be.true;
        });

    });

    describe('when panning the default camera', () => {

        beforeEach(() => {
            svgar.cameraContext.pan(-15, true);
        });

        it('should set the camera target to the correct x value', () => {
            const result = Math.abs(svgar.cameraContext.target.x - (0.258819)) < tolerance;
            expect(result).to.be.true;
        });

        it('should set the camera target to the correct y value', () => {
            const result = Math.abs(svgar.cameraContext.target.y - 0) < tolerance;
            expect(result).to.be.true;
        });

        it('should set the camera target to the correct z value', () => {
            const result = Math.abs(svgar.cameraContext.target.z - (-0.965926)) < tolerance;
            expect(result).to.be.true;
        });

    });

    describe('when panning a rotated default camera', () => {

        beforeEach(() => {
            svgar.cameraContext.rotate(135, true);
            svgar.cameraContext.pan(22, true);
        });

        it('should set the camera target to the correct x value', () => {
            const result = Math.abs(svgar.cameraContext.target.x - 0.264887) < tolerance;
            expect(result).to.be.true;
        });

        it('should set the camera target to the correct y value', () => {
            const result = Math.abs(svgar.cameraContext.target.y - (-0.264887)) < tolerance;
            expect(result).to.be.true;
        });

        it('should set the camera target to the correct z value', () => {
            const result = Math.abs(svgar.cameraContext.target.z - (-0.927184)) < tolerance;
            expect(result).to.be.true;
        });

    });

    describe('when panning a rotated and moved default camera', () => {

        beforeEach(() => {
            svgar.cameraContext.move(-4.5, -9, -5);
            svgar.cameraContext.rotate(5, true);
            svgar.cameraContext.pan(-44, true);
        });

        it('should set the camera target to the correct x value', () => {
            const result = Math.abs(svgar.cameraContext.target.x - (-3.8079)) < tolerance;
            expect(result).to.be.true;
        });

        it('should set the camera target to the correct y value', () => {
            const result = Math.abs(svgar.cameraContext.target.y - (-8.9394)) < tolerance;
            expect(result).to.be.true;
        });

        it('should set the camera target to the correct z value', () => {
            const result = Math.abs(svgar.cameraContext.target.z - (-5.71934)) < tolerance;
            expect(result).to.be.true;
        });

    });

    describe('when panning an arbitrarily positioned camera', () => {

        beforeEach(() => {
            svgar.cameraContext.position = { x: 0.5, y: 5.5, z: -2.2 }
            svgar.cameraContext.target = { x: 2, y: 6.5, z: -1.2 }
            svgar.cameraContext.pan(55, true);
        });

        it('should set the camera target to the correct x value', () => {
            const result = Math.abs(svgar.cameraContext.target.x - 0.4236) < tolerance;
            expect(result).to.be.true;
        });

        it('should set the camera target to the correct y value', () => {
            const result = Math.abs(svgar.cameraContext.target.y - 7.47868) < tolerance;
            expect(result).to.be.true;
        });

        it('should set the camera target to the correct z value', () => {
            const result = Math.abs(svgar.cameraContext.target.z - (-1.62642)) < tolerance;
            expect(result).to.be.true;
        });

    });

});