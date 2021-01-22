const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchange rates and update the DOM
function calculate() {
	const currency_one = currencyEl_one.value;
	const currency_two = currencyEl_two.value;

	fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			const rate = data.rates[currency_two]; // using as an index

			rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

			amountEl_two.value = (amountEl_one.value * rate).toFixed(2); // toFixed() > to set up how many decimals
		});
}

// Event listeners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

calculate();

swap.addEventListener("click", () => {
	const temporaryValue = currencyEl_one.value;
	currencyEl_one.value = currencyEl_two.value;
	currencyEl_two.value = temporaryValue;
	calculate();
});
