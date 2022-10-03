//must include bearer in front of yelp api key
var yelpApiKey = "Bearer xMJSZcLtoDztdGXkQ-A8PVyuQFPA0GUMLBS44-TAYY0VOpXcR2uGZilymNwno34PmkS1gAJqE6ubegWAl0ztFLcriZz6A_7gWfM7YeXApX4rd7yOykUW4YuHpc4zY3Yx";
var yelpUrl = "https://api.yelp.com/v3/businesses/search?";
var corsUrl = "https://stormy-cliffs-87695.herokuapp.com/";

var ratings = "sort_by=";
var price = "price=";
var categories = "categories=";
var city = "location=";
var limit = "limit=5";
var userLocationInput = "";
var userResterauntInput = "";

var restaurantInput = document.getElementById("restaurant-search");
var locationInput = document.getElementById("location-search");
var searchBtn = document.getElementById("search-icon");
var displayResultsPage = document.getElementById("results-page")
var steakImg = document.getElementById("steak");
var textImg = document.getElementById("green-speech-bubble");
var starsImg = document.getElementById("red-stars");


function getData(event){
    event.preventDefault();
    userLocationInput = locationInput.value;
    userResterauntInput = restaurantInput.value;
//hides all the home page images when user clicks the search button
    steakImg.setAttribute("class", "hide");
    textImg.setAttribute("class", "hide");
    starsImg.setAttribute("class", "hide");
//clears our results and presents new results
    displayResultsPage.textContent = "";

//if you get CORS error include the cors URL infront of your API URL
    var requestData = `${corsUrl}${yelpUrl}${city}${userLocationInput}&${categories}${userResterauntInput}&${limit}`

fetch(requestData, {
    //must include this header with authorization to get access to yelp API 
    headers:{
        "Authorization": yelpApiKey
    }
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
 
        for (var i = 0; i < data.businesses.length; i++) {
        //displays restraurant names on screen
        var restaurantNameResults = document.createElement("h1");
        restaurantNameResults.textContent = data.businesses[i].name;
        //displays restraurant $ price on screen
        var restaurantPriceResults = document.createElement("p");
         restaurantPriceResults.textContent = data.businesses[i].price;
        //displays restraurant ratings on screen
        var restaurantRatingResults = document.createElement("p");
        restaurantRatingResults.textContent = data.businesses[i].rating;
        //giving restaurant ratings an ID of restaurant-1, restaurant-2, etc
        restaurantRatingResults.setAttribute("id", `restaurant-${i}`)


        //append the name price and ratings to the results page
        displayResultsPage.append(restaurantNameResults);
        displayResultsPage.append(restaurantPriceResults);
        displayResultsPage.append(restaurantRatingResults);

        var businessesId = data.businesses[i].id;
        var reviewsUrl = "https://api.yelp.com/v3/businesses/"+ businessesId +"/reviews"
        var requestReviewUrl =  `${corsUrl}${reviewsUrl}`
        console.log(requestReviewUrl)
        //fetching for yelp api reviews
        fetch(requestReviewUrl,{
            headers:{
                "Authorization": yelpApiKey
        }
        })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data)

            for (var j = 0; j < 4; j++) {
            var reviewsText = document.createElement("p");
            reviewsText.textContent = data.reviews[j].text;
            var restaurantId = document.getElementById(`restaurant-${i}`)
            console.log(i)
           restaurantId.append(reviewsText);
        }
        });
 
    }
    });
}


//gets data once user CLICKS the SEARCH BTN
searchBtn.addEventListener("click", getData);

    

// var requestData = `${corsUrl}${yelpUrl}${city}${userInput}&${categories}&${price}&${ratings}`
// console.log(userInput)
