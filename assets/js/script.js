// ELEMENT POINTERS
// header
var headerEl = $("#page-header");
//form
var searchFormEl = $("#search-form");
var selectionsEl = $("#selections");
var searchInputEl = $("#q");
var searchButtonEl = $("#search-button");
var searchBarEl = $("#search-bar");
//results
var resultsContainerEl = $("#search-results-container");
var searchResultsEl = $("#search-results");
// js DOM used for loadHomePage() function
var resultsJS = document.getElementById("search-results-container");
// aside
var scheduleEl = $("#schedule");
var mondayEl = $("#monday");
var tuesdayEl = $("#tuesday");
var wednesdayEl = $("#wednesday");
var thursdayEl = $("#thursday");
var fridayEl = $("#friday");
var saturdayEl = $("#Saturday");
var sundayEl = $("#sunday");
// modal widget
var dialog, form;

var addRecipeButton;
var loadedRecipeObjects;

loadHomePage();

// Pull random photo from API into img element
function getPhotoApi() {
  var requestPhotoUrl = "https://foodish-api.herokuapp.com/api/";

  fetch(requestPhotoUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var backgroundImage = document.getElementById("background-image");
      backgroundImage.setAttribute("src", data.image);
    });
}

getPhotoApi();

//examples
//https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=0b97683e&app_key=8b9f9e545d235c4ae37ac9cbb16a65a5&diet=low-carb

//https://api.edamam.com/api/recipes/v2?type=public&app_id=0b97683e&app_key=8b9f9e545d235c4ae37ac9cbb16a65a5&q=chicken&diet=low-carb

// The endpoint with only id and key
var edamamEndpoint =
  "https://api.edamam.com/api/recipes/v2?type=public&app_id=0b97683e&app_key=8b9f9e545d235c4ae37ac9cbb16a65a5";

function loadHomePage() {
  $(searchBarEl).css({ "margin-top": "350px" });
  resultsJS.style.display = "none";
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
  // console.log(apiObject);

  // clear, fill, and store results
  fillSearchResults(apiObject);
}

function positionResultsPage() {
  $(searchBarEl).css({ "margin-top": "20px" });
  resultsJS.style.display = "block";
}

function ajaxQueryData(event) {
  event.preventDefault();
  //collect and store parameters
  var parameterObj = { random: true };
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

var fillSearchResults = function (results) {
  // create cardInfo Objects using the API data
  // clear results
  loadedRecipeObjects = [];

  // For each card in #search-results - DOM tree refrence bellow
  var cardNumber = 0;
  // console.log(cardNumber);
  $(searchResultsEl)
    .children()
    .each(function () {
      // store results
      var recipeInfo = {};
      recipeInfo["label"] = results[cardNumber].recipe.label;
      recipeInfo["imgURL"] = results[cardNumber].recipe.image;
      recipeInfo["recipeURL"] = results[cardNumber].recipe.url;
      recipeInfo["time"] = results[cardNumber].recipe.totalTime;
      recipeInfo["calories"] = results[cardNumber].recipe.calories;
      loadedRecipeObjects.push(recipeInfo);

      // fill recipe cards
      $(this).children("div").children("img").attr("src", loadedRecipeObjects[cardNumber].imgURL);

      // console.log($(this).children("div").children("div"));

      $(this)
        .children("div")
        .children("div")
        .children("h5")
        .text(loadedRecipeObjects[cardNumber].label);

      $(this)
        .children("div")
        .children("div")
        .children("ul")
        .children("li")
        .children("a")
        .eq(0)
        .attr({
          href: loadedRecipeObjects[cardNumber].recipeURL,
          target: "_blank",
          rel: "noreferrer noopener",
        });

      $(this)
        .children("div")
        .children("div")
        .children("ul")
        .children("li")
        .eq(1)
        .text("Time to make: " + loadedRecipeObjects[cardNumber].time);

      $(this)
        .children("div")
        .children("div")
        .children("ul")
        .children("li")
        .eq(2)
        .text("Calories: " + Math.round(loadedRecipeObjects[cardNumber].calories));

      // $(this)
      //   .children("div")
      //   .children("div")
      //   .children("button")
      //   .on("click", addToLocal($(this)));
      cardNumber++;
    });
};

function addRecipe() {
  // console.log(addRecipeButton);
  // store button id
  loadedRecipeObjects[buttonID].week

  // close modal when submited
  dialog.dialog("close");
}

// main (listen for page inputs)
// runs when DOM is ready
$(function () {
  // listen for user to enter search
  searchFormEl.on("submit", loadResultsPage);
  searchButtonEl.on("click", loadResultsPage);

  // modal widget
  dialog = $("#dialog-form").dialog({
    dialogClass: "calendarSubmitForm",
    autoOpen: false,
    height: 400,
    width: 350,
    modal: true,
    buttons: [
      {
        text: "Add to Planner!",
        class: "modalButtons",
        click: function () {
          addRecipe();
        },
      },
      {
        text: "Cancel",
        class: "modalButtons",
        click: function () {
          dialog.dialog("close");
        },
      },
    ],
    close: function () {
      form[0].reset();
    },
  });

  form = dialog.children("form").on("submit", function (event) {
    event.preventDefault();
    addUser();
  });

  $(searchResultsEl)
    .children()
    .children("div")
    .children("div")
    .children("button")
    .on("click", function () {
      dialog.dialog("open");
      addRecipeButton = $(this);
    });
  // listen for user to go home
  // header.on("click", loadHomePage); // maybe just relode site?

  // listen for user to got to calendar
  // loadCalendarPage();
}); // main end
