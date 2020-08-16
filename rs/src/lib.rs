use wasm_bindgen::prelude::*;
use uuid::Uuid;
use ndarray::prelude::*;
use console_error_panic_hook;
use std::panic;

mod transform;

pub fn get_id() -> String {
    let uuid = Uuid::new_v4();
    let mut buf = [b'!'; 36];
    let uuid_str = uuid.to_simple().encode_upper(&mut buf);
    let id = format!("{}", uuid_str);

    return id
}

#[wasm_bindgen]
pub struct Anchor {
    id: String,
    position: Array2<f64>,
    transform: Array2<f64>
}

#[wasm_bindgen]
impl Anchor {

    #[wasm_bindgen(constructor)]
    pub fn new(x: f64, y: f64, z: f64) -> Anchor {
        console_error_panic_hook::set_once();

        let id = get_id();
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

        return Anchor{ id: id, position: default_position, transform: default_transform }
    }

    pub fn render(&self) -> String {
        let location = self.transform.dot(&self.position);

        return format!("{}", location)
    }

    pub fn get_position(&self) -> Vec<f64> {
        let x = self.position.get((0, 0)).unwrap();
        let y = self.position.get((1, 0)).unwrap();
        let z = self.position.get((2, 0)).unwrap();

        return vec![*x, *y, *z]
    }

    pub fn get_id(&self) -> String {
        format!("{}", self.id)
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
pub struct Element {
    id: String,
    geometry_type: GeometryType,
    geometry: Vec<Anchor>,
    transform: Array2<f64>
}

#[wasm_bindgen]
impl Element {

    #[wasm_bindgen(constructor)]
    pub fn new(geometry_type: GeometryType) -> Element {
        let id = get_id();
        let t = geometry_type;
        let default_geometry = vec![];
        let default_transform = arr2(&[
            [1.0, 0.0, 0.0, 0.0],
            [0.0, 1.0, 0.0, 0.0],
            [0.0, 0.0, 1.0, 0.0],
            [0.0, 0.0, 0.0, 1.0],
        ]);

        return Element { id: id, geometry_type: t, geometry: default_geometry, transform: default_transform }
    }

    pub fn add_anchor(&mut self, x: f64, y: f64, z: f64) -> String {
        let anchor = Anchor::new(x, y, z);
        let id = anchor.get_id();

        self.geometry.push(anchor);

        return id
    }

    pub fn get_anchor(&self, index: usize) -> Option<String> {
        let anchor = self.geometry.get(index);

        match anchor {
            Some(a) => return Some(a.get_id()),
            None => return None,
        }
    }

    pub fn get_id(&self) -> String {
        return format!("{}", self.id)
    }

    pub fn get_anchor_count(&self) -> usize {
        return self.geometry.len()
    }
}

#[wasm_bindgen]
pub struct Scene {
    elements: Vec<Element>,
    camera: Array2<f64>
}

#[wasm_bindgen]
impl Scene {

    #[wasm_bindgen(constructor)]
    pub fn new() -> Scene {
        let default_camera = arr2(&[
            [1.0,  0.0,  0.0,  0.0],
            [0.0,  1.0,  0.0,  0.0],
            [0.0,  0.0,  -1.0, 0.0],
            [0.0,  0.0,  0.0,  1.0]
        ]);
        Scene { elements: vec![], camera: default_camera }
    }

    pub fn add_element(&mut self, geometry_type: GeometryType, _coordinates: Vec<f64>) -> String {
        let mut el = Element::new(geometry_type);
        el.add_anchor(1.0, 2.0, 3.0);
        let id = el.get_id();

        self.elements.push(el);

        return id
    }

    pub fn get_anchor(&self, element_id: String, anchor_index: usize) -> Option<String> {
        let el = self.elements.iter().position(|el| el.get_id() == element_id);

        let element = match el {
            Some(index) => Some(self.elements.get(index).unwrap()),
            None => None
        };

        let anchor = match element {
            Some(ele) => ele.get_anchor(anchor_index),
            None => None
        };

        return anchor
    }

    pub fn render(&self, id: String) -> Option<Vec<usize>> {
        let i = self.elements.iter().position(|el| el.get_id() == id);

        match i {
            Some(index) => return Some(vec![self.elements.get(index).unwrap().get_anchor_count()]),
            None => return None
        }
    }

}

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() -> String {
    return "Howdy, from wasm!".into()
}