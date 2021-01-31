const search = document.getElementById("search"),
	submit = document.getElementById("submit"),
	random = document.getElementById("random"),
	mealsEl = document.getElementById("meals"),
	resultsHeading = document.getElementById("result-heading"),
	single_mealEl = document.getElementById("single-meal");

// Search meal and fetch from API
function searchMeal(e) {
	e.preventDefault(); // as it's a submit, we need to prevent it

	// Clear single meal
	single_mealEl.innerHTML = "";

	// Get search term
	const term = search.value;

	// Check for empty
	if (term.trim()) {
		fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				resultsHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

				// Check if there's any meal in the API with the search term
				if (data.meals === null) {
					resultsHeading.innerHTML =
						"<p>There are not search results. Please try again.</p>";
				} else {
					mealsEl.innerHTML = data.meals
						.map(
							(meal) => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
					`
						)
						.join(""); // to make it a string
				}
			});
		// Clear search text
		search.value = "";
	} else {
		alert("Please enter a search term");
	}
}

// Fetch meal by ID (+ Lookup full meal details by id -> from API)
function getMealById(mealID) {
	fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			const meal = data.meals[0]; // first value from the array

			addMealToDOM(meal);
		});
}

// Fetch random meal from API
function getRandomMeal() {
	// Clear meals and heading first
	mealsEl.innerHTML = "";
	resultsHeading.innerHTML = "";
	// Lookup a single random meal from API
	fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			const meal = data.meals[0]; // first value from the array

			addMealToDOM(meal);
		});
}

// Add meal to DOM (-> part with ingredients and measurement from API)
// -> create an array with ingredients and measurement
function addMealToDOM(meal) {
	const ingredients = []; // initialize the arr

	for (let i = 1; i <= 20; i++) {
		// max ingredient list in API is 20, sometimes less so it leaves it empty, we need to check
		if (meal[`strIngredient${i}`]) {
			ingredients.push(
				`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
			);
		} else {
			break;
		}
	}

	single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>Category: ${meal.strCategory}</p>` : ""} 
        ${meal.strArea ? `<p>Origin: ${meal.strArea}</p>` : ""}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
        </ul>
      </div>
    </div>
	`;
}

// EVENT LISTENERS

submit.addEventListener("submit", searchMeal);

mealsEl.addEventListener("click", (e) => {
	const mealInfo = e.path.find((item) => {
		// check if there's a class of 'meal info' which is the one we need
		if (item.classList) {
			return item.classList.contains("meal-info");
		} else {
			return false;
		}
	});

	// check for meal-info and get the ID
	if (mealInfo) {
		const mealID = mealInfo.getAttribute("data-mealid");
		getMealById(mealID);
	}
});

random.addEventListener("click", getRandomMeal);
