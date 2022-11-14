var scheduleEl = document.getElementById("schedule");
scheduleEl.addEventListener("click", function(event) {
    var element = event.target;

    if (element.matches("#move-btn")) {
        var currentMeal = element.getAttribute("data-meal");

        var currentMealEl = document.querySelector("#" + currentMeal);
        var currentMealRecipe = currentMealEl.children[1];
        var currentMealRecipeName = currentMealRecipe.textContent;
        
        var daySelected = currentMealEl.children[2];
        var mealSelected = currentMealEl.children[3];
        var newMeal = daySelected.value + "-" + mealSelected.value;
        
        var newMealEl = document.querySelector("#" + newMeal);
        var newMealRecipe = newMealEl.children[1];

        if (currentMeal !== newMeal) {
            if (currentMealRecipeName !== "") {
                newMealRecipe.textContent = currentMealRecipeName;
                currentMealRecipe.textContent = "";
            }
        }
    }
    
    if (element.matches("#copy-btn")) {
        var currentMeal = element.getAttribute("data-meal");

        var currentMealEl = document.querySelector("#" + currentMeal);
        var currentMealRecipe = currentMealEl.children[1];
        var currentMealRecipeName = currentMealRecipe.textContent;
        
        var daySelected = currentMealEl.children[2];
        var mealSelected = currentMealEl.children[3];
        var newMeal = daySelected.value + "-" + mealSelected.value;

        var newMealEl = document.querySelector("#" + newMeal);
        var newMealRecipe = newMealEl.children[1];
        if (currentMealRecipeName !== "") {
            newMealRecipe.textContent = currentMealRecipeName;
        }    
    }

    if (element.matches("#remove-btn")) {
        var currentMeal = element.getAttribute("data-meal");

        var currentMealEl = document.querySelector("#" + currentMeal);
        var currentMealRecipe = currentMealEl.children[1];
        var currentMealRecipeName = currentMealRecipe.textContent;

        if (currentMealRecipeName !== "") {
            currentMealRecipe.textContent = "";
        }
    }
});