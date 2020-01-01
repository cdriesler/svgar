extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub struct Point3d {
    pub x: f64,
    pub y: f64,
    pub z: f64
}

#[wasm_bindgen]
pub fn greet(name: &str) -> std::string::String {
    return format!("Hello, {}!", name);
}

#[wasm_bindgen]
pub fn why(x: &str) -> f64 {
    let my_int = x.parse::<f64>().unwrap();
    return my_int;
}

#[wasm_bindgen]
pub fn project(x: f64, y: f64, z: f64, a: f64, b: f64, c: f64, d: f64, e: f64, f: f64) -> Point3d {
    Point3d { x: x + y + z, y: 2.0, z: 3.0 }
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        use greet;
        assert_eq!("Hello, t!", greet("t"));
    }

    #[test]
    fn project() {
        use project;
        let pt = project(1.0, 2.0, 3.0, 1.0, 2.0, 3.0, 1.0, 2.0, 3.0);
        assert_eq!(pt.x, 1.0);
    }
}