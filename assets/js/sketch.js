const NUMBER_OF_LINES = 15;

let canvas;
let lines;
let previousHeight;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-holder');

  let contentWidth = parseInt(window.getComputedStyle(content).width);

  lines = [];
  for (let i = 0; i < NUMBER_OF_LINES; i++) {
    let line = new Line(
      random(height),
      random(height),
      random(0.05, 0.1) * (random(-0.5, 0.5) < 0 ? -1 : 1),
      random(0.05, 0.1) * (random(-0.5, 0.5) < 0 ? -1 : 1),
      ceil(random(2.5)),
      random(200, 255),
      random(200, 255),
      random(200, 255)
    );
    lines.push(line);
  }

  previousHeight = windowHeight;
  window.addEventListener('resize', resizeAndRedraw);
}

function draw() {
  clear();

  for (const line of lines) {
    line.update();
    line.draw();
  }
}

function resizeAndRedraw() {
  let ratio = windowHeight / previousHeight;
  for(const line of lines) {
    line.y1 *= ratio;
    line.y2 *= ratio;
  }
  resizeCanvas(windowWidth, windowHeight);
  previousHeight = windowHeight;
}

class Line {

  constructor(y1, y2, speed1, speed2, number, r, g, b) {
    this.y1 = y1;
    this.y2 = y2;
    this.speed1 = speed1;
    this.speed2 = speed2;
    this.number = number;
    this.r = r;
    this.g = g;
    this.b = b;
  }

  update() {
    this.y1 += this.speed1;
    this.y2 += this.speed2;

    if (this.y1 + this.number * 10 > height && this.speed1 > 0 ||
        this.y1 < 0 && this.speed1 < 0) {
      this.speed1 *= -1;
    }

    if (this.y2 + this.number * 10 > height && this.speed2 > 0 ||
        this.y2 < 0 && this.speed2 < 0) {
      this.speed2 *= -1;
    }
  }

  draw() {
    for (let i = 0; i < this.number; i++) {
      stroke(this.r, this.g, this.b, 255 - i * 100);
      line(0, this.y1 + i * 10, width, this.y2 + i * 10);
    }
  }

}