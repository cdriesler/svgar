import SvgarCube from './SvgarCube';
import { expect } from 'chai';
import 'mocha';

describe('given a new svgar cube', () => {

    it('should initialize cream and rhino when asked to', () => {
        const cube = new SvgarCube();
        return cube.initialize().then(x => {
            expect(x).to.be.true;
        })
    })

})

describe('given a default svgar cube', () => {

    let svgar: SvgarCube;

    before(async () => {
        svgar = new SvgarCube();
        await svgar.initialize();
    });

    describe('when creating and drawing a box', () => {

        beforeEach(() => {
            svgar.elements.add.svgar.box({ x: -1, y: -1, z: -1 }, { x: 1, y: 1, z: 1 });
            // svgar.camera.target(1,1,1);
            svgar.render();
        })

        it('should generate the expected svg markup', () => {
            expect(svgar.svg).to.not.equal('');
            console.log(`\n\n${svgar.svg}\n\n`);
        });

    });

});