const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const words = [
	"sigh",
	"tense",
	"airplane",
	"ball",
	"pies",
	"juice",
	"warlike",
	"bad",
	"north",
	"dependent",
	"steer",
	"silver",
	"highfalutin",
	"superficial",
	"quince",
	"eight",
	"feeble",
	"admit",
	"drag",
	"loving",
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Set difficulty to value in ls or medium
// -> checking in the local storage if the difficulty is saved there (if not null) and setting it to that value : or setting up to medium
let dificulty =
	localStorage.getItem("difficulty") !== null
		? localStorage.getItem("difficulty")
		: "medium";

// Set difficulty select value
difficultySelect.value =
	localStorage.getItem("difficulty") !== null
		? localStorage.getItem("difficulty")
		: "medium";

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate a random word from the array
function getRandomWord() {
	return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
	randomWord = getRandomWord();
	word.innerHTML = randomWord;
}

// Update score
function updateScore() {
	score++; // increment the score by 1
	scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
	time--; // decrease by 1
	timeEl.innerHTML = time + "s"; // to add word "s -> seconds"

	if (time === 0) {
		clearInterval(timeInterval);

		// end the game
		gameOver();
	}
}

// Game over, show end screen
function gameOver() {
	endgameEl.innerHTML = `
		<h1>Time run out</h1>
		<p>Your final score is ${score}</p>
		<button onclick="window.location.reload()">Reload</button>
	`;

	endgameEl.style.display = "flex";
}
addWordToDOM();

// Event listeners:

// Typing
text.addEventListener("input", (e) => {
	const insertedText = e.target.value;

	if (insertedText === randomWord) {
		addWordToDOM(); // word matches,call the function again
		updateScore(); // add points

		e.target.value = ""; // clear the text box

		// set up the difficulty level timing  // += -> append to it (add extra)
		if (difficulty === "hard") {
			time += 2;
		} else if (difficulty === "medium") {
			time += 3;
		} else {
			time += 5;
		}

		updateTime();
	}
});

// Settings btn click
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// Settings select
settingsForm.addEventListener("change", (e) => {
	difficulty = e.target.value; // check for the difficulty
	localStorage.setItem("difficulty", difficulty); // add difficulty to the local storage
});
