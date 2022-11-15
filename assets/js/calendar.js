var scheduleEl = document.getElementById("schedule");
scheduleEl.addEventListener("click", function(event) {
    var element = event.target;

    if (element.matches("#move-btn")) {
        var currentMeal = element.getAttribute("data-meal");

        var currentMealEl = document.querySelector("#" + currentMeal);
        var currentMealRecipe = currentMealEl.children[1];
        var currentMealRecipeName = currentMealRecipe.textContent;
        var currentMealImage = currentMealEl.children[2];
        var currentMealImageUrl = currentMealImage.getAttribute("src");
        
        var selects = currentMealEl.children[3];
        var daySelected = selects.children[0];
        var mealSelected = selects.children[1];
        var newMeal = daySelected.value + "-" + mealSelected.value;
        
        var newMealEl = document.querySelector("#" + newMeal);
        var newMealRecipe = newMealEl.children[1];
        var newMealImage = newMealEl.children[2];

        if (currentMeal !== newMeal) {
            if (currentMealRecipeName !== "") {
                newMealRecipe.textContent = currentMealRecipeName;
                currentMealRecipe.textContent = "";
            }
            if (currentMealImageUrl !== "") {
                newMealImage.setAttribute("src", currentMealImageUrl)
                currentMealImage.setAttribute("src", "")
            }
        }
    }
    
    if (element.matches("#copy-btn")) {
        var currentMeal = element.getAttribute("data-meal");

        var currentMealEl = document.querySelector("#" + currentMeal);
        var currentMealRecipe = currentMealEl.children[1];
        var currentMealRecipeName = currentMealRecipe.textContent;
        var currentMealImage = currentMealEl.children[2];
        var currentMealImageUrl = currentMealImage.getAttribute("src");
        
        var selects = currentMealEl.children[3];
        var daySelected = selects.children[0];
        var mealSelected = selects.children[1];
        var newMeal = daySelected.value + "-" + mealSelected.value;
        
        var newMealEl = document.querySelector("#" + newMeal);
        var newMealRecipe = newMealEl.children[1];
        var newMealImage = newMealEl.children[2];

        if (currentMealRecipeName !== "") {
            newMealRecipe.textContent = currentMealRecipeName;
            newMealImage.setAttribute("src", currentMealImageUrl);
        }    
    }

    if (element.matches("#remove-btn")) {
        var currentMeal = element.getAttribute("data-meal");

        var currentMealEl = document.querySelector("#" + currentMeal);
        var currentMealRecipe = currentMealEl.children[1];
        var currentMealRecipeName = currentMealRecipe.textContent;
        var currentMealImage = currentMealEl.children[2];
        var currentMealImageUrl = currentMealImage.getAttribute("src");

        if (currentMealRecipeName !== "") {
            currentMealRecipe.textContent = "";
            currentMealImage.setAttribute("src", "");
        }
    }
});