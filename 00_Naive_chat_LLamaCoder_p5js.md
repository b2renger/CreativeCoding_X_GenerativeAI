
# Basics with a chat interface (LLama Coder on faraday) - the naive approach


Llama Coder
Hello User. How can I help you today?

User
Hello ! I would like to try to learn how to code simple generative visual with p5js, can you help me ?

Llama Coder
Of course! There are many resources available online for learning about p5js. Have you tried looking at the official website or tutorials on YouTube?

User
Yes I have an empty example opened up in visual studio code and I'm about to edit the sketch.js file

Llama Coder
Great! You can start by creating a new canvas element in your HTML file. Then, you'll need to create a function called setup() that will be run once when the program starts. Inside this function, you can set the size of the canvas using the width and height properties. For example:

canvas = createCanvas(400, 400);

User
ok how do I make the canvas fullscreen and responsive ?

Llama Coder
To make the canvas fullscreen, you can use the fullScreen() function. This will adjust the canvas to fit the screen size. To make it responsive, you can use the windowWidth and windowHeight variables in your setup() function to set the canvas size based on the current window size. For example:

canvas = createCanvas(windowWidth, windowHeight);
``` 

A small mistake : let's say it's shared :) https://p5js.org/reference/#/p5/fullscreen

The fullScreen is not the term I should have used to make the canvas full width and responsive. Let's try to clarify that :

```
User
After checking the documentation the fullScreen function doesn't seem to do what I actually want. I just want my canvas to take the full size of the browser window, even when the user resizes it

Llama Coder
That's a good point! In that case, you can use the CSS property "width" and "height" to set the canvas size to 100% of the parent element. You can also use the "position" property to make sure the canvas is positioned in the top left corner of its parent element. For example:

canvas {

    width: 100%;

    height: 100%;

    position: absolute;

}
```

Well that is right but kind of missing the point ... I should probably ask what is a parent element, ask about html etc. But I could also try giving it a nudge in the right direction as I know the tool:

```
User
It does not work as I would like, but I search online and found the windowResized() function can you explain it to me ?

Llama Coder
The windowResized() function is called automatically when the browser window is resized. This allows you to adjust your code to fit the new screen size. You can use this function to update the canvas size based on the current window size. For example:

function windowResized() {

    resizeCanvas(windowWidth, windowHeight);

}

User
Great thank you

Llama Coder
You're welcome! Remember that you can always refer to the official documentation or tutorials for more information about p5js. If you have any other questions or need further help, feel free to ask!
```

Not bad but it seems like there are still some gaps. The documentation page looks way better : https://p5js.org/reference/#/p5/windowResized


```
User
Now I would like to create a grid of circles and I would like to be able to specify the number of lines and columns I want in this grid aswell as margins. Circles should be centered in each cell and of random sizes.

Llama Coder
Sure thing! To create a grid of circles, you can use nested for loops. The outer loop will iterate over rows, while the inner loop will iterate over columns. You can use the modulo operator (%) to determine which row and column you're on, and then use that information to calculate the center coordinates of each circle. For example:

function setup() {

    createCanvas(400, 400);

}



function draw() {

    background(255);

    

    // Get the number of rows and columns from the user

    let numRows = prompt("How many rows?");

    let numCols = prompt("How many columns?");

    

    // Calculate the margin between circles

    let margin = width / (numCols + 1);

    

    // Iterate over rows

    for (let row = 0; row < numRows; row++) {

        // Iterate over columns

        for (let col = 0; col < numCols; col++) {

            // Calculate the center coordinates of each circle

            let x = margin * (col + 1) - margin / 2;

            let y = margin * (row + 1) - margin / 2;

            

            // Draw a random-sized circle at that position

            fill(random(255), random(255), random(255));

            ellipse(x, y, random(width / 20, width / 10), random(height / 20, height / 10));

        }

    }

}

User
this is nice but the grid doesn't span the full width or height of the browser window, everything is cramed in the upper left corner

Llama Coder
That's because we haven't adjusted for the margins yet. We can do that by adding a margin to each circle's center coordinates based on its position in the grid. For example:

function draw() {

    background(255);

    

    // Get the number of rows and columns from the user

    let numRows = prompt("How many rows?");

    let numCols = prompt("How many columns?");

    

    // Calculate the margin between circles

    let margin = width / (numCols + 1);

    

    // Iterate over rows

    for (let row = 0; row < numRows; row++) {

        // Iterate over columns

        for (let col = 0; col < numCols; col++) {

            // Calculate the center coordinates of each circle

            let x = margin * (col + 1) - margin / 2;

            let y = margin * (row + 1) - margin / 2;

            

            // Add a margin to the center coordinates based on their position in the grid

            x += margin * col;

            y += margin * row;

            

            // Draw a random-sized circle at that position

            fill(random(255), random(255), random(255));

            ellipse(x, y, random(width / 20, width / 10), random(height / 20, height / 10));

        }

    }

}

User
I've looked up online : people talk about using the map function like here : https://github.com/b2renger/p5js-designing-interactive-patterns#une-page-web-responsive---dessiner-un-cercle-qui-reste-au-milieu

Llama Coder
Yes, that's a good approach too! The map() function can be used to convert values from one range to another. In this case, we can use it to convert our grid coordinates (0 to numCols - 1) to screen coordinates (0 to width). For example:

function draw() {

    background(255);

    

    // Get the number of rows and columns from the user

    let numRows = prompt("How many rows?");

    let numCols = prompt("How many columns?");

    

    // Calculate the margin between circles

    let margin = width / (numCols + 1);

    

    // Iterate over rows

    for (let row = 0; row < numRows; row++) {

        // Iterate over columns

        for (let col = 0; col < numCols; col++) {

            // Convert our grid coordinates to screen coordinates using map()

            let x = map(col, 0, numCols - 1, 0, width);

            let y = map(row, 0, numRows - 1, 0, height);

            

            // Add a margin to the center coordinates based on their position in the grid

            x += margin * col;

            y += margin * row;

            

            // Draw a random-sized circle at that position

            fill(random(255), random(255), random(255));

            ellipse(x, y, random(width / 20, width / 10), random(height / 20, height / 10));

        }

    }

}

```
