const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");

class Snake {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.tail = [
      { x: this.x, y: this.y },
      { x: this.x, y: this.y },
      { x: this.x, y: this.y },
      { x: this.x, y: this.y },
      { x: this.x, y: this.y },
      { x: this.x, y: this.y },
      { x: this.x, y: this.y },
      { x: this.x, y: this.y },
      { x: this.x, y: this.y },
      { x: this.x, y: this.y },
      { x: this.x, y: this.y },
      { x: this.x, y: this.y },
      { x: this.x, y: this.y },
      { x: this.x, y: this.y },
      { x: this.x, y: this.y },
      { x: this.x, y: this.y },
      { x: this.x, y: this.y },
      { x: this.x, y: this.y },
      { x: this.x, y: this.y },
      { x: this.x, y: this.y },
    ];
    this.rotateX = -1;
    this.rotateY = 0;
  }

  move() {
    let newRect;
    if (this.rotateX === 1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x + this.size,
        y: this.tail[this.tail.length - 1].y,
      };
    }
    if (this.rotateX === -1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x - this.size,
        y: this.tail[this.tail.length - 1].y,
      };
    }
    if (this.rotateY === 1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x,
        y: this.tail[this.tail.length - 1].y + this.size,
      };
    }
    if (this.rotateY === -1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x,
        y: this.tail[this.tail.length - 1].y - this.size,
      };
    }

    this.tail.shift();
    this.tail.push(newRect);
  }
}

class Apple {
  constructor() {
    let isTouching;

    while (true) {
      isTouching = false;
      this.x =
        Math.floor((Math.random() * canvas.width) / snake.size) * snake.size;
      this.y =
        Math.floor((Math.random() * canvas.height) / snake.size) * snake.size;

      for (let i = 0; i < snake.tail.length; i++) {
        if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
          isTouching = true;
        }
      }

      this.size = snake.size;
      this.color = "red";

      if (!isTouching) {
        break;
      }
    }
  }
}

let snake = new Snake(canvas.width / 2, canvas.height / 2, 10);
let apple = new Apple();

function gameLoop() {
  setInterval(show, 1000 / 15);
}

window.onload = () => gameLoop();

function show() {
  update();
  checkHitWall();
  checkHitTail();
  eatApple();
  drow();
  console.log(snake.tail.length);
}

function update() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  snake.move();
}

function drow() {
  createRect(0, 0, canvas.width, canvas.height, "black");
  createRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < snake.tail.length; i++) {
    createRect(
      snake.tail[i].x + 2.5,
      snake.tail[i].y + 2.5,
      snake.size - 5,
      snake.size - 5,
      "white"
    );
  }
  createRect(apple.x, apple.y, apple.size, apple.size, apple.color);
}

function eatApple() {
  if (apple.x === snake.tail[0].x && apple.y === snake.tail[0].y) {
    apple = new Apple();
    snake.tail[snake.tail.length] = {
      x: snake.tail[snake.tail.length - 1].x,
      y: snake.tail[snake.tail.length - 1].y,
    };
  }
}

function checkHitWall() {
  let headTail = snake.tail[snake.tail.length - 1];

  if (headTail.x == -snake.size) {
    headTail.x = canvas.width - snake.size;
  }
  if (headTail.x == canvas.width) {
    headTail.x = 0;
  }
  if (headTail.y == -snake.size) {
    headTail.y = canvas.height - snake.size;
  }
  if (headTail.y == canvas.height) {
    headTail.y = 0;
  }
}

function checkHitTail() {
  let headTail = snake.tail[snake.tail.length - 1];
  let bodyTail = snake.tail.slice(0, snake.tail.length - 1);
  let hitSectionIndex = null;
  let isHit = bodyTail.some((e, index) => {
    hitSectionIndex = index;
    return e.x === headTail.x && e.y === headTail.y;
  });
  if (isHit) {
    console.log(hitSectionIndex);
    snake.tail.splice(0, hitSectionIndex + 1);
  }
}

function createRect(x, y, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && snake.rotateY !== 1) {
    snake.rotateX = 0;
    snake.rotateY = -1;
  }
  if (e.key === "ArrowDown" && snake.rotateY !== -1) {
    snake.rotateX = 0;
    snake.rotateY = 1;
  }
  if (e.key === "ArrowRight" && snake.rotateX !== -1) {
    snake.rotateX = 1;
    snake.rotateY = 0;
  }
  if (e.key === "ArrowLeft" && snake.rotateX !== 1) {
    snake.rotateX = -1;
    snake.rotateY = 0;
  }
});
