# Phind - AI search engine

![](./assets/p5/02_P5js_lsystem.jpg)

🤓 **Prompting an AI**

🤖 *AI answers*

💬 Commenting on what happened

---
🤓 : **Can you help me implement a L-system in p5js ?**


🤖 : *What specific L-system do you want to implement? For example, are you interested in creating a fractal tree, a dragon curve, or something else*


🤓 :	**Can you tell me other kind of l-systems and give me a few sources where I can see what each one looks like ?**

🤖: *Sure, L-systems (Lindenmayer systems) are a parallel rewriting system and a type of formal grammar. They are used to model and visualize the growth of plants and development of fractals. Here are a few types of L-systems and their visual representations:*

*Algae: This is the original L-system introduced by Lindenmayer. It's a simple system that models the growth of certain types of algae.*
*Cantor set: This L-system produces the famous Cantor's fractal set on a real straight line R.*
*Sierpinski triangle: This L-system approximates the Sierpinski triangle. In this system, F and G mean "draw forward", + means "turn left by angle", and − means "turn right by angle".*
*Space-filling curves: These include the Hilbert curve, Peano's curves, Dekking's church, and kolams.*
*Median space-filling curves: These include the Lévy C curve, Harter-Heighway dragon curve, and Davis-Knuth terdragon.*
*The visual representation of these L-systems can be found on the Wikipedia page for L-systems en.wikipedia.org.*

Now, let's discuss how you can implement an L-system in p5.js. P5.js is a JavaScript library used for creating graphics and interactive experiences in the browser.*

*Here is a basic implementation of an L-system in p5.js:*

```js
let axiom = "F";
let sentence = axiom;
let len = 100;

let rules = [];
rules[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]"
}

function generate() {
  len *= 0.5;
  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (let j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  createP(sentence);
  turtle();
}

function turtle() {
  background(51);
  resetMatrix();
  translate(width / 2, height);
  stroke(255, 100);
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);

    if (current == "F") {
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (current == "+") {
      rotate(PI / 6);
    } else if (current == "-") {
      rotate(-PI / 6);
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    }
  }
}

function setup() {
  createCanvas(400, 400);
  background(51);
  createP(axiom);
  turtle();
  let button = createButton("generate");
  button.mousePressed(generate);
}


```
*In this code:*

*We start with an initial sentence (the axiom) "F".*
*We have a single rule: whenever we see an "F", replace it with "FF+[+F-F-F]-[-F+F+F]".*
*A "+" means "rotate a certain angle", a "-" means "rotate a certain angle in the other direction", and "[" and "]" are used to save and restore the current state, respectively.*
*We use the generate function to create the next sentence.*
*We use the turtle function to draw the sentence.*
*You can modify the rules and the axiom to create different types of L-systems [https://jsantell.com/l-systems/](https://jsantell.com/l-systems/).*


🤓 : **This implementation is really nice could you modify your first implementation to let me modify the angle as a variable, change the length using sliders in a gui ?**

🤖 : *To modify the L-system implementation in p5.js to allow the user to modify the angle and length using sliders in a GUI, we'll need to introduce the createSlider function from p5.js.*

*Here's how to modify the existing code. First, declare the angle and the sliders:*

```js
let angle;
let lenSlider, angleSlider;
```

*Then, in the setup function, set up the sliders:*

```js
function setup() {
  createCanvas(400, 400);
  background(51);

  // Create sliders
  lenSlider = createSlider(0, 200, 100);
  angleSlider = createSlider(0, TWO_PI, PI / 6, 0.01);

  createP(axiom);
  turtle();
  let button = createButton("generate");
  button.mousePressed(generate);
}
```

*createSlider(min, max, [value], [step]) is a function in p5.js that creates a slider in the browser. The arguments state the minimum value, the maximum value, the initial value, and the step of the slider.*

*Each time you execute the turtle or generate function, get the current value of the length and the angle from the sliders:*

```js
function generate() {
  len = lenSlider.value(); // use slider value for length
  ...
}

function turtle() {
  angle = angleSlider.value(); // use slider value for angle
  
  background(51);
  resetMatrix();
  translate(width / 2, height);
  stroke(255, 100);
  
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);

    if (current == "F") {
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (current == "+") {
      rotate(angle); // use variable for angle
    } else if (current == "-") {
      rotate(-angle); // use variable for angle
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    }
  }
}
```

*This way, you can control the length and the angle using GUI sliders.*

*Keeping the code organized and readable is not just beneficial for other developers, but it's also beneficial for you. It makes it easier to extend, maintain, and debug your program. It's a good practice to place GUI controlling elements in the setup function and applying these settings in the drawing functions by accessing the current value of the GUI elements.*

🤓 : **can provide you with a fully functional code ?**


🤖 : *Sure, here's an example of how you might implement a simple sketch in p5.js to visualize an L-system using sliders for user interaction.*

*Here is the complete code:*

```js
let angle;
let axiom = "F";
let sentence = axiom;
let len = 150;

let angleSlider;
let lenSlider;

let rules = [];
rules[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]"
}

function generate() {
  len = lenSlider.value();
  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (let j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  turtle();
}

function turtle() {
  background(51);
  resetMatrix();
  translate(width / 2, height);
  stroke(255, 100);
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    if (current == "F") {
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (current == "+") {
      rotate(angle);
    } else if (current == "-") {
      rotate(-angle);
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    }
  }
}

function setup() {
  createCanvas(400, 400);
  angleSlider = createSlider(0, TWO_PI, PI / 4, 0.01);
  lenSlider = createSlider(0, 200, 100, 1);
  angleSlider.position(20, 20);
  lenSlider.position(20, 50);
  angleSlider.input(updateTurtle);
  lenSlider.input(updateTurtle);
  updateTurtle();
}

function updateTurtle() {
  angle = angleSlider.value();
  len = lenSlider.value();
  background(51);
  turtle();
  let button = createButton("generate");
  button.mousePressed(generate);
  button.position(20, 80);
}
```

*In this code, we introduce two sliders using the createSlider() function provided by p5.js, set their initial value and position, and tie them to the updateTurtle() function via the input() method so the display is updated whenever the user interacts with the sliders.*

*The updateTurtle() function first updates the angle and length according to the sliders' values, then clears the canvas and redraws the turtle graphic. It also updates the interactive button's text and ties it with the generate() function to create the new fractal structure every time the button is clicked.*

*The overall setup of the L-system is the same as the previous discussion, but now the fractal characteristics can be interactively updated using sliders to tweak the angle and length configurations.*

*With this code, you can explore different configurations of the specified L-system in a more interactive way.*

*Please note, this code assumes a simple L-system. If your rule-set is more complex, you may need to make adjustments accordingly.*



