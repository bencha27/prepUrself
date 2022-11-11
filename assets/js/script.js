// Pull random photo from API into img element
function getPhotoApi() {
    var requestPhotoUrl = "https://foodish-api.herokuapp.com/api/"

    fetch(requestPhotoUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var backgroundImage = document.getElementById("background-image");
        backgroundImage.setAttribute("src", data.image);
    })    
}

// getPhotoApi();

//form
var searchFormEl = $("#search-form");
var selectionsEl = $("#selections");
var searchInputEl = $("#q");
var searchButtonEl = $("#search-button");
var searchBarEl = $("#search-bar");
//results
var resultsContainerEl = $("resultsContainer");
var searchResultsEl = $("");
// aside
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
var edamamEndpoint =
  "https://api.edamam.com/api/recipes/v2?type=public&app_id=0b97683e&app_key=8b9f9e545d235c4ae37ac9cbb16a65a5";

// main (listen for page inputs)
// runs when DOM is ready
$(function () {
  // load the home page on landing
  // loadHomePage();

  // listen for user to search
  searchFormEl.on("submit", loadResultsPage);
  searchButtonEl.on("click", loadResultsPage);

  // listen for user to go home
  // header.on("click", loadHomePage); // maybe just relode site?

  // listen for user to got to calendar
  // loadCalendarPage();
}); // main end

function loadHomePage() {
  $(searchBarEl).css({ "margin-top": "350px" });
  // $(resultsContainerEl).hide();
  // $(resultsContainerEl).css("display", "none");
}

// -------- RESULTS PAGE ---------------
// call ajaxQueryData
// position page elements
// fill in results with data
function loadResultsPage(event) {
  // postion elements
  positionResultsPage();

  // query data
  var apiObject = ajaxQueryData(event);
  console.log(apiObject);

  // fill results
  // fillSearchResults(apiObject);
}

function positionResultsPage() {
  $(searchBarEl).css({ "margin-top": "20px" });
  $(resultsContainerEl).show();
}

function ajaxQueryData(event) {
  event.preventDefault();
  //collect and store parameters
  var parameterObj = {};
  // Go through filter selections
  $(selectionsEl)
    .children()
    .each(function () {
      // If the option($(this)) has a value than add it to the paramater object
      if ($(this).val() != "" && $(this).val() != null && $(this).val() != "none") {
        var inputID = $(this).attr("id");
        var inputValue = $(this).val();
        // use options id and value as key pairs for parameters
        parameterObj[inputID] = inputValue;
      }
    });

  // if user inputs string, use "q" for query param
  if (
    $(searchInputEl).val() != "" &&
    $(searchInputEl).val() != null &&
    $(searchInputEl).val() != "none"
  ) {
    var inputID = $(searchInputEl).attr("id");
    var inputValue = $(searchInputEl).val();
    parameterObj[inputID] = inputValue;
  }
  // console.log(parameterObj); // Shows parameters

  // use paramater obj to query
  var storeResults;
  $.ajax({
    async: false,
    url: edamamEndpoint,
    data: parameterObj,
    success: function (result) {
      // console.log(result); // SHOULD SHOW API OBJECT WITH RECIPES
      // console.log(result.hits); // SHOULD SHOW RECIPES
      storeResults = result.hits;
    },
  });
  return storeResults;
}

// var fillSearchResults = function (results) {
//   // For each card in #search-results
//   var cardNumber = 0;
//   $(searchResultsEl)
//     .children()
//     .each(function () {
//       cardNumber++;
//     });
// };
// RESULTS PAGE END

// -----------------------------------

// --------CALENDAR PAGE-------------
