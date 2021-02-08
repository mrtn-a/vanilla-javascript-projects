const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();

console.log("Number:", randomNum);

window.SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(e) {
	const msg = e.results[0][0].transcript; // we go two arrays in, both with index 0

	writeMessage(msg);
	checkNumber(msg);
}

// Write what user speaks
function writeMessage(msg) {
	msgEl.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
	`;
}

// ( +=  -> to append, instead of replace)

// Check user msg against the random number
function checkNumber(msg) {
	const num = +msg; // convert from a string to a number (just add plus +)

	// Check if valid number
	if (Number.isNaN(num)) {
		msgEl.innerHTML += "<div>That is not a valid number</div>";
		return;
	}

	// Check if number is in the range 1-100
	if (num > 100 || num < 1) {
		msgEl.innerHTML += "<div>Number must be between 1 and 100</div>";
		return;
	}

	// Check number if it matches or is bigger/smaller
	if (num === randomNum) {
		document.body.innerHTML = `
      <h2>Congrats! You have guessed the number! <br><br>
      It was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
	} else if (num > randomNum) {
		msgEl.innerHTML += "<div>GO LOWER</div>";
	} else {
		msgEl.innerHTML += "<div>GO HIGHER</div>";
	}
}

// Generate random number
function getRandomNumber() {
	return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener("result", onSpeak);

// End SpeachRecognition service
recognition.addEventListener("end", () => recognition.start());

// Play button
document.body.addEventListener("click", (e) => {
	if (e.target.id == "play-again") {
		window.location.reload();
	}
});
