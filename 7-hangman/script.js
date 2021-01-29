const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
	"final-message-reveal-word"
);

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "martyna", "gaudi", "programming", "barcelona"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show the hidden word
function displayWord() {
	wordEl.innerHTML = `
	${selectedWord
		.split("")
		.map(
			// displays a letter if it's there, if not, empty string
			(letter) => `
			<span class="letter">
				${correctLetters.includes(letter) ? letter : ""} 
			</span>
			`
		)
		// to turn it back into a string
		.join("")}
	`;
	const innerWord = wordEl.innerText.replace(/[ \n]/g, "");

	if (innerWord === selectedWord) {
		finalMessage.innerText = "Congratulations, you won 🥳";
		popup.style.display = "flex";
	}
}

// Update the wrong letters
function updateWrongLettersEl() {
	console.log("wrong");
}

// Show notification
function showNotification() {
	notification.classList.add("show");

	setTimeout(() => {
		notification.classList.remove("show");
	}, 2000);
}

// Keydown letter press
window.addEventListener("keydown", (e) => {
	// if (playable) {
	if (e.keyCode >= 65 && e.keyCode <= 90) {
		const letter = e.key.toLowerCase();

		if (selectedWord.includes(letter)) {
			if (!correctLetters.includes(letter)) {
				correctLetters.push(letter);

				displayWord();
			} else {
				showNotification();
			}
		} else {
			if (!wrongLetters.includes(letter)) {
				wrongLetters.push(letter);

				updateWrongLettersEl();
			} else {
				showNotification();
			}
		}
	}
});

displayWord();
