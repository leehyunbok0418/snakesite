const board = document.getElementById('game-board');
let snake = [{x: 200, y: 200}];
let food = {x: 0, y: 0};
let direction = 'right';
let score = 0;

function drawSnake() {
  board.innerHTML = '';
  snake.forEach(segment => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.y / 20;
    snakeElement.style.gridColumnStart = segment.x / 20;
    snakeElement.classList.add('snake');
    board.appendChild(snakeElement);
  });
}

function drawFood() {
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y / 20;
  foodElement.style.gridColumnStart = food.x / 20;
  foodElement.classList.add('food');
  board.appendChild(foodElement);
}

function moveSnake() {
  const head = {x: snake[0].x + (direction === 'right' ? 20 : direction === 'left' ? -20 : 0), y: snake[0].y + (direction === 'down' ? 20 : direction === 'up' ? -20 : 0)};
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score++;
    generateFood();
  } else {
    snake.pop();
  }
}

function generateFood() {
  const x = Math.floor(Math.random() * 20) * 20;
  const y = Math.floor(Math.random() * 20) * 20;
  food = {x, y};
  if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    generateFood();
  }
}

function gameLoop() {
  moveSnake();
  drawSnake();
  drawFood();
  setTimeout(gameLoop, 100);
}

generateFood();
gameLoop();

document.addEventListener('keydown', event => {
  if ((event.key === 'ArrowUp' || event.key === 'w') && direction !== 'down') {
    direction = 'up';
  } else if ((event.key === 'ArrowDown' || event.key === 's') && direction !== 'up') {
    direction = 'down';
  } else if ((event.key === 'ArrowLeft' || event.key === 'a') && direction !== 'right') {
    direction = 'left';
  } else if ((event.key === 'ArrowRight' || event.key === 'd') && direction !== 'left') {
    direction = 'right';
  }
});
