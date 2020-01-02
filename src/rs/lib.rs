extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;
// use std::num;

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

    pub fn add(a: &Point3d, b: &Point3d) -> Point3d {
        return Point3d { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
    }

    pub fn dot(a: &Point3d, b: &Point3d) -> f64 {
        return (a.x * b.x) + (a.y * b.y) + (a.z * b.z);
    }

    pub fn cross(a: &Point3d, b: &Point3d) -> Point3d {
        let x = (a.y * b.z) - (a.z * b.y);
        let y = (a.z * b.x) - (a.x * b.z);
        let z = (a.x * b.y) - (a.y * b.x);

        return Point3d{ x: x, y: y, z: z };
    }

    pub fn scale(vec: &Point3d, factor: f64) -> Point3d {
        let x = vec.x * factor;
        let y = vec.y * factor;
        let z = vec.z * factor;

        return Point3d { x: x, y: y, z: z };
    }

    pub fn equals(self: &Self, point: &Point3d) -> bool {
        return (self.x == point.x) && (self.y == point.y) && (self.z == point.z);
    }

    pub fn magnitude(self: &Self) -> f64 {
        return ((self.x * self.x) + (self.y * self.y) + (self.z * self.z)).sqrt();
    }
}

#[wasm_bindgen]
pub fn greet(name: &str) -> std::string::String {
    return format!("Hello, {}!", name);
}

/// Returns a point { x, y, z } projected onto a given plane.
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
    let point = Point3d { x: x, y: y, z: z };
    let normal = Point3d { x: a, y: b, z: c };

    let point_to_origin = Point3d { x: d - x, y: e - y, z: f - z };
    let dot_normal = Point3d::dot(&point_to_origin, &normal);
    let magnitude_normal = normal.magnitude();
    let scale_factor = dot_normal / (magnitude_normal * magnitude_normal);

    let transform = Point3d { x: normal.x * scale_factor, y: normal.y * scale_factor, z: normal.z * scale_factor };

    let projected_point = Point3d::add(&point, &transform);

    return projected_point;
}

/// Returns a point { x, y, z } projected onto a 3D plane in that plane's 2D coordinate space
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
/// * `rotation` - 
/// 
#[wasm_bindgen]
pub fn project_and_remap(x: f64, y: f64, z: f64, a: f64, b: f64, c: f64, d: f64, e: f64, f: f64, rotation: f64) -> Point3d {
    Point3d { x: 0.0, y: 0.0, z: 0.0 }
}

#[cfg(test)]
mod tests {

    // default test
    
    #[test]
    fn it_works() {
        use greet;

        assert_eq!("Hello, t!", greet("t"));
    }

    // project() tests

    #[test]
    fn test_project() {
        use project;
        use Point3d;

        let pt = project(5.0, 4.0, 3.0, 0.0, 0.0, 1.0, 3.0, 2.0, 1.0);

        let target = Point3d::new(5.0, 4.0, 1.0);

        assert!(pt.equals(&target));
    }

    // Point3d::equals() tests

    #[test]
    fn test_point3d_equals() {
        use Point3d;

        let a = Point3d::new(0.0, 0.0, 0.0);
        let b = Point3d::new(0.0, 0.0, 0.0);

        assert!(a.equals(&b));
    }

    // dot() tests

    #[test]
    fn zero_vectors() {
        use Point3d;

        let a = Point3d::new(0.0, 0.0, 0.0);
        let b = Point3d::new(0.0, 0.0, 0.0);

        let res = Point3d::dot(&a, &b);

        assert_eq!(res, 0.0);
    }

    #[test]
    fn unit_vectors() {
        use Point3d;

        let a = Point3d::new(1.0, 0.0, 0.0);
        let b = Point3d::new(1.0, 0.0, 0.0);

        let res = Point3d::dot(&a, &b);

        assert_eq!(res, 1.0);
    }

    #[test]
    fn random_vectors() {
        use Point3d;

        let a = Point3d::new(2.0, 3.0, 4.0);
        let b = Point3d::new(1.0, 2.0, 3.0);

        let res = Point3d::dot(&a, &b);

        assert_eq!(res, 20.0);
    }

    // Point3d::magnitude() tests

    #[test]
    fn zero_vector() {
        use Point3d;

        let a = Point3d::new(0.0, 0.0, 0.0);

        let res = a.magnitude();

        assert_eq!(res, 0.0);
    }

    #[test]
    fn unit_vector() {
        use Point3d;
        
        let a = Point3d::new(0.0, 0.0, 1.0);

        let res = a.magnitude();

        assert_eq!(res, 1.0);
    }

    // Point3d::scale() tests

    #[test]
    fn do_not_scale() {
        use Point3d;

        let a = Point3d::new(1.0, 2.0, 3.0);

        let res = Point3d::scale(&a, 1.0);

        assert_eq!(res.x, 1.0);
    }

    // Point3d::cross() tests

    #[test]
    fn random_vectors() {
        use Point3d;

        let a = Point3d::new(2.0, 3.0, 4.0);
        let b = Point3d::new(5.0, 6.0, 7.0);

        let res = Point3d::cross(&a, &b);
        let target = Point3d::new(-3.0, 6.0, -3.0);

        assert!(res.equals(&target));
    }
}