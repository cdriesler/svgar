extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) -> std::string::String {
    return format!("Hello, {}!", name);
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        use greet;
        assert_eq!("Hello, t!", greet("t"));
    }
}