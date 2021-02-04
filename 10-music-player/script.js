const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Songs title array
const songs = ["hey", "summer", "ukulele"];

// Keep track of song
let songIndex = 2; // ukulele song

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
	title.innerText = song;
	audio.src = `music/${song}.mp3`;
	cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
	musicContainer.classList.add("play");
	playBtn.querySelector("i.fas").classList.remove("fa-play");
	playBtn.querySelector("i.fas").classList.add("fa-pause");

	audio.play();
}

// Pause song
function pauseSong() {
	musicContainer.classList.remove("play");
	playBtn.querySelector("i.fas").classList.add("fa-play");
	playBtn.querySelector("i.fas").classList.remove("fa-pause");

	audio.pause();
}

// Previous song
function prevSong() {
	songIndex--; // decrease the index by 1

	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}

	loadSong(songs[songIndex]);

	playSong();
}

// Next song
function nextSong() {
	songIndex++; // increment the index by 1

	if (songIndex > songs.length - 1) {
		// if greater than 2 in this case
		songIndex = 0; // index 0 = the first song
	}

	loadSong(songs[songIndex]);

	playSong();
}

// Update progress bar
function updateProgress(e) {
	const { duration, currentTime } = e.srcElement;
	console.log(duration, currentTime);

	const progressPercent = (currentTime / duration) * 100;
	console.log(progressPercent);
	progress.style.width = `${progressPercent}%`;
}

// Set progress bar as we click
function setProgressBar(e) {
	const width = this.clientWidth;
	console.log(width);

	const clickX = e.offsetX;
	console.log(clickX);

	const duration = audio.duration;

	audio.currentTime = (clickX / width) * duration;
}

// Event listeners:
// Play and pause song
playBtn.addEventListener("click", () => {
	const isPlaying = musicContainer.classList.contains("play"); // if the container has 'play' class on it, we know the music is playing

	if (isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
});

// Change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgressBar);
