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
// // aside
// var scheduleEl = $("#schedule");
// var mondayEl = $("#monday");
// var tuesdayEl = $("#tuesday");
// var wednesdayEl = $("#wednesday");
// var thursdayEl = $("#thursday");
// var fridayEl = $("#friday");
// var saturdayEl = $("#Saturday");
// var sundayEl = $("#sunday");
// modal widget
var weekDayEl = $("#week-day");
var mealTypeEl = $("#meal-type");
var dialog;
// var form;

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
  "https://api.edamam.com/api/recipes/v2?type=public&app_id=0b97683e&app_key=8b9f9e545d235c4ae37ac9cbb16a65a5&time=1%2B";

function loadHomePage() {
  // position search bar in the middle and hide no-results message
  $(searchBarEl).css({ "margin-top": "350px" });
  resultsJS.style.display = "none";
  $("#no-results").hide();
}

// call ajaxQueryData
// position page elements
// fill in results with data
function loadResultsPage(event) {
  // query data
  var apiObject = ajaxQueryData(event);

  console.log("apiObject");
  console.log(apiObject);
  //if no results then display message
  if (apiObject.length == 0) {
    $("#no-results").show();
    return 0;
  } else {
    $("#no-results").hide();
  }

  // postion elements
  positionResultsPage();
  // clear, fill, and store results
  fillSearchResults(apiObject);
}

function positionResultsPage() {
  // put search bar at the top and show results card
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
  // var resultsIndex = 0;
  var cardNumber = 0;
  // console.log(cardNumber);
  console.log(results);
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
  for (var i = 0; i < storedKeys.length; i++) {
    // console.log(storedKeys[i]);
    var currentObject = JSON.parse(localStorage.getItem(storedKeys[i]));

    // console.log(JSON.parse(localStorage.getItem(storedKeys[i])));
    // console.log(JSON.parse(localStorage.getItem(storedKeys[i].weekDay)));

    day = currentObject.weekDay;
    meal = currentObject.mealType.split("-")[0];
    meal = meal.charAt(0).toUpperCase() + meal.slice(1);
    mealNum = currentObject.mealType.split("-")[1];

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
  });

  // form = dialog.children("form").on("submit", function (event) {
  //   event.preventDefault();
  //   addUser();
  // });

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

      var day, meal, mealNum, storageKey;

      meal = $(this).parent().children("p").children("span").text().split(":")[0].toLowerCase();

      if (meal == "breakfast") {
        mealNum = 1;
      } else if (meal == "lunch") {
        mealNum = 2;
      } else {
        mealNum = 3;
      }
      day = $(this).parent().parent().parent().attr("id");
      storageKey = day + "-" + meal + "-" + mealNum;

      console.log(storageKey);
      localStorage.removeItem(storageKey);
      $(this).parent().children("p").children("a").text("");
    });
}); // main end