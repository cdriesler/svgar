export default class SomeClass {
    
    public static async wasmGreet(name: string): Promise<string> {
        const rust = await import('./../wasm/cream');
        return rust.greet(name);
    }

    public static async wasmNumber(): Promise<{x: number, y: number, z: number}> {
        const rust = await import('./../wasm/cream');
        return rust.project(0, 0, 0, 0, 0, 0, 0, 0, 0)
    }

    public static jsGreet(name: string): string {
        return `Howdy, ${name}!`;
    }
}