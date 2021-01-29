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

let playable = true;

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
		finalMessageRevealWord.innerText = "";

		popup.style.display = "flex";

		playable = false;
	}
}

// Update the wrong letters
function updateWrongLettersEl() {
	// Display wrong letters
	wrongLettersEl.innerHTML = `
		${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
		${wrongLetters.map((letter) => `<span>${letter}</span>`)}
	`;

	// Display - build the hangman
	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length; // to check how many errors are there?

		if (index < errors) {
			part.style.display = "block";
		} else {
			part.style.display = "none";
		}
	});

	// Check if lost
	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = "Oh sorry, you lost 🥺";
		finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;

		// show popup window styled earlier
		popup.style.display = "flex";

		playable = false;
	}
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
	if (playable) {
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
	}
});

// Restart the game and play again
playAgainBtn.addEventListener("click", () => {
	playable = true;

	// Empty arrays
	correctLetters.splice(0);
	wrongLetters.splice(0);

	// Get a random word
	selectedWord = words[Math.floor(Math.random() * words.length)];

	displayWord();
	// Clean up the wrong letters
	updateWrongLettersEl();
	// Hide the pop up
	popup.style.display = "none";
});

displayWord();
