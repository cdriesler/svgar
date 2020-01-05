import Rhino3dm, { RhinoModule } from 'rhino3dm';
import rhino3dm from 'rhino3dm';

let rhinoModule:RhinoModule = undefined;

const wasmHandler: ProxyHandler<any> = {
    apply: (target: any, thisArg: any, argArray?: any) => {
        console.log('from proxy');

        if (rhinoModule == undefined) {
            Rhino3dm().then(rhino => {
                console.log('rhino wasm not initialized');
                rhinoModule = rhino;
                return target(argArray[0], argArray[1]);
            });
        }
        else {
            return target(argArray[0], argArray[1]);
        }   
    }
}

export default class RhinoService {

    public static doSomething = new Proxy(RhinoService.doSomethingProxy, wasmHandler);

    private static doSomethingProxy(): any {
        console.log('from fct');

        const r = rhinoModule;

        const pointList = new r.Point3dList(0);
        pointList.add(1, 2, 3);
        pointList.add(2, 3, 4);

        console.log(pointList.count);
        return pointList.count;
    }

    public static async initialize(): Promise<void> {
        await rhino3dm();
    }

}