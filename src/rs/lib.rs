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

impl Point3d {
    pub fn new(x: f64, y: f64, z: f64) -> Point3d {
        return Point3d { x: x, y: y, z: z }
    }

    pub fn equals(self: &Self, point: &Point3d) -> bool {
        return (self.x == point.x) && (self.y == point.y) && (self.z == point.z);
    }
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

/// Returns a point {x, y, z} projected onto a given plane.
///
/// # Arguments
///
/// * `x` - x coordinate of point to project
/// * `y` - y coordinate of point to project
/// * `z` - z coordinate of point to project
/// 
/// * `a` - x component of plane normal
/// * `b` - y component of plane normal
/// * `c` - z component of plane normal
/// 
/// * `d` - x coordinate of a point on the plane
/// * `e` - y coordinate of a point on the plane
/// * `f` - z coordinate of a point on the plane
/// 
/// # Returns
/// 
/// * Point3d { x: f64, y: f64, z: f64 }
/// 
/// Note: The returned coordinates are in world coordinate space.
///
/// # Example
///
/// ```
/// Nothing yet
/// ```
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
    fn test_project() {
        use project;
        use Point3d;

        let pt = project(5.0, 4.0, 3.0, 0.0, 0.0, 1.0, 3.0, 2.0, 1.0);

        let target = Point3d::new(5.0, 4.0, 1.0);

        assert!(pt.equals(&target));
    }

    #[test]
    fn test_point3d_equals() {
        use Point3d;

        let a = Point3d::new(0.0, 0.0, 0.0);
        let b = Point3d::new(0.0, 0.0, 0.0);

        assert!(a.equals(&b));
    }
}