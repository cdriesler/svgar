import Cube from './SvgarCube';
import { expect } from 'chai';
import 'mocha';

describe('given a default camera context', () => {

    let svgar: Cube;

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

        it('should allow it to be changed with degrees through context rotate() function', () => {
            svgar.camera.rotate(90, true);
            expect(svgar.camera.rotation * (180/Math.PI)).to.equal(90);
        });

        it('should allow it to be changed with radians through context rotate() function', () => {
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

});