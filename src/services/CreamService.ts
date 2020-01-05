let creamModule:any = undefined;

const creamHandler: ProxyHandler<any> = {
    apply: (target: any, thisArg: any, argArray?: any) => {
        console.log('from proxy');

        if (creamModule == undefined) {
            import('./../wasm/cream').then(x => {
                creamModule = x;
                return target(argArray[0], argArray[1])
            });
        }
        else {
            return target(argArray[0], argArray[1]);
        }   
    }
}

export default class Cream {

    public static doSomething = new Proxy(Cream.doSomethingProxy, creamHandler);

    private static doSomethingProxy(): void {
        //this.proxy.doSomething();
        console.log('from fct');
        console.log(creamModule.greet('ok'));
    }

    public static async initialize(): Promise<void> {
        const cream = await import('./../wasm/cream');
        creamModule = cream;
    }

}