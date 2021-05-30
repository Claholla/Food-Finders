// Document variable declarations
let userInput = document.getElementById("searchinput");
let searchBtn = document.getElementById("searchbtn");
let food = document.getElementById("food");
let drinks = document.getElementById("drinks");
let ranFood = document.getElementById("foodbtn");
let ranDrink = document.getElementById("drinkbtn");
let edamamId = "15c45754";
let edamamKey = "27854137d14a75271ecad8471fbc5826";
let titleStorage = [];
let photoStorage = [];
let linkStorage = [];
let sourceStorage = [];
let drinkNameStorage = [];
let drinkPhotoStorage = [];
let drinkGlassStorage = [];
let drinkURLStorage = [];

// Search type selection button event listeners
food.addEventListener("click", function() {
    localStorage.setItem("searchSelect", "Food");
    userInput.setAttribute("placeholder", "Search for Food!");
})

drinks.addEventListener("click", function () {
    localStorage.setItem("searchSelect", "Drinks");
    userInput.setAttribute("placeholder", "Search for Drinks!");
})

// Search button event listener
searchBtn.addEventListener("click", function() {
    // Prevents the user from activating the function without input for query
    if (userInput.value < 1) {
        return;

    } else if (localStorage.getItem("searchSelect") == "Food") {
        // Clears data from storage for multiple searches
        localStorage.clear();
        // Clears arrays for use in populating localStorage multiple times
        titleStorage = [];
        photoStorage = [];
        linkStorage = [];
        sourceStorage = [];
        drinkNameStorage = [];
        drinkPhotoStorage = [];
        drinkGlassStorage = [];
        drinkURLStorage = [];
        foodCall(userInput);
        
    } else if (localStorage.getItem("searchSelect") == "Drinks") {
        localStorage.clear();
        titleStorage = [];
        photoStorage = [];
        linkStorage = [];
        sourceStorage = [];
        drinkNameStorage = [];
        drinkPhotoStorage = [];
        drinkGlassStorage = [];
        drinkURLStorage = [];
        drinkCall(userInput);
    }
})

// Random API call button event listeners
ranDrink.addEventListener("click", function () {
    localStorage.clear();
    titleStorage = [];
    photoStorage = [];
    linkStorage = [];
    sourceStorage = [];
    drinkNameStorage = [];
    drinkPhotoStorage = [];
    drinkGlassStorage = [];
    drinkURLStorage = [];
    randomDrink();
})

ranFood.addEventListener("click", function() {
    localStorage.clear();
    titleStorage = [];
    photoStorage = [];
    linkStorage = [];
    sourceStorage = [];
    drinkNameStorage = [];
    drinkPhotoStorage = [];
    drinkGlassStorage = [];
    drinkURLStorage = [];
    randomFood();
})

// Edamam food search API call
function foodCall() {
    fetch("http://api.edamam.com/search?app_id=" + edamamId + "&app_key=" + edamamKey + "&q=" + userInput.value)
    .then (response => response.json())
    .then(data => {
        // When API returns no relevant data this displays the results not found page
        if (data["count"] == 0) {
            localStorage.clear();
            document.location.href="./results.html";    
        } else {
            document.location.href="./results.html";
            // Loop to store data for population of results page
            for (let i=0; i < data["hits"].length; i++) {
                let recipeTitle = data["hits"][i]["recipe"]["label"];
                let recipePhoto = data["hits"][i]["recipe"]["image"];
                let recipeLink = data["hits"][i]["recipe"]["url"];
                let recipeSource = data["hits"][i]["recipe"]["source"];
                titleStorage.push(recipeTitle);
                photoStorage.push(recipePhoto);
                linkStorage.push(recipeLink);
                sourceStorage.push(recipeSource);
            }
            // Storage of returned API call data
            localStorage.setItem("Titles", JSON.stringify(titleStorage));
            localStorage.setItem("Photos", JSON.stringify(photoStorage));
            localStorage.setItem("Links", JSON.stringify(linkStorage));
            localStorage.setItem("Sources", JSON.stringify(sourceStorage));
            }}
    )
}

// TheCocktailDB drink search API call
function drinkCall() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + userInput.value)
    .then (response => response.json())
    .then (data => {
        document.location.href="./results.html";
        // Loop to store data for population of results page
        for (let x=0; x < data["drinks"].length; x++) {
            let drinkName = data["drinks"][x]["strDrink"];
            let drinkPhoto = data["drinks"][x]["strDrinkThumb"];
            let drinkGlass = data["drinks"][x]["strGlass"];
            let drinkURL = "https://www.thecocktaildb.com/drink/" + data["drinks"][x]["idDrink"];
            drinkNameStorage.push(drinkName);
            drinkPhotoStorage.push(drinkPhoto);
            drinkGlassStorage.push(drinkGlass);
            drinkURLStorage.push(drinkURL);
        }
        // Storage of returned API call data
        localStorage.setItem("drinkNames", JSON.stringify(drinkNameStorage));
        localStorage.setItem("drinkPhotos", JSON.stringify(drinkPhotoStorage));
        localStorage.setItem("drinkGlasses", JSON.stringify(drinkGlassStorage));
        localStorage.setItem("drinkURLs", JSON.stringify(drinkURLStorage));
    })
}

// Randomized results button functions
function randomDrink() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then (response => response.json())
    .then (data => {
        document.location.href="./results.html";
        // Stores the data for population of results page
        let drinkName = data["drinks"][0]["strDrink"];
        let drinkPhoto = data["drinks"][0]["strDrinkThumb"];
        let drinkGlass = data["drinks"][0]["strGlass"];
        let drinkURL = "https://www.thecocktaildb.com/drink/" + data["drinks"][0]["idDrink"];
        drinkNameStorage.push(drinkName);
        drinkPhotoStorage.push(drinkPhoto);
        drinkGlassStorage.push(drinkGlass);
        drinkURLStorage.push(drinkURL);
        // Storage of returned API call data
        localStorage.setItem("drinkNames", JSON.stringify(drinkNameStorage));
        localStorage.setItem("drinkPhotos", JSON.stringify(drinkPhotoStorage));
        localStorage.setItem("drinkGlasses", JSON.stringify(drinkGlassStorage));
        localStorage.setItem("drinkURLs", JSON.stringify(drinkURLStorage));
    })
}

function randomFood() {
    // A bank of search queries to be randomized for the suggested random result button
    let searchBank = ["Tacos", "Taco", "Pizza", "Pasta", "Meatball", "Quiche", "Brownie", "Cake", "Quesadilla", "Pie", "Bread", "Soup", "Stew", "Pudding"]
    let randomizer = Math.floor(Math.random() * searchBank.length);
    // Edamam API call using the result of the random bank result
    fetch("http://api.edamam.com/search?app_id=" + edamamId + "&app_key=" + edamamKey + "&q=" + searchBank[randomizer])
    .then (response => response.json())
    .then (data => {
        document.location.href="./results.html";
        // Randomizes a selection from the random API call's data array
        let randomRecipe = Math.floor(Math.random() * data["hits"].length);
        let recipeTitle = data["hits"][randomRecipe]["recipe"]["label"];
        let recipePhoto = data["hits"][randomRecipe]["recipe"]["image"];
        let recipeLink = data["hits"][randomRecipe]["recipe"]["url"];
        let recipeSource = data["hits"][randomRecipe]["recipe"]["source"];
        titleStorage.push(recipeTitle);
        photoStorage.push(recipePhoto);
        linkStorage.push(recipeLink);
        sourceStorage.push(recipeSource);
        // Storage of returned API call data
        localStorage.setItem("Titles", JSON.stringify(titleStorage));
        localStorage.setItem("Photos", JSON.stringify(photoStorage));
        localStorage.setItem("Links", JSON.stringify(linkStorage));
        localStorage.setItem("Sources", JSON.stringify(sourceStorage));
    })
}