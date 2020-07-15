use ndarray::{arr2, Array2};

pub fn translate(matrix: &Array2<f64>, x: f64, y: f64, z: f64) -> Array2<f64> {
    
    let transform = arr2(&[
        [1.0, 0.0, 0.0, x  ],
        [0.0, 1.0, 0.0, y  ],
        [0.0, 0.0, 1.0, z  ],
        [0.0, 0.0, 0.0, 1.0]
    ]);

    return transform.dot(matrix)
}