//must include bearer in front of api key
var yelpApiKey = "Bearer xMJSZcLtoDztdGXkQ-A8PVyuQFPA0GUMLBS44-TAYY0VOpXcR2uGZilymNwno34PmkS1gAJqE6ubegWAl0ztFLcriZz6A_7gWfM7YeXApX4rd7yOykUW4YuHpc4zY3Yx";
var yelpUrl = "https://api.yelp.com/v3/businesses/search";
var corsUrl = "https://stormy-cliffs-87695.herokuapp.com/"
var rating = "";
var price = "";
var city = "";

var restaurantInput = document.getElementById("restaurant-search");
var locationInput = document.getElementById("location-search");
var searchBtn = document.getElementById("search-icon");

function getData(event){
    // event.preventDefault();

//if you get CORS error include the cors URL infront of your API URL
    var requestData = "brokenURL because this is Jung's code";

fetch(requestData, {
    headers:{
        "Authorization": "breakbreakbreak"
    }
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        "wtf is this?"
        console.log(data);

    })
    var pTag = document.createElement("p");
    pTag.textContent = "haha I broke this";
    document.querySelector("footer").appendChild(pTag);
}

getData();