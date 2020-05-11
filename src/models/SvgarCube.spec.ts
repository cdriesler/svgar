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
            svgar.elements.add.svgar.box({ x: -1, y: -1, z: -1 }, { x: 1, y: 1, z: 1 })
            svgar.elements.add.svgar.box({ x: 3, y: -1, z: -1}, { x: 5, y: 1, z: 1})
                .then(el => el.material = Object.assign(el.material, {fill: 'orange'}))
            svgar.elements.add.svgar.box({ x: -5, y: -1, z: -1}, { x: -3, y: 1, z: 1})
                .then(el => el.material = Object.assign(el.material, {fill: 'green'}));
            svgar.elements.add.svgar.lineCurve({ x: 0, y: 0, z: 0 }, { x: 1.5, y: 0, z: 0 })
                .then(el => el.material = Object.assign(el.material, {stroke: 'red'}))
            svgar.elements.add.svgar.lineCurve({ x: 0, y: 0, z: 0 }, { x: 0, y: 1.5, z: 0 })
                .then(el => el.material = Object.assign(el.material, {stroke: 'green'}))
            svgar.elements.add.svgar.lineCurve({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 1.5 })
                .then(el => el.material = Object.assign(el.material, {stroke: 'blue'}))
            svgar.elements.all().then(el => el.material['stroke-linejoin'] = 'round')
            svgar.camera.move(0, -5, 1);
            svgar.camera.tilt(-80, true);
            svgar.camera.pan(20, true);
            svgar.render();
        })

        it('should generate the expected svg markup', () => {
            expect(svgar.svg).to.not.equal('');
            console.log(`\n\n${svgar.svg}\n\n`);
        });

    });

});