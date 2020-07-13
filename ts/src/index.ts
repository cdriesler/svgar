export const run = async (): Promise<string> => {
    const wasm = await import('../node_modules/rsvg')
    return wasm.greet()
}