import SvgarCube from './SvgarCube';
import { expect } from 'chai';
import 'mocha';
import SvgarElement from './SvgarElement';

describe('given a new svgar cube', () => {

    it('should call proxy methods on property method calls', () => {
        const cube = new SvgarCube();
        cube.camera.pan(0, 0);
    });

    it('should test setters on array', () => {
        const cube = new SvgarCube();
        const el = cube.elements;
        console.log('pushing new el');
        el.push(new SvgarElement());
        console.log(el.length);
        console.log('re-assigning elements');
        cube.elements = [new SvgarElement(), new SvgarElement(), new SvgarElement()];
    })

    it('should share cube context with camera object', () => {
        const cube = new SvgarCube();
        cube.elements.push(new SvgarElement());
        console.log(cube.camera);
        // cube.camera.position = {x: 1, y: 1, z: 1}
    })
})