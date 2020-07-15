use wasm_bindgen::prelude::*;
use uuid::Uuid;
use ndarray::prelude::*;
use console_error_panic_hook;
use std::panic;

mod transform;

#[wasm_bindgen]
pub struct Point3d {
    x: f64,
    y: f64,
    z: f64
}

#[wasm_bindgen]
pub struct Anchor {
    id: Uuid,
    position: Array2<f64>,
    transform: Array2<f64>
}

#[wasm_bindgen]
impl Anchor {

    #[wasm_bindgen(constructor)]
    pub fn new(x: f64, y: f64, z: f64) -> Anchor {
        console_error_panic_hook::set_once();

        let uuid = Uuid::new_v4();
        let default_position = arr2(&[
            [x  ],
            [y  ],
            [z  ],
            [1.0]
        ]);
        let default_transform = arr2(&[
            [1.0, 0.0, 0.0, 0.0],
            [0.0, 1.0, 0.0, 0.0],
            [0.0, 0.0, 1.0, 0.0],
            [0.0, 0.0, 0.0, 1.0],
        ]);

        return Anchor{ id: uuid, position: default_position, transform: default_transform }
    }

    pub fn render(&self) -> String {
        let location = self.transform.dot(&self.position);

        return format!("{}", location)
    }

    pub fn get_position(&self) -> Point3d {
        let x = self.position.get((0, 0)).unwrap();
        let y = self.position.get((0, 1)).unwrap();
        let z = self.position.get((0, 2)).unwrap();

        return Point3d { x: *x, y: *y, z: *z }
    }

    pub fn render_transform(&self) -> String {
        format!("{}", self.transform)    
    }

    pub fn translate(&mut self, x: f64, y: f64, z: f64) {
        self.transform = transform::translate(&self.transform, x, y, z);
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
    transform: Array2<f64>
}

#[wasm_bindgen]
struct Camera {
    transform: Array2<f64>
}

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() -> String {
    return "Howdy, from wasm!".into()
}