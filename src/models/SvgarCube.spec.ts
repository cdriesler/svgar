import SvgarCube from './SvgarCube';
import { expect } from 'chai';
import 'mocha';
import SvgarElement from './SvgarElement';

describe('given a new svgar cube', () => {

    it('should call proxy methods on property method calls', () => {
        const cube = new SvgarCube();
        cube.camera.pan(0, 0);
    });
})