import { RhinoModule } from 'rhino3dm'

export default class LineCurve {

    public static tryParse(rhino: RhinoModule, data: object): LineCurve {
        const object = (rhino.CommonObject as any).decode(data);

        if (object.constructor.name !== 'LineCurve') {
            throw new Error(`Geometry types do not match. Input geometry is instance of ${object.constructor.name}.`);
        }

        return object as LineCurve;
    }
}