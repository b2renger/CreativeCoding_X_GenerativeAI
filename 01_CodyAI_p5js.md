# A more integrated approach - codyAI (sourcegraph)

## Coding by writing comments !
```js
// create variables to store the number of rows and columns
let numRows = 10;
let numCols = 10;


function setup() {
  createCanvas(windowWidth, windowHeight);
}



function draw() {
  // refresh the canvas with a black background
  background(0);

  // create a grid with numRows rows and numCols columns
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {

      // Calculate x and y positions for each circle
      let x = map(col, 0, numCols - 1, 0, width);
      let y = map(row, 0, numRows - 1, 0, height);

      // draw a circle at each position of the grid
      // only stroke should be drawwn
      stroke(255);
      noFill();

      // specify a number of circles to draw
      const numCircles = 10;
      // iterate over that amount of circles
      for (let i = 0; i < numCircles; i++) {
        // calculate radius based on iteration count and scale it according to the horizontal position of the mouse
        let radius = i * map(mouseX, 0, width, 0, 100);
        // draw circle
        ellipse(x, y, radius, radius);
      }
    }
  }
}

// resize the canvas when the browser window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
```


## Selecting a piece of code to ask for a fix or a change 

Code selected :
```
 for(let i = 0; i < 10; i++) {
      let radius = i * 20;
      ellipse(x, y, radius, radius);
    }
```
Chat extract :
```
Me
I want to change this so that a variable is used to specify the number of circles

Cody
Here is how you can use a variable to specify the number of circles:

const numCircles = 10; 

for(let i = 0; i &lt; numCircles; i++) {
  let radius = i * 20;
  ellipse(x, y, radius, radius);
}
To change the number of circles, you can simply update the numCircles variable.

Let me know if you have any other questions!
```

#### Making the impossible

I tried countless way to write a prompt to get some code doing something like this :

```js
const numCircles = 10;
for (let i = 0; i < numCircles; i++) {
    let spacing = map( mouseX, 0, width, i, i*20);
    let radius = map(mouseY, 0, height, 0, 10);
    let realRad = spacing*radius;
    ellipse(x, y, realRad, realRad);  
}
```

I even try to use chatgpt / bard / llamaCoder to write a prompt able to generate this code but to no avail.




