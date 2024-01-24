let angle = 0.0;
let depth = 100;
let epsilonSlider;
let deltaSlider;

function setup() {
    createCanvas(innerWidth, innerHeight, 'webgl');
    background(255, 255, 255);
    // Add sliders for epsilon and delta
    epsilonSlider = createSlider(0, 2, 0.1, 0.01);
    epsilonSlider.position(10, 10);
    x0Slider = createSlider(-10, 10, 0, 0.1);
    x0Slider.position(10, 30);
    y0Slider = createSlider(-10, 10, 0, 0.1);
    y0Slider.position(10, 50);

    camera(0, 0, 1000, 0, 0, 0, 0, 1, 0);
}

function draw() {
    angle += Math.PI / 360;
    background(0, 0, 0);
    //translate(width/2.0, height/2.0, 0);
    rotateX(45);
    rotateZ(angle);
    scale(Math.min(width / 2.0, height / 2.0));

    drawAxes();
    plotFunction(10);
    drawEpsilonDelta(x0Slider.value(), y0Slider.value());
}

function drawAxes() {
    // X-axis: red
    stroke(255, 0, 0);
    line(-width / 2, 0, 0, width / 2, 0, 0);
    //text("X", width / 2 + 5, 0);

    // Y-axis: green
    stroke(0, 255, 0);
    line(0, -height / 2, 0, 0, height / 2, 0);
    //text("Y", 0, height / 2 + 5);

    // Z-axis: blue
    stroke(0, 0, 255);
    line(0, 0, -depth / 2, 0, 0, depth / 2);
    //text("Z", 0, 0, depth / 2 + 5);
}

// Adapted from: https://cx20.github.io/webgl-parametric-surface-examples/examples/p5js/3d/index.html
function plotFunction(size = 10) {
    // Plot a three-dimensional function
    beginShape(POINTS);
    for (let y = -size; y < size; y += 0.2) {
        for (let x = -size; x < size; x += 0.2) {
            let z = f(x, y);
            let x2 = x / size;
            let y2 = y / size;
            let z2 = z / size;
            //stroke((x2 + 0.5) * 255, (y2 + 0.5) * 255, (z2 + 0.5) * 255);
            stroke(255, 150, 0);
            vertex(x2, y2, z2);
        }
    }
    endShape();
}

function drawEpsilonDelta(x0, y0, size = 10) {
    // Retrieve slider values
    epsilon = epsilonSlider.value()/10;

    // Draw delta neighborhood (cylinder and ellipse)
    stroke(255);
    fill(255, 255, 255, 0);
    push();
    translate(x0/size, y0/size, 0);
    rotateX(Math.PI / 2);
    cylinder(delta(epsilon), 10);
    pop();
    fill(255, 255, 255, 255)
    ellipse(x0/size, y0/size, delta(epsilon) * 2, delta(epsilon) * 2);

    // Draw epsilon neighborhood
    stroke(255);
    fill(255, 255, 255, 0);
    push();
    translate(0, 0, f(x0, y0)/size);
    rotateZ(atan2(y0 / size, x0 / size) - Math.PI / 2);
    cylinder(epsilon, 10);
    pop();
    fill(255, 255, 255, 255)
}

function f(x, y) {
    //return x * x / 10
    return Math.sin(Math.sqrt(x * x + y * y)) / Math.sqrt(x * x + y * y)*10;
}

function delta(epsilon){
    return epsilon;
}