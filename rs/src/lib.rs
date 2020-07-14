use wasm_bindgen::prelude::*;
use uuid::Uuid;
use array2d::Array2D;
use console_error_panic_hook;
use std::panic;

#[wasm_bindgen]
struct Transform {
    matrix: Array2D<f64>,
}

#[wasm_bindgen]
impl Transform {
    pub fn translate(&mut self, x: f64, y: f64, z: f64) {
        let m = &mut self.matrix;

        let a = m.get_mut(0, 3).unwrap();
        *a = x + *a;

        let b = m.get_mut(1, 3).unwrap();
        *b = y + *b;

        let c = m.get_mut(2, 3).unwrap();
        *c = z + *c;
    }
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
        console_error_panic_hook::set_once();
        let uuid = Uuid::new_v4();
        return Anchor{ id: uuid, position: [x, y, z], transform: Transform{ matrix: Array2D::filled_with(0.0, 4, 4)} }
    }

    pub fn render(&self) -> String {
        let [x, y, z] = self.position;
        return format!("{}, {}, {}", x, y, z)
    }

    pub fn render_transform(&self) -> String {
        let cols = self.transform.matrix.as_columns();
        if let [i, j, k, w] = &cols.get(3).unwrap()[..] {
            return format!("{}, {}, {}, {}", i, j, k, w);
        } else {
            "".to_string()
        }        
    }

    pub fn move_thing(&mut self) {
        let p = self.position;
        self.position = [0.0 + p[0], 1.0 + p[1], 2.0 + p[2]];
    }

    pub fn translate(&mut self, x: f64, y: f64, z: f64) {
        self.transform.translate(x, y, z)
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