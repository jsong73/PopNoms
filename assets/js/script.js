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
var homepageImg = document.getElementById("homepage-img");


function getData(event){
    event.preventDefault();
    userLocationInput = locationInput.value;
    userResterauntInput = restaurantInput.value;
    //hides all the home page images when user clicks the search button
    homepageImg.setAttribute("class", "hide");

    //clears our results and presents new results
    displayResultsPage.textContent = "";

    //if you get CORS error include the cors URL infront of your API URL
    var requestData = `${corsUrl}${yelpUrl}${city}${userLocationInput}&${categories}${userResterauntInput}&${limit}`
    console.log(requestData);

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
        var resIdTracker = 0;
        for (var i = 0; i < data.businesses.length; i++) {
        //displays restraurant names on screen
        resIdTracker = i;
        var restaurantNameResults = document.createElement("h1");
        restaurantNameResults.textContent = data.businesses[i].name;
        //displays restraurant $ price on screen
        var restaurantPriceResults = document.createElement("p");
         restaurantPriceResults.textContent = data.businesses[i].price;
        //displays restraurant ratings on screen
        var restaurantRatingResults = document.createElement("p");
        restaurantRatingResults.textContent = data.businesses[i].rating;
        //converts image URL from obj to actual image
        var restaurantImgResults = document.createElement("img");
        restaurantImgResults.src = data.businesses[i].image_url;
        //giving restaurant ratings an ID of restaurant-1, restaurant-2, etc
        const reviewResults = document.createElement("ul");
        reviewResults.setAttribute ("id", data.businesses[i].alias)
        reviewResults.setAttribute("data", data.businesses[1].alias);

        //append the name price image and ratings to the results page
        displayResultsPage.append(restaurantNameResults);
        displayResultsPage.append(restaurantImgResults);
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
            console.log(data);
            for(let i=0; i < data.reviews.length; i++){
                let restaurantUrl = data.reviews[i].url;
                console.log(restaurantUrl);
                let parsedUrlRestraunt = restaurantUrl.split("/")[4].split("?")[0];
                console.log(parsedUrlRestraunt)
                const reviewsText = document.createElement("li");
                reviewsText.textContent = data.reviews[i].text;
                reviewResults.append(reviewsText);
            }

                for (let i=0; i < 3; i++){
                const reviewsText = document.createElement("li");
                reviewsText.textContent = data.reviews[i].text;
                console.log(reviewsText);
 
    //            for (var j = 0; j < 3; j++) {
    //             var reviewsText = document.createElement("p");
    //             reviewsText.textContent = data.reviews[j].text;
    //             for(let k = 0; k < 5; k++) {
    //                 console.log(data.reviews[j].text);
    //                 var restaurantId = document.getElementById(`restaurant-${k}`)
    //                 // restaurantId.append(reviewsText);
    //                 if(restaurantId.children.length < 3) {
    //                 restaurantId.append(reviewsText);
    //                 }
    //             }
    //     }
    //     });
    // }
    // });
    
}

//gets data once user CLICKS the SEARCH BTN
searchBtn.addEventListener("click", getData);

    

// var requestData = `${corsUrl}${yelpUrl}${city}${userInput}&${categories}&${price}&${ratings}`
// console.log(userInput)
