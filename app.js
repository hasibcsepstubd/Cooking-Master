// Author: Md. Hasibur Rashid
// Live: https://hasibcsepstubd.github.io/Cooking-Master/
// Code: https://github.com/hasibcsepstubd/Cooking-Master/ 



// Search meal by meal name ==========================================================

function searchMeal() {
    try {
        const mealName = document.getElementById('meal-name').value;
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.meals !== null) {
                    document.getElementById('meal-section').style.display = "none";
                    data.meals.forEach(element => {
                        div = document.createElement('div');
                        div.className = "col-md-3 h-100"
                        div.innerHTML = `<div id="card-info" class="card" style="width: 18rem;"  onclick="mealDetails(${element.idMeal})"><img src="${element.strMealThumb}"class="card-img-top" alt=""><div class="card-body"><h5 class="card-title text-center">${element.strMeal}</h5></div></div>`;
                    });
                    document.getElementById('meal-details-section').style.display="none";
                    document.getElementById('search').appendChild(div);

                } else {
                    alert("Sorry, we can't find anything like this.");
                    location.reload();
                }
            });

    } catch (error) {
        alert("Something went wrong. Please try again.");
        location.reload();
    }

}

// Enter button event
const input = document.getElementById("meal-name");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("search-btn").click();
  }
});



// Load meal from api =====================================================================

function loadData() {
    try {
        var div;

        for (let i = 0; i < 8; i++) {
            fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
                .then(response => response.json())
                .then((data) => {
                    // create each meal card from api data
                    data.meals.forEach(element => {
                        div = document.createElement('div');
                        div.className = "col-md-3 h-100"
                        div.innerHTML = `<div id="card-info" class="card" style="width: 18rem;" onclick="mealDetails(${element.idMeal})"><img src="${element.strMealThumb}"class="card-img-top" alt=""><div class="card-body"><h5 class="card-title text-center">${element.strMeal}</h5></div></div>`;
                    });
                    document.getElementById('card').appendChild(div);
                });
        }

    } catch (error) {
        alert("Something went wrong");
        location.reload();
    }
}



// Fetch meal details data from api ============================================================

function mealDetails(mealID) {
    try {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
            .then(response => response.json())
            .then(data => {
                // document.getElementById('search').style.display="none";
                document.getElementById('meal-details-section').style.display="block";
                mealDetailsInfo(data.meals[0])});

        // Meal Details info using arrow function
        const mealDetailsInfo = meal => {
            const mealInfoDiv = document.getElementById('meal-details');
            mealInfoDiv.innerHTML = `
                <div class="container d-flex justify-content-center">
                <div class="card" style="width: 25rem;">
                    <img src="${meal.strMealThumb}"
                        class="card-img-top" alt="...">
                    <div class="card-body">
                        <h3>${meal.strMeal}</h3>
                        <h6 class="card-text mt-4 mb-4">Ingredient</h6>
                        <ul class="list-group">
                            <li class="list-group-item">
                                <input class="form-check-input me-1" type="checkbox" value="" aria-label="...">
                                ${meal.strIngredient1}
                            </li>
                            <li class="list-group-item">
                                <input class="form-check-input me-1" type="checkbox" value="" aria-label="...">
                                ${meal.strIngredient2}
                            </li>
                            <li class="list-group-item">
                                <input class="form-check-input me-1" type="checkbox" value="" aria-label="...">
                                ${meal.strIngredient3}
                            </li>
                            <li class="list-group-item">
                                <input class="form-check-input me-1" type="checkbox" value="" aria-label="...">
                                ${meal.strIngredient4}
                            </li>
                            <li class="list-group-item">
                                <input class="form-check-input me-1" type="checkbox" value="" aria-label="...">
                                ${meal.strIngredient5}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            `
        }

    } catch (error) {
        alert("Something went wrong");
        location.reload();
    }
}

loadData();
