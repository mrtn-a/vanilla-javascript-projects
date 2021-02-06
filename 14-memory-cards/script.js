const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = [
	{
		question: "What must a variable begin with?",
		answer: "A letter, $ or _",
	},
	{
		question: "What is a variable?",
		answer: "Container for a piece of data",
	},
	{
		question: "Example of Case Sensitive Variable",
		answer: "thisIsAVariable",
	},
];

// Create all cards
function createCards() {
	cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card in a DOM
function createCard(data, index) {
	const card = document.createElement("div");
	card.classList.add("card");

	// add 'active' class to the 1st card
	if (index === 0) {
		card.classList.add("active");
	}

	card.innerHTML = `
  <div class="inner-card">
	  <div class="inner-card-front">
	    <p>
	      ${data.question}
	    </p>
	  </div>
	  <div class="inner-card-back">
	    <p>
	      ${data.answer}
	    </p>
	  </div>
	</div>
  `;

	// Event listener to flip the card
	card.addEventListener("click", () => card.classList.toggle("show-answer"));

	// Add card to the DOM cards -> cardsEl
	cardsEl.push(card);

	cardsContainer.appendChild(card);

	updateCurrentText();
}

// Show the numbers of the cards (by default we start at index 0 so we add 1)
function updateCurrentText() {
	currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

createCards();

// Event listeners:

// 'Next' button functionality
nextBtn.addEventListener("click", () => {
	// get the current card by its index and set (override) the class name
	cardsEl[currentActiveCard].className = "card left";

	currentActiveCard = currentActiveCard + 1; // set up the card with 1 index more to display

	// keep the cards within the range, how many they are max (we put -1 as the indexes start at zero)
	if (currentActiveCard > cardsEl.length - 1) {
		currentActiveCard = cardsEl.length - 1;
	}

	cardsEl[currentActiveCard].className = "card active";

	updateCurrentText();
});

// 'Prev' button functionality
prevBtn.addEventListener("click", () => {
	// get the current card by its index and set (override) the class name
	cardsEl[currentActiveCard].className = "card right";

	currentActiveCard = currentActiveCard - 1; // set up the card with 1 index less to display

	// keep the cards within the range, how many they are max (we put -1 as the indexes start at zero)
	if (currentActiveCard < 0) {
		currentActiveCard = 0; // setting to index zero if the current class is the first one
	}

	cardsEl[currentActiveCard].className = "card active";

	updateCurrentText();
});
