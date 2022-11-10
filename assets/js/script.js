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




// Variables for form selects and IDs
var searchBoxEl = $("#search-box");
// bellow is inside <form id="search-form"></form>
var searchInputEl = $("#search-input");
var dietInputEl = $("#diet-input");
var healthInputEl = $("#health-input");
var cuisineTypeInputEl = $("#cuisineType-input");
var mealTypeInputEl = $("#mealType-input");
var dishTypeInputEl = $("#dishType-input");
var searchButtonEl = $("#search-button");
// <section id="search-results"></section>
var searchResultsEl = $("#search-results");
// bellow is inside <aside>
var scheduleEl = $("#schedule");
var mondayEl = $("#monday");
var tuesdayEl = $("#tuesday");
var wednesdayEl = $("#wednesday");
var thursdayEl = $("#thursday");
var fridayEl = $("#friday");
var saturdayEl = $("#Saturday");
var sundayEl = $("#sunday");

//examples
//https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=0b97683e&app_key=8b9f9e545d235c4ae37ac9cbb16a65a5&diet=low-carb

//https://api.edamam.com/api/recipes/v2?type=public&app_id=0b97683e&app_key=8b9f9e545d235c4ae37ac9cbb16a65a5&q=chicken&diet=low-carb

// The endpoint with only id and key
var formSearchEdamamURL =
  "https://api.edamam.com/api/recipes/v2?type=public&app_id=0b97683e&app_key=8b9f9e545d235c4ae37ac9cbb16a65a5";

// main
$(function () {
  // load the home page on landing
  // loadHomePage();

  // listen for user to search
  searchButtonEl.on("click", loadResultsPage);

  // listen for user to go home
  // header.on("click", loadHomePage); // maybe just relode site?

  // listen for user to got to calendar
  // loadCalendarPage();
});

// call ajaxQueryData
// position page elements
// fill in results with data
function loadResultsPage(event) {
  // postion elements
  // positionResultsPage();

  // query data
  var apiObject = ajaxQueryData(event);
  console.log(apiObject);

  // fill results
  fillSearchResults(apiObject);
}

function ajaxQueryData(event) {
  event.preventDefault();
  //collect and store parameters
  var parameterObj = {};
  $(searchBoxEl)
    .children()
    .each(function () {
      // console.log("This.val() in .each: " + $(this).val());
      // If the option($(this)) has a value than add it to the paramater object
      if (
        $(this).val() != "" &&
        $(this).attr("id") != "search-button" &&
        $(this).val() != null &&
        $(this).val() != "none"
      ) {
        var inputID = $(this).attr("id");
        var inputValue = $(this).val();
        // use options id and value as key pairs for parameters
        parameterObj[inputID] = inputValue;
        // console.log("val()This. in if(): " + $(this).val());
      }
    });

  // console.log(parameterObj); // Shows parameters
  // use paramater obj to query
  var storeResults;
  $.ajax({
    async: false,
    url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=0b97683e&app_key=8b9f9e545d235c4ae37ac9cbb16a65a5",
    data: parameterObj,
    success: function (result) {
      // console.log(result); // SHOULD SHOW API OBJECT WITH RECIPES
      // console.log(result.hits); // SHOULD SHOW RECIPES
      storeResults = result.hits;
    },
  });

  return storeResults;
}

function fillSearchResults(results) {
  // For each card in #search-results
  var cardNumber = 0;
  $("#search-results")
    .children()
    .each(function () {
      cardNumber++;
    });
}
