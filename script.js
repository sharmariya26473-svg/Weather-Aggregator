async function searchRecipe() {
  let input = document.getElementById(
    "searchInput").value;

  if (!input) {
    alert("Please enter a food name!");
    return;
  }

  let loading = document.getElementById(
    "loading");
  let results = document.getElementById(
    "results");

  loading.style.display = "block";
  results.innerHTML = "";

  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
    );
    let data = await response.json();

    loading.style.display = "none";

    if (!data.meals) {
      results.innerHTML = `
        <div class="no-results">
          😕 No recipes found for 
          "${input}"<br>
          Try: chicken, pasta, pizza
        </div>`;
      return;
    }

    data.meals.forEach(meal => {

      let ingredients = [];
      for (let i = 1; i <= 5; i++) {
        if (meal[`strIngredient${i}`]) {
          ingredients.push(
            meal[`strIngredient${i}`]
          );
        }
      }

      results.innerHTML += `
        <div class="recipe-card">
          <img src="${meal.strMealThumb}" 
            alt="${meal.strMeal}">
          <div class="card-body">
            <h3>${meal.strMeal}</h3>
            <span class="category-badge">
              ${meal.strCategory}
            </span>
            <p class="ingredients">
              <strong>
                Main Ingredients:
              </strong><br>
              ${ingredients.join(", ")}...
            </p>
          </div>
        </div>`;
    });

  } catch (error) {
    loading.style.display = "none";
    results.innerHTML = `
      <div class="no-results">
        ❌ Something went wrong!<br>
        Check your internet connection
      </div>`;
  }
}
