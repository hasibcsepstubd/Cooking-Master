// Author: Md. Hasibur Rashid
// Live: https://hasibcsepstubd.github.io/Cooking-Master/
// Code: https://github.com/hasibcsepstubd/Cooking-Master/ 

//====================================================================
// Search meal 
function searchMeal() {
    try {
        const mealName = document.getElementById("meal-name").value;
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data.meals);
                if (data.meals !== null) {
                    document.getElementById("meal-section").style.display = "none";
                    data.meals.forEach(element => {
                        div = document.createElement('div');
                        div.className = "col-md-3 h-100"
                        div.innerHTML = `<div id="card-info" class="card" style="width: 18rem;"  data-meal-id="${element.idMeal}" onclick="mealDetails()"><img src="${element.strMealThumb}"class="card-img-top" alt=""><div class="card-body"><h5 class="card-title text-center">${element.strMeal}</h5></div></div>`;
                    });
                    document.getElementById("search").appendChild(div);
                } else {
                    alert("Nothing found anything.");
                    location.reload();
                }
            });

    } catch (error) {
        alert("Something went wrong. Please try again.");
        location.reload();
    }

}
// Load meal from api ====================================================
function loadData() {
    try {
        var div;

        for (let i = 0; i < 8; i++) {
            fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
                .then(response => response.json())
                .then((data) => {
                    data.meals.forEach(element => {
                        div = document.createElement('div');
                        div.className = "col-md-3 h-100"
                        div.innerHTML = `<div id="card-info" class="card" style="width: 18rem;"  data-meal-id="${element.idMeal}" onclick="mealDetails()"><img src="${element.strMealThumb}"class="card-img-top" alt=""><div class="card-body"><h5 class="card-title text-center">${element.strMeal}</h5></div></div>`;
                    });
                    document.getElementById("card").appendChild(div);
                });
        }
    }
    catch (error) {
        alert("Something went wrong");
    }
}

// Fetch meal details data =================================================
function mealDetails() {
    try {
        const id = document.getElementById('#card-info');
        const y = id.dataset.mealID;
        console.log(y);
        // fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        //     .then(response => response.json())
        //     .then(data => console.log(data));
        //     console.log(data);
    } catch (error) {
        alert("Something went wrong" + error);
    }

}

function myFunction() {
    alert("Hello World!");
}

loadData();
