const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Размер клетки
const box = 20;

// Создание змейки
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

// Создание еды
let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box,
};

// Звуки
const foodSound = new Audio("assets/sounds/food.mp3");
const gameOverSound = new Audio("assets/sounds/gameover.mp3");

// Счет
let score = 0;

// Управление
let direction;
document.addEventListener("keydown", setDirection);

function setDirection(event) {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

// Проверка столкновений
function collision(head, array) {
  return array.some(segment => head.x === segment.x && head.y === segment.y);
}

// Основная функция игры
function drawGame() {
  ctx.fillStyle = "#dff9fb";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "lightgreen";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "darkgreen";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "UP") snakeY -= box;
  if (direction === "DOWN") snakeY += box;
  if (direction === "LEFT") snakeX -= box;
  if (direction === "RIGHT") snakeX += box;

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    foodSound.play();
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box,
    };
  } else {
    snake.pop();
  }

  const newHead = { x: snakeX, y: snakeY };

  if (
    snakeX < 0 ||
    snakeX >= canvas.width ||
    snakeY < 0 ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    gameOverSound.play();
    alert("Game Over! Your score: " + score);
  }

  snake.unshift(newHead);

  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, canvas.height - 10);
}

const game = setInterval(drawGame, 100);