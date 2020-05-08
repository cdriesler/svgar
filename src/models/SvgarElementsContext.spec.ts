// import Cube from './SvgarCube';
// import fs from 'fs';
// import path from 'path';
// import { expect } from 'chai';
// import 'mocha';

// describe('given a default cube', () => {

//     let svgar: Cube;

//     before(async () => {
//         svgar = new Cube();
//         await svgar.initialize();
//     });

//     beforeEach(() => {
//         svgar.elements.reset();
//     })

//     describe('when initialized', () => {

//         it('should store an elements context object', () => {
//             expect(svgar.elements).to.not.be.undefined;
//         });

//     });

//     describe('when adding an element from svgar geometry', () => {

//         beforeEach(() => {
//             svgar.elements.add.svgar.lineCurve({x: 0, y: 0, z: 0}, {x: 1, y: 1, z: 0});
//         });

//         it('should add an element to the private cache of elements', () => {
//             let count = 0;
//             svgar.elements.all().then((el) => {count++});
//             expect(count).to.equal(1);
//         });

//     });

//     describe('when adding an element from rhino geometry', () => {

//         beforeEach(() => {
//             const file = fs.readFileSync(path.resolve(__dirname, './../../data/LineCurve.json'));
//             const data = JSON.parse(file.toString());
//             svgar.elements.add.rhino.object(data);
//         });

//         it('should add a geometric element to the private cache of elements', () => {

//         });

//     });

// });