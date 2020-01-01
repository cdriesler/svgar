export default class SomeClass {
    
    public static async wasmGreet(name: string): Promise<string> {
        const rust = await import('./../wasm/rust_wasm');
        return rust.greet(name);
    }

    public static jsGreet(name: string): string {
        return `Howdy, ${name}!`;
    }
}