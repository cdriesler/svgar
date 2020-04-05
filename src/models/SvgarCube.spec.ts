import SvgarCube from './SvgarCube';
import { expect } from 'chai';
import 'mocha';
import SvgarElement from './SvgarElement';

describe('given a new svgar cube', () => {

    it('should initialize cream and rhino when asked to', () => {
        const cube = new SvgarCube();
        return cube.initialize().then(x => {
            expect(x).to.be.true;
        })
    })

})