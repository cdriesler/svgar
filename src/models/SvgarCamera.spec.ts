import Cube from './SvgarCube';
import { expect } from 'chai';
import 'mocha';

describe('given a camera initialized with default values', () => {

    let svgar: Cube;

    before(async () => {
        svgar = new Cube();
        await svgar.initialize();
    });

    describe('when calculating the camera orientation', () => {

        it('should return a normal in the default 2D orientation', () => {
            expect(svgar.pingWasm()).to.equal('Hello, wasm!');
        })
    })
})