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

// EVENT LISTENERS

submit.addEventListener("submit", searchMeal);
