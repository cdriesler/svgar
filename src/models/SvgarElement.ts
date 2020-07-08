import Geometry from '../geometry/SvgarGeometry'
import Sphere from 'src/geometry/svgar/Sphere';

interface Point3d {
    x: number,
    y: number,
    z: number
}

function newGuid() {
    return 'sxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
    });
}

export default class SvgarElement {

    public material: { [key: string]: string } = {};
    public tags: string[] = [];
    public readonly id: string;

    private geometry: Geometry;
    private cream: any;

    constructor(geometry: Geometry, cream: any) {
        this.id = newGuid();
        this.geometry = geometry;
        this.cream = cream;

        this.material = {
            "stroke": "black",
            "stroke-width": "1px",
            "fill": "none"
        }
    }

    /**
     * 
     * @param a 
     * @param i 
     * @param j 
     * @param k 
     * 
     * @returns [ 2D coordinate beziers, sub-element distances to camera]
     */
    public compile(a: Point3d, i: Point3d, j: Point3d, k: Point3d): [ number[][], number[] ] {

        const elementXDomain: number[] = [];
        const elementYDomain: number[] = [];
        const elementZDomain: number[] = [];

        const elementDistances: number[] = [];
        
        // Project 3D geometric coordinates to camera picture plane
        const projected = this.geometry.compile().map(c => {
            const projectedCache: number[] = [];

            const xDomain: number[] = [];
            const yDomain: number[] = [];
            const zDomain: number[] = [];

            for(let index = 0; index < c.length; index += 3) {
                // Cache initial values
                const x = c[index] - a.x;
                const y = c[index + 1] - a.y;
                const z = c[index + 2] - a.z;

                // Cache coordinate values
                xDomain.push(x);
                yDomain.push(y);
                zDomain.push(z);

                // Perform projection
                const pt: Point3d = this.cream.project(x, y, z, k.x, k.y, k.z, a.x, a.y, a.z);

                // Cache projected values
                projectedCache.push(...[pt.x, pt.y, pt.z]);
            }

            // Calculate bounding box of 3D sub-element
            const min: Point3d = {
                x: Math.min(...xDomain),
                y: Math.min(...yDomain),
                z: Math.min(...zDomain)
            }
            const max: Point3d = {
                x: Math.max(...xDomain),
                y: Math.max(...yDomain),
                z: Math.max(...zDomain)
            }
            const center: Point3d = {
                x: (min.x + max.x) / 2,
                y: (min.y + max.y) / 2,
                z: (min.z + max.z) / 2
            }

            // Measure bounding box distance to picture plane
            const projectedCenter: Point3d = this.cream.project(center.x, center.y, center.z, k.x, k.y, k.z, a.x, a.y, a.z);
            const d: number = this.cream.distance(center.x, center.y, center.z, projectedCenter.x, projectedCenter.y, projectedCenter.z);

            // Cache element distance
            elementDistances.push(d);

            // Store sub-element domain in parent element domain
            elementXDomain.push(...xDomain);
            elementYDomain.push(...yDomain);
            elementZDomain.push(...zDomain);

            // Return projected geometry
            return projectedCache;
        });

        // Sort sub-elements by distance to camera
        const sortedElements: number[][] = [];

        const sortedDistances = elementDistances.concat().sort().reverse();
        sortedDistances.forEach((d, i) => {
            const originalIndex = elementDistances.findIndex(x => x === d);
            elementDistances[originalIndex] = NaN;
            sortedElements.push(projected[originalIndex]);
        })
        
        // Map projected 3D coordinates to 2D picture plane coordinates
        const remapped: number[][] = sortedElements.map(c => {
            const remapCache: number[] = [];

            for(let index = 0; index < c.length; index += 3) {
                // Cache initial values
                const x = c[index];
                const y = c[index + 1];
                const z = c[index + 2];

                // Perform remap
                const r: Point3d = this.cream.remap(x, y, z, i.x, i.y, i.z, j.x, j.y, j.z);

                // Cache remapped values
                remapCache.push(...[r.x, r.y]);
            }

            return remapCache;
        })

        // Handle special geometric cases (sphere)
        if (this.geometry.type === 'Sphere') {
            const sphere = this.geometry as Sphere;

            // Draw circle of given radius about new center point
            const sigma = sphere.radius * 0.55191502449;
            const [cx, cy] = remapped[0];
            const r = sphere.radius;

            remapped[0] = [
                cx + r,
                cy,
                cx + r,
                cy + sigma,
                cx + sigma,
                cy + r,
                cx,
                cy + r, // I
                cx,
                cy + r,
                cx - sigma,
                cy + r,
                cx - r,
                cy + sigma,
                cx - r,
                cy, // II
                cx - r,
                cy,
                cx - r,
                cy - sigma,
                cx - sigma,
                cy - r,
                cx,
                cy - r, // III
                cx,
                cy - r,
                cx + sigma,
                cy - r,
                cx + r,
                cy - sigma,
                cx + r,
                cy, // IV
            ]
        }

        return [ remapped, sortedDistances ];
    } 
    
}