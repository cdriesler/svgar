import { RhinoModule } from 'rhino3dm'
import SvgarGeometry from '../SvgarGeometry';

export default class LineCurve {

    public static toSvgar(geometry: any): SvgarGeometry {
        throw new Error();
    }

    // public static tryParse(rhino: RhinoModule, data: object): LineCurve {
    //     const object = (rhino.CommonObject as any).decode(data);

    //     if (object.constructor.name !== 'LineCurve') {
    //         throw new Error(`Geometry types do not match. Input geometry is instance of ${object.constructor.name}.`);
    //     }

    //     return object as LineCurve;
    // }
}