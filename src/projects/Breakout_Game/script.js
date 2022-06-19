'use strict';

openAndCloseInfoPanel();
playGameWidthCanvas();

function openAndCloseInfoPanel() {
  const rulesBtnEl = document.querySelector('#rules-btn');
  const closeBtnEl = document.querySelector('#close-btn');
  const rulesEl = document.querySelector('#rules');

  rulesBtnEl.addEventListener('click', showRulesInformation);
  closeBtnEl.addEventListener('click', closeRulesInformation);

  function showRulesInformation() {
    rulesEl.classList.add('show');
  }

  function closeRulesInformation() {
    rulesEl.classList.remove('show');
  }
}

function playGameWidthCanvas() {
  const BALL_SIZE = 10;
  const BALL_SPEED = 4;
  const PADDLE_SIZE = 90;
  const PADDLE_SPEED = 8;
  const BRICK_ROW_COUNT = 9;
  const BRICK_COLUMN_COUNT = 5;
  const MAIN_COLOR = '#14adb3';

  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');

  let score = 0;

  document.addEventListener('keydown', keyDown);
  document.addEventListener('keyup', keyUp);

  // Create ball props.
  const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: BALL_SIZE,
    speed: BALL_SPEED,
    dx: 4,
    dy: -4,
  };

  // Create paddle props.
  const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    width: PADDLE_SIZE,
    height: 10,
    speed: PADDLE_SPEED,
    dx: 0,
  };

  // Create brick drops.
  const brickInfo = {
    width: 70,
    height: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true,
  };

  // Create bricks.
  const bricks = [];

  for (let i = 0; i < BRICK_ROW_COUNT; i++) {
    bricks[i] = [];

    for (let j = 0; j < BRICK_COLUMN_COUNT; j++) {
      const x = i * (brickInfo.width + brickInfo.padding) + brickInfo.offsetX;
      const y = j * (brickInfo.height + brickInfo.padding) + brickInfo.offsetY;

      bricks[i][j] = {
        x, y, ...brickInfo,
      };
    }
  }

  update();

  // Call all Draw function.
  function allDraw() {
    // Clear Canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
  }

  // Update Canvas drawing and Animation.
  function update() {
    movePaddle();
    moveBall();
    allDraw();
    requestAnimationFrame(update);
  }

  // Draw ball on canvas.
  function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = MAIN_COLOR;
    ctx.fill();
    ctx.closePath();
  }

  // Draw paddle on canvas.
  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = MAIN_COLOR;
    ctx.fill();
    ctx.closePath();
  }

  // Draw score on canvas.
  function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
  }

  // Draw bricks on canvas
  function drawBricks() {
    bricks.forEach((column) => {
      column.forEach((brick) => {
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brick.width, brick.height);
        ctx.fillStyle = brick.visible ? MAIN_COLOR : 'transparent';
        ctx.fill();
        ctx.closePath();
      });
    });
  }

  // Move paddle on canvas.
  function movePaddle() {
    paddle.x += paddle.dx;

    if (paddle.x + paddle.width > canvas.width) {
      paddle.x = canvas.width - paddle.width;
    }

    if (paddle.x < 0) {
      paddle.x = 0;
    }
  }

  // Move ball on canvas.
  function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision (right / left)
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
      ball.dx *= -1;
    }

    // Wall collision (top / bottom)
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
      ball.dy *= -1;
    }

    // Paddle collision.
    if (
      ball.x - ball.size > paddle.x
			&& ball.x + ball.size < paddle.x + paddle.width
			&& ball.y + ball.size > paddle.y
    ) {
      ball.dy = -ball.speed;
    }

    // Bricks collision.
    bricks.forEach((column) => {
      column.forEach((brick) => {
        if (brick.visible) {
          if (
            ball.x - ball.size > brick.x
						&& ball.x + ball.size < brick.x + brick.width
						&& ball.y + ball.size > brick.y
						&& ball.y - ball.size < brick.y + brick.height
          ) {
            ball.dy *= -1;
            brick.visible = false;
            increaseScore();
          }
        }
      });
    });

    // Hit bottom wall - Lose !
    if (ball.y + ball.size > canvas.height) {
      showAllBricks();
      score = 0;
    }
  }

  // Increase score.
  function increaseScore() {
    score++;

    if (score % (BRICK_ROW_COUNT * BRICK_ROW_COUNT) === 0) {
      showAllBricks();
    }
  }

  // Make all Bricks appear.
  function showAllBricks() {
    bricks.forEach((column) => {
      column.forEach((brick) => (brick.visible = true));
    });
  }

  // KeyDown Event.
  function keyDown(event) {
    const key = event.key;

    if (key === 'Right' || key === 'ArrowRight') {
      paddle.dx = paddle.speed;
    } else if (key === 'Left' || key === 'ArrowLeft') {
      paddle.dx = -paddle.speed;
    }
  }

  // KeyUp Event.
  function keyUp(event) {
    const key = event.key;

    if (key === 'Right' || key === 'ArrowRight' || key === 'Left' || key === 'ArrowLeft') {
      paddle.dx = 0;
    }
  }
}
