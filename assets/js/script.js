// Pull random photo from API into img element
function getPhotoApi() {
    var requestPhotoUrl = "https://foodish-api.herokuapp.com/api/"

    fetch(requestPhotoUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var backgroundImage = document.getElementById("background-image");
        backgroundImage.setAttribute("src", data.image)
    })    
}

getPhotoApi();




//Jason - copy/past for adding this file
// git add ./assets/js/script.js
//------------------------------------
// Variables for form selects and IDs
var searchBoxEl = $("#search-box");
// bellow is inside <section id="search-box">
// var searchFormEl = $("#search-form");
// bellow is inside <form id="search-form"></form>
var searchInputEl = $("#search-input");
var dietInputEl = $("#diet-input");
var healthInputEl = $("#health-input");
var cuisineTypeInputEl = $("#cuisineType-input");
var mealTypeInputEl = $("#mealType-input");
var dishTypeInputEl = $("#dishType-input");
var searchButtonEl = $("#search-button");
// <section id="search-results"></section>
var searchResultsEl = $("#search-box");
// bellow is inside <aside>
var scheduleEl = $("#search-box");
var mondayEl = $("#search-box");
var tuesdayEl = $("#search-box");
var wednesdayEl = $("#search-box");
var thursdayEl = $("#search-box");
var fridayEl = $("#search-box");
var saturdayEl = $("#search-box");
var sundayEl = $("#search-box");

//examples
//https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=0b97683e&app_key=8b9f9e545d235c4ae37ac9cbb16a65a5&diet=low-carb

//https://api.edamam.com/api/recipes/v2?type=public&app_id=0b97683e&app_key=8b9f9e545d235c4ae37ac9cbb16a65a5&q=chicken&diet=low-carb

// The endpoint with only id and key parameters
var formSearchEdamamURL = "https://api.edamam.com/api/recipes/v2?type=public&app_id=0b97683e&app_key=8b9f9e545d235c4ae37ac9cbb16a65a5"

// main
$(function() {
    searchButtonEl.on("click", ajaxQueryData);

});


var ajaxQueryData = function(event) {
    event.preventDefault();
    //collect and store parameters
    var parameterObj = {};
    $(searchBoxEl).children().each(function () {
        // console.log("This.val() in .each: " + $(this).val());
        // If the option($(this)) has a value than add it to the paramater object
        if(($(this).val() != "") && ($(this).attr("id") != "search-button") && ($(this).val() != null) && ($(this).val() != "none")) {
            var inputID = $(this).attr("id");
            var inputValue = $(this).val();
            parameterObj[inputID] = inputValue; 
            // console.log("This.val() in if(): " + $(this).val());
        }
    });

    // console.log("parameters: " + parameterObj); // Shows parameters
    // console.log(parameterObj); // Shows parameters

    // use paramater obj to query
    $.ajax({
        url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=0b97683e&app_key=8b9f9e545d235c4ae37ac9cbb16a65a5",
        data: parameterObj,
        success: function( result ) {
            // console.log("ajax result: " +result); // SHOULD SHOW API OBJECT WITH RECIPES
            console.log(result); // SHOULD SHOW API OBJECT WITH RECIPES
        }
    });
}
