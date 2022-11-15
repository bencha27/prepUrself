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
var weekDayEl = $("#week-day");
var mealTypeEl = $("#meal-type");
var dialog, form;

var addRecipeButton;
var loadedRecipeObjects;

loadHomePage();
refreshAside();

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
  var resultsIndex = 0;
  var cardNumber = 0;
  // console.log(cardNumber);
  console.log(results);
  $(searchResultsEl)
    .children()
    .each(function () {
      // store results

      var goodLink = false;
      while (!goodLink) {
        if (results[resultsIndex].recipe.totalTime != 0) {
          console.log("if");
          console.log(results[resultsIndex]);
          console.log(results[resultsIndex].recipe.totalTime);
          var recipeInfo = {};
          recipeInfo["label"] = results[resultsIndex].recipe.label;
          recipeInfo["imgURL"] = results[resultsIndex].recipe.image;
          recipeInfo["recipeURL"] = results[resultsIndex].recipe.url;
          recipeInfo["time"] = results[resultsIndex].recipe.totalTime;
          recipeInfo["calories"] = results[resultsIndex].recipe.calories;
          loadedRecipeObjects.push(recipeInfo);
          goodLink = true;
        } else {
          console.log("else");
          console.log(results[resultsIndex]);
          console.log(results[resultsIndex].recipe.totalTime);
          resultsIndex++;
        }
      }

      console.log(resultsIndex);
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
      resultsIndex++;
      cardNumber++;
    });
};

function addRecipe() {
  // console.log(addRecipeButton);
  // store button {id} using split --> add-recipe-{id}
  buttonID = addRecipeButton.attr("id").split("-")[2];
  buttonID -= 1;
  // console.log(buttonID);

  loadedRecipeObjects[buttonID].weekDay = weekDayEl.val();
  loadedRecipeObjects[buttonID].mealType = mealTypeEl.val();

  var storageID =
    loadedRecipeObjects[buttonID].weekDay + "-" + loadedRecipeObjects[buttonID].mealType;

  localStorage.setItem(storageID, JSON.stringify(loadedRecipeObjects[buttonID]));

  refreshAside();
  // close modal when submited
  dialog.dialog("close");
}

function refreshAside() {
  // get items from local storage
  var day;
  var meal;
  var storedKeys = Object.keys(localStorage);
  // console.log(storedKeys);
  // console.log(storedKeys.length);
  if (storedKeys.length != null) {
    for (var i = 0; i < storedKeys.length; i++) {
      // console.log(storedKeys[i]);
      var currentObject = JSON.parse(localStorage.getItem(storedKeys[i]));
      // console.log(JSON.parse(localStorage.getItem(storedKeys[i])));
      // console.log(JSON.parse(localStorage.getItem(storedKeys[i].weekDay)));

      day = currentObject.weekDay;
      meal = currentObject.mealType.split("-")[0];
      meal = meal.charAt(0).toUpperCase() + meal.slice(1);
      mealNum = currentObject.mealType.split("-")[1];

      // console.log(day + " " + meal);
      // console.log($("#" + day).children());
      // console.log(
      //   $("#" + day)
      //     .children()
      //     .eq(0)
      //     .children()
      //     .eq(mealNum)
      //     .children("p")
      // );

      $("#" + day)
        .children()
        .eq(0)
        .children()
        .eq(mealNum)
        .children("p")
        .children("a")
        .text(currentObject.label)
        .attr({ href: currentObject.recipeURL, target: "_blank", rel: "noreferrer noopener" });

      $("#" + day)
        .children()
        .eq(0)
        .children()
        .eq(meal.split("-")[1]);
    }
  }

  // console.log(Object.keys(localStorage));
  // localStorage.getItem()
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

  $("aside")
    .children()
    .children("div")
    .children("div")
    .children("button")
    .on("click", function removeRecipe(e) {
      console.log($(this).parent());
      $(this).parent().children("p").children("a").text("").attr("href", "");

    });
}); // main end
