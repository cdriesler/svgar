import Camera from './SvgarCamera';
import { expect } from 'chai';
import 'mocha';

describe('given a camera initialized with default values', () => {

    let camera: Camera;

    before(() => {
        camera = new Camera();
    });

    describe('when calculating the camera orientation', () => {

        let normal: { x: number, y: number, z: number };

        before(() => {
            normal = camera.getNormal();
        })

        it('should return a normal in the default 2D orientation', () => {
            expect(normal.z).to.equal(-1);
        })
    })
})