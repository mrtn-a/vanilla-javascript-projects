const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");
// 1. Create canvas context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// 6.a) Start the score
let score = 0;

// 8. Create the brick row/column
const brickRowCount = 9;
const brickColumnCount = 5;

// 2. Create ball props
const ball = {
	x: canvas.width / 2, // to start right in the middle
	y: canvas.height / 2,
	size: 10,
	// animation related
	speed: 4,
	dx: 4,
	dy: -4,
};

// 4. Create paddle props
const paddle = {
	x: canvas.width / 2 - 40,
	y: canvas.height - 20,
	w: 80,
	h: 10,
	speed: 8,
	dx: 0,
	visible: true,
};

// 9. Create brick props
const brickInfo = {
	w: 70,
	h: 20,
	padding: 10,
	offsetX: 45,
	offsetY: 60,
	visible: true,
};

// 10. Create the bricks
const bricks = []; // initialize the array
for (let i = 0; i < brickRowCount; i++) {
	bricks[i] = [];
	for (let j = 0; j < brickColumnCount; j++) {
		const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
		const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
		bricks[i][j] = { x, y, ...brickInfo }; // create the brick object
	}
}
// console.log(bricks);

// 3. Draw ball onto canvas
function drawBall() {
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
	ctx.fillStyle = "#0095dd";
	ctx.fill();
	ctx.closePath();
}

// 5. Draw paddle on canvas
function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
	ctx.fillStyle = "#0095dd";
	ctx.fill();
	ctx.closePath();
}

// 6.b) Draw score on canvas
function drawScore() {
	ctx.font = "20px Arial";
	ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// 11. Draw bricks onto canvas (array of array)
function drawBricks() {
	bricks.forEach((column) => {
		column.forEach((brick) => {
			// looping through to create multiple bricks, multiple objects
			ctx.beginPath();
			ctx.rect(brick.x, brick.y, brick.w, brick.h);
			ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
			ctx.fill();
			ctx.closePath();
		});
	});
}

// 13. Move paddle on canvas
function movePaddle() {
	paddle.x += paddle.dx;

	// Wall detection

	// - right side
	if (paddle.x + paddle.w > canvas.width) {
		paddle.x = canvas.width - paddle.w;
	}

	// - left side
	if (paddle.x < 0) {
		paddle.x = 0;
	}
}

// 17. Move ball on canvas
function moveBall() {
	// move the ball up and over
	ball.x += ball.dx;
	ball.y += ball.dy;
	// Ball is bouncing around the canvas and not getting outside of it ->
	// wall collision (right/left)
	if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
		ball.dx *= -1; // ball.dx = ball.dx * -1
	}

	// Wall collision (top/bottom)
	if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
		ball.dy *= -1;
	}

	// console.log(ball.x, ball.y);

	// Paddle collision (checking the left side and the right side; ball vs paddle)
	if (
		ball.x - ball.size > paddle.x &&
		ball.x + ball.size < paddle.x + paddle.w &&
		ball.y + ball.size > paddle.y
	) {
		ball.dy = -ball.speed; // if true, reverse the ball
	}

	// Brick collision
	bricks.forEach((column) => {
		column.forEach((brick) => {
			if (brick.visible) {
				if (
					ball.x - ball.size > brick.x && // left brick side check
					ball.x + ball.size < brick.x + brick.w && // right brick side check
					ball.y + ball.size > brick.y && // top brick side check
					ball.y - ball.size < brick.y + brick.h // bottom brick side check
				) {
					ball.dy *= -1;
					brick.visible = false;

					increaseScore();
				}
			}
		});
	});
}

// 7. Draw everything -> and and call the game draw functions
function draw() {
	// clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawBall();
	drawPaddle();
	drawScore();
	drawBricks();
}

// 12. Update canvas drawing and animation
function update() {
	movePaddle();
	moveBall();
	// draw everything (7.)
	draw();

	requestAnimationFrame(update);
}

update();

// 15. Keydown event (keydown on the arrow right / left of the keyboard)
function keyDown(e) {
	if (e.key === "Right" || e.key === "ArrowRight") {
		paddle.dx = paddle.speed;
	} else if (e.key === "Left" || e.key === "ArrowLeft") {
		paddle.dx = -paddle.speed;
	}
}

// 16. Keyup event
function keyUp(e) {
	if (
		e.key === "Right" ||
		e.key === "ArrowRight" ||
		e.key === "Left" ||
		e.key === "ArrowLeft"
	) {
		paddle.dx = 0;
	}
}

// 14. Keyboard event handlers
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// Rules and close event handlers
rulesBtn.addEventListener("click", () => {
	rules.classList.add("show");
});

closeBtn.addEventListener("click", () => {
	rules.classList.remove("show");
});
