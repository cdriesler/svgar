use wasm_bindgen::prelude::*;
use uuid::Uuid;
use array2d::Array2D;

#[wasm_bindgen]
struct Transform {
    matrix: Array2D<f64>,
}

#[wasm_bindgen]
pub struct Anchor {
    id: Uuid,
    position: [f64; 3],
    transform: Transform,
}

#[wasm_bindgen]
impl Anchor {
    pub fn new(x: f64, y: f64, z: f64) -> Anchor {
        let uuid = Uuid::new_v4();
        return Anchor{ id: uuid, position: [x, y, z], transform: Transform{ matrix: Array2D::filled_with(0.0, 4, 4)} }
    }

    pub fn render(&self) -> String {
        let [x, y, z] = self.position;
        return format!("{}, {}, {}", x, y, z)
    }

    pub fn move_thing(&mut self) {
        let p = self.position;
        self.position = [0.0 + p[0], 1.0 + p[1], 2.0 + p[2]];
    }
}

#[wasm_bindgen]
pub enum GeometryType {
    Line,
    Quad
}

#[wasm_bindgen]
struct Element {
    id: Uuid,
    r#type: GeometryType,
    geometry: Vec<Anchor>,
    transform: Transform
}

#[wasm_bindgen]
struct Camera {
    transform: Transform
}

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() -> String {
    return "Howdy, from wasm!".into()
}