const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const localStorageTransactions = JSON.parse(
	localStorage.getItem("transactions")
);
// const dummyTransactions = [
// 	{ id: 1, text: "Flower", amount: -20 },
// 	{ id: 2, text: "Salary", amount: 300 },
// 	{ id: 3, text: "Book", amount: -10 },
// 	{ id: 4, text: "Camera", amount: 150 },
// ];

let transactions =
	localStorage.getItem("transactions") !== null ? localStorageTransactions : []; // if the local storage is not empty, then use the local storage transactions, else make it an empty array

// Add transaction
function addTransaction(e) {
	e.preventDefault();

	// check if no empty values
	if (text.value.trim() === "" || amount.value.trim() === "") {
		alert("Please add a text and amount");
	} else {
		const transaction = {
			id: generateID(),
			text: text.value,
			amount: +amount.value, // + to make it a number from a string
		};

		// adding to transactions array
		transactions.push(transaction);

		// pushing the transaction to the DOM
		addTransactionDOM(transaction);

		// update the values
		updateValues();

		// clear the input
		text.value = "";
		amount.value = "";
	}
}

// Generate random ID
function generateID() {
	return Math.floor(Math.random() * 100000);
}

// Add transactions to the DOM list
function addTransactionDOM(transaction) {
	// Get sign + -
	const sign = transaction.amount < 0 ? "-" : "+"; // value plus or minus

	const item = document.createElement("li");

	// Add css class based on the value
	item.classList.add(transaction.amount < 0 ? "minus" : "plus");

	item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
		transaction.amount
	)}</span> <button class="delete-btn" onclick="removeTransaction(${
		transaction.id
	})">x</button>
  `;

	list.appendChild(item);
}

// Update balance, income and expense
function updateValues() {
	// get the amounts value
	const amounts = transactions.map((transaction) => transaction.amount); // loop through and create a new array
	console.log(amounts);

	// sum up the amounts
	const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

	// get the income
	const income = amounts
		.filter((item) => item > 0)
		.reduce((acc, item) => (acc += item), 0)
		.toFixed(2);

	// get the expenses (-> -1 to have the negative amounts)
	const expense = (
		amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
		-1
	).toFixed(2);

	// display the values
	balance.innerText = `$${total}`;
	money_plus.innerText = `$${income}`;
	money_minus.innerText = `$${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
	transactions = transactions.filter((transaction) => transaction.id !== id); // filter for all the transactions that do not have the id we are trying to remove
	init(); // update the data
}

// Update local storage transactions
function updateLocalStorage() {
	localStorage.setItem("transactions", JSON.stringify(transactions));
}
// Init app
function init() {
	list.innerHTML = "";

	transactions.forEach(addTransactionDOM);
	updateValues();
}

init();

// Event listener

form.addEventListener("submit", addTransaction);
