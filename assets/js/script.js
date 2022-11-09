//Jason - copy/past for adding this file
// git add ./assets/js/script.js
//------------------------------------
// Variables for form selects and IDs
var searchBoxEl = $("#search-box");
// bellow is inside <section id="search-box">
var searchForm = $("#search-form");
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

//https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=0b97683e&app_key=8b9f9e545d235c4ae37ac9cbb16a65a5&diet=low-carb

//https://api.edamam.com/api/recipes/v2?type=public&app_id=0b97683e&app_key=8b9f9e545d235c4ae37ac9cbb16a65a5&q=chicken&diet=low-carb

// The endpoint with only id and key parameters
var formSearchEdamamURL = "https://api.edamam.com/api/recipes/v2?type=public&app_id=0b97683e&app_key=8b9f9e545d235c4ae37ac9cbb16a65a5"
// 
// fetch()
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });

