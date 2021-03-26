const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");
// 1. Create canvas context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// 6.a) Start the score
let score = 0;

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
};

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

// 7. Draw everything -> call the functions
function draw() {
	drawBall();
	drawPaddle();
	drawScore();
}
draw();

// Rules and close event handlers
rulesBtn.addEventListener("click", () => {
	rules.classList.add("show");
});

closeBtn.addEventListener("click", () => {
	rules.classList.remove("show");
});
