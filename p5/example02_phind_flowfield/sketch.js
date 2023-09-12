
// Define the number of boids
const numBoids = 10;
const noiseScale = 0.01;
const gridSize = 15;
const maxSpeed = 2;


// Create a 2D flow field grid
let flowField = [];

function generateFlowField() {
  flowField = []; // Clear the flowField array
  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      // Calculate the angle based on Perlin noise
      let angle = noise(x * noiseScale, y * noiseScale) * TWO_PI;
      // Create a vector with magnitude 1 and angle based on Perlin noise
      let vector = p5.Vector.fromAngle(angle);
      // Store the vector in the flow field grid
      flowField.push(vector);
    }
  }
}

function displayFlowField() {
  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      let index = x / gridSize + (y / gridSize) * (width / gridSize);

      let vector = flowField[index];
      if (vector) {
        let start = createVector(x, y);
        let end = p5.Vector.add(start, vector.mult(gridSize));
        line(start.x, start.y, end.x, end.y);
      }
    }
  }
}



function setup() {
  createCanvas(800, 600);
  // Create the flock of agents
  flock = [];
  for (let i = 0; i < numBoids; i++) {
    flock.push(new Boid());
  }
  // Generate the flow field
  generateFlowField();
}


function draw() {
  background(255);
  //displayFlowField();

  // Update and display the flock of agents
  for (let boid of flock) {
    // Apply the flow field force to the agent
    let x = floor(boid.position.x / gridSize);
    let y = floor(boid.position.y / gridSize);
    let index = x + y * (width / gridSize);
    let force = flowField[index];
    boid.applyForce(force);
    // Update and display the agent
    boid.update();
    //boid.wrapScreen();
    boid.display();
  }
}


class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector();
  }

  update() {
    // Update velocity and position based on acceleration
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    // Calculate the magnitude of the velocity
    let velocityMagnitude = this.velocity.mag();

    // Check if the speed exceeds the maximum speed limit
    if (velocityMagnitude > maxSpeed) {
      // Constrain the magnitude to the maximum speed
      this.velocity.limit(maxSpeed);
    }

    // Wrap the boid around the screen
    this.wrapScreen();

    // Reset acceleration
    this.acceleration.mult(0);


  }

  applyForce(force) {
    // Apply force to acceleration
    this.acceleration.add(force);
  }

  // Wrap the boid around the screen
  wrapScreen() {
    if (this.position.x < 0) {
      this.position.x = width;
    } else if (this.position.x > width) {
      this.position.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = height;
    } else if (this.position.y > height) {
      this.position.y = 0;
    }
  }



  display() {
    // Display the boid as a shape or image
    // Example: ellipse(this.position.x, this.position.y, 10, 10);
    ellipse(this.position.x, this.position.y, 10, 10);
  }
}

