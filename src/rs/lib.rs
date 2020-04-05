extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;
use std::fmt;
// use std::num;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) -> std::string::String {
    return format!("Hello, {}!", name);
}

#[wasm_bindgen]
pub struct Point3d {
    pub x: f64,
    pub y: f64,
    pub z: f64
}

impl fmt::Display for Point3d {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "({}, {}, {})", self.x, self.y, self.z)
    }
}

impl Point3d {
    pub fn new(x: f64, y: f64, z: f64) -> Point3d {
        return Point3d { x: x, y: y, z: z }
    }

    pub fn add(a: &Point3d, b: &Point3d) -> Point3d {
        return Point3d { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
    }

    pub fn reverse(vector: &Point3d) -> Point3d {
        return Point3d { x: vector.x * -1.0, y: vector.y * -1.0, z: vector.z * -1.0}
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

    pub fn project(vector: &Point3d, to: &Point3d) -> Point3d {
        let dot = Point3d::dot(vector, to);
        let magnitude = to.magnitude();
        let scale_factor = dot / (magnitude * magnitude);

        return Point3d::scale(to, scale_factor);
    }

    pub fn scale(vec: &Point3d, factor: f64) -> Point3d {
        let x = vec.x * factor;
        let y = vec.y * factor;
        let z = vec.z * factor;

        return Point3d { x: x, y: y, z: z };
    }

    pub fn distance_to(self: &Self, point: &Point3d) -> f64 {
        let x = (point.x - self.x).powf(2.0);
        let y = (point.y - self.y).powf(2.0);
        let z = (point.z - self.z).powf(2.0);

        return (x + y + z).sqrt();
    }

    pub fn equals(self: &Self, point: &Point3d) -> bool {
        return (self.x == point.x) && (self.y == point.y) && (self.z == point.z);
    }

    pub fn equals_with_tolerance(self: &Self, point: &Point3d, tolerance: f64) -> bool {
        return ((self.x - point.x).abs() < tolerance) && ((self.y - point.y).abs() < tolerance) && ((self.z - point.z).abs() < tolerance);
    }

    pub fn magnitude(self: &Self) -> f64 {
        return ((self.x * self.x) + (self.y * self.y) + (self.z * self.z)).sqrt();
    }

    pub fn normalize(self: &Self) -> Point3d {
        let magnitude = self.magnitude();
        let x = self.x / magnitude;
        let y = self.y / magnitude;
        let z = self.z / magnitude;

        return Point3d::new(x, y, z);
    }
}

#[cfg(test)]
mod point3d {

    use Point3d;

    // Point3d::equals() tests

    #[test]
    fn test_point3d_equals() {
        let a = Point3d::new(0.0, 0.0, 0.0);
        let b = Point3d::new(0.0, 0.0, 0.0);

        assert!(a.equals(&b));
    }

    // Point3d::dot() tests

    #[test]
    fn zero_vectors() {
        let a = Point3d::new(0.0, 0.0, 0.0);
        let b = Point3d::new(0.0, 0.0, 0.0);

        let res = Point3d::dot(&a, &b);

        assert_eq!(res, 0.0);
    }

    #[test]
    fn unit_vectors() {
        let a = Point3d::new(1.0, 0.0, 0.0);
        let b = Point3d::new(1.0, 0.0, 0.0);

        let res = Point3d::dot(&a, &b);

        assert_eq!(res, 1.0);
    }

    #[test]
    fn random_vectors() {
        let a = Point3d::new(2.0, 3.0, 4.0);
        let b = Point3d::new(1.0, 2.0, 3.0);

        let res = Point3d::dot(&a, &b);

        assert_eq!(res, 20.0);
    }

    // Point3d::magnitude() tests

    #[test]
    fn zero_vector() {
        let a = Point3d::new(0.0, 0.0, 0.0);

        let res = a.magnitude();

        assert_eq!(res, 0.0);
    }

    #[test]
    fn unit_vector() {
        let a = Point3d::new(0.0, 0.0, 1.0);

        let res = a.magnitude();

        assert_eq!(res, 1.0);
    }

    // Point3d::scale() tests

    #[test]
    fn do_not_scale() {
        let a = Point3d::new(1.0, 2.0, 3.0);

        let res = Point3d::scale(&a, 1.0);

        assert_eq!(res.x, 1.0);
    }

    // Point3d::cross() tests

    #[test]
    fn web_vectors() {
        let a = Point3d::new(2.0, 3.0, 4.0);
        let b = Point3d::new(5.0, 6.0, 7.0);

        let res = Point3d::cross(&a, &b);
        let target = Point3d::new(-3.0, 6.0, -3.0);

        assert!(res.equals(&target));
    }

    // Point3d::project() tests

    #[test]
    fn two_vectors() {
        let a = Point3d::new(1.0, 4.0, 0.0);
        let b = Point3d::new (4.0, 2.0, 4.0);

        let res = Point3d::project(&a, &b);
        let target = Point3d::new((4 as f64)/(3 as f64), (2 as f64)/(3 as f64), (4 as f64)/(3 as f64));

        assert!(res.equals(&target));
    }

    // Point3d::distanceTo() tests

    #[test]
    fn origin_to_unit_point() {
        let a = Point3d::new(0.0, 0.0, 0.0);
        let b = Point3d::new(1.0, 0.0, 0.0);

        let res = a.distance_to(&b);

        assert_eq!(res, 1.0);
    }

    #[test]
    fn origin_to_first_sector() {
        let a = Point3d::new(0.0, 0.0, 0.0);
        let b = Point3d::new(1.0, 1.0, 0.0);

        let res = a.distance_to(&b);

        assert!((res - 2.0f64.sqrt()).abs() < 0.1);
    }

    #[test]
    fn origin_to_third_sector() {
        let a = Point3d::new(0.0, 0.0, 0.0);
        let b = Point3d::new(-1.0, -1.0, 0.0);

        let res = a.distance_to(&b);

        assert!((res - 2.0f64.sqrt()).abs() < 0.1);
    }
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

#[cfg(test)]
mod project {

    use project;
    use Point3d;

    #[test]
    fn arbitrary_point_to_world_xy() {
        let pt = project(5.0, 4.0, 3.0, 0.0, 0.0, 1.0, 3.0, 2.0, 1.0);
        let target = Point3d::new(5.0, 4.0, 1.0);

        assert!(pt.equals(&target));
    }

    #[test]
    fn arbitrary_point_in_plane() {
        let pt = project(5.0, 4.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0, 1.0);
        let target = Point3d::new(5.0, 4.0, 1.0);

        assert!(pt.equals(&target));
    }
}

/// Returns a point { x, y, z = 0 } projected onto a 3D plane in that plane's 2D coordinate space
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
/// * `d` - x coordinate of the given plane's origin
/// * `e` - y coordinate of the given plane's origin
/// * `f` - z coordinate of the given plane's origin
/// 
/// * `rotation` - clockwise rotation (in degrees) of default basis about the plane's normal
/// 
#[wasm_bindgen]
pub fn project_and_remap(x: f64, y: f64, z: f64, a: f64, b: f64, c: f64, d: f64, e: f64, f: f64, _rotation: f64) -> Point3d {
    let point_in_plane = project(x, y, z, a, b, c, d, e, f);

    // Handle cases where plane is flat
    if Point3d::new(a, b, c).equals(&Point3d::new(0.0, 0.0, 1.0)) {
        return Point3d::new(x - d, y - e, 0.0);
    }

    if Point3d::new(a, b, c).equals(&Point3d::new(0.0, 0.0, -1.0)) {
        return Point3d::new(x + d, y + e, 0.0);
    }

    let normal = Point3d::new(a, b, c);
    let unit_z = Point3d::new(0.0, 0.0, 1.0);
    let y_plane = Point3d::cross(&normal, &unit_z);

    let y_direction_initial = Point3d::cross(&normal, &y_plane);

    let y_direction = if y_direction_initial.z < 0.0 {
        Point3d::reverse(&y_direction_initial)
    } else {
        y_direction_initial
    };

    // TODO: Rotate y_direction about normal based on rotation argument

    let x_direction = Point3d::cross(&normal, &y_direction);

    let point = Point3d::new(point_in_plane.x - d, point_in_plane.y - e, point_in_plane.z - f);

    let x_component = Point3d::project(&point, &x_direction);
    let x = if Point3d::dot(&x_component, &x_direction) >= 0.0 {
        x_component.magnitude()
    } else {
        x_component.magnitude() * -1.0
    };

    let y_component = Point3d::project(&point, &y_direction);
    let y = if Point3d::dot(&y_component, &y_direction) >= 0.0 {
        y_component.magnitude()
    } else {
        y_component.magnitude() * -1.0
    };

    return Point3d { x: x, y: y, z: 0.0 };
}

#[cfg(test)]
mod project_and_remap {
    
    use project_and_remap;
    use Point3d;

    #[test]
    fn flat_planes() {
        let pt = project_and_remap(5.0, 4.0, 3.0, 0.0, 0.0, 1.0, 1.0, 2.0, 1.5, 0.0);
        let target = Point3d::new(4.0, 2.0, 0.0);

        assert!(pt.equals(&target));
    }

    #[test]
    fn vertical_plane_looking_towards() {
        let pt = project_and_remap(2.0, 4.0, 4.0, 0.0, 1.0, 0.0, 1.0, -5.0, 3.0, 0.0);
        let target = Point3d::new(1.0, 1.0, 0.0);

        assert!(pt.equals(&target));
    }

    #[test]
    fn vertical_plane_looking_away() {
        let pt = project_and_remap(2.0, 4.0, 4.0, 0.0, -1.0, 0.0, 1.0, -5.0, 3.0, 0.0);
        let target = Point3d::new(-1.0, 1.0, 0.0);

        assert!(pt.equals(&target));
    }

    #[test]
    fn values_from_rhino() {
        let pt = project_and_remap(9.727794, 85.785782, 42.555986, 0.549634, 0.547786, 0.63074, 9.106581, 87.990335, 39.597263, 0.0);
        let target = Point3d::new(2.0, 3.0, 0.0);

        assert!(pt.equals_with_tolerance(&target, 0.1));
    }
}

/// Returns the numerical distance between a given point and its projection perpendicular to a given plane.
/// Result will be positive if projection is in opposite direction of normal ('above' the plane).
/// Otherwise, it will be negative.
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
/// * `d` - x coordinate of the given plane's origin
/// * `e` - y coordinate of the given plane's origin
/// * `f` - z coordinate of the given plane's origin
/// 
/// # Examples
/// 
/// `distance_to_projection(2.0, 3.0, 5.0, 0.0, 0.0, 1.0, 2.0, 3.0, 3.0)`
/// returns 2.0
/// 
/// `distance_to_projection(2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 2.0, 3.0, 3.0)`
/// returns -2.0
/// 
/// `distance_to_projection(2.0, 3.0, 1.0, 0.0, 0.0, -1.0, 2.0, 3.0, 3.0)`
/// returns 2.0
/// 
#[wasm_bindgen]
pub fn distance_to_projection(x: f64, y: f64, z: f64, a: f64, b: f64, c: f64, d: f64, e: f64, f: f64) -> f64 {
    let point = Point3d::new(x, y, z);
    let normal = Point3d::new(a, b, c);
    let projected_point = project(x, y, z, a, b, c, d, e, f);

    let distance = point.distance_to(&projected_point);
    let direction = Point3d::add(&Point3d::reverse(&projected_point), &point).normalize();
    let alignment = Point3d::dot(&normal, &direction);

    return distance * alignment;
}

#[cfg(test)]
mod distance_to_projection {

    use distance_to_projection;

    #[test]
    fn point_directly_above() {
        let result = distance_to_projection(2.0, 3.0, 5.0, 0.0, 0.0, 1.0, 2.0, 3.0, 3.0);

        assert_eq!(result, 2.0);
    }

    #[test]
    fn point_directly_below() {
        let result = distance_to_projection(2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 2.0, 3.0, 3.0);

        assert_eq!(result, -2.0);
    }

    #[test]
    fn point_directly_below_flipped() {
        let result = distance_to_projection(2.0, 3.0, 1.0, 0.0, 0.0, -1.0, 2.0, 3.0, 3.0);

        assert_eq!(result, 2.0);
    }
}

/// Rotates a given point { x, y, z } about a given axis defined by two points.
/// 
/// # Arguments
/// 
/// * `x` - x coordinate of point to rotate
/// * `y` - y coordinate of point to rotate
/// * `z` - z coordinate of point to rotate
/// 
/// * `a` - x coordinate of axis line start point
/// * `b` - y coordinate of axis line start point
/// * `c` - z coordinate of axis line start point
/// 
/// * `d` - x coordinate of axis line end point
/// * `e` - y coordinate of axis line end point
/// * `f` - z coordinate of axis line end point
/// 
/// * `angle` - rotation angle in radians (right-hand coordinate space)
/// * `is_degrees` - set to true if angle input is in degrees
#[wasm_bindgen]
pub fn rotate(x: f64, y: f64, z: f64, a: f64, b: f64, c: f64, d: f64, e: f64, f: f64, angle: f64, is_degrees: bool) -> Point3d {
    let rot = if is_degrees {
        (3.14159/180.0) * angle
    } else {
        angle
    };

    let point = Point3d::new(x, y, z);
    let axis_start = Point3d::new(a, b, c);
    let axis_end = Point3d::new(d, e, f);
    let axis = Point3d::add(&axis_end, &Point3d::reverse(&axis_start)).normalize();

    let i_x = rot.cos() + (axis.x.powf(2.0) * (1.0 - rot.cos()));

    return Point3d::new(0.0, 0.0, 0.0);
} 

#[cfg(test)]
mod rot {

    use rotate;
    use Point3d;

    #[test]
    fn plane_xy_right_angle() {
        let result = rotate(1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 90.0, true);

        print!("{}", result);

        assert!(result.equals(&Point3d::new(0.0, 1.0, 0.0)));
    }

}