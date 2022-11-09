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