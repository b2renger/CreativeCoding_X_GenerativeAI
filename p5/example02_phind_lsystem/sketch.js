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
