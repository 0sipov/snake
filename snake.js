const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");

class Snake {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.tail = [{ x: this.x, y: this.y }];
    this.rotateX = -1;
    this.rotateY = 0;
  }

  move() {
    let newRect;
    if (this.rotateX === 1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x + 5,
        y: this.tail[this.tail.length - 1].y,
      };
    }
    if (this.rotateX === -1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x - 5,
        y: this.tail[this.tail.length - 1].y,
      };
    }
    if (this.rotateY === 1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x,
        y: this.tail[this.tail.length - 1].y + 5,
      };
    }
    if (this.rotateY === -1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x,
        y: this.tail[this.tail.length - 1].y - 5,
      };
    }

    this.tail.shift();
    this.tail.push(newRect);
  }
}

class Apple {
  constructor() {
    this.color = "pink";
    this.size = snake.size;

    // let isTouching;
    // while (true) {
    //   isTouching = false;
    //   this.x =
    //     Math.floor((Math.random() * canvas.width) / snake.size) * snake.size;
    //   this.y =
    //     Math.floor((Math.random() * canvas.height) / snake.size) * snake.size;

    //   for (let i = 1; i < snake.tail.length; i++) {
    //     if (this.x === snake.tail[i].x && this.y === snake.tail[i].y) {
    //       isTouching = true;
    //     }
    //   }
    //   if (isTouching) {
    //     break;
    //   }
    // }
  }
}

let snake = new Snake(canvas.width / 2, canvas.height / 2, 25);
// const apple = new Apple();

function gameLoop() {
  setInterval(show, 1000 / 15);
}

window.onload = () => gameLoop();

function show() {
  update();
  drow();
  checkHitWall();
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
  // createRect(apple.x, apple.y, apple.size, apple.size, apple.color);
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
  console.log(`Klick: ${e.key}, ${window.event.type}`);
});
