// Document variable declarations
let userInput = document.getElementById("searchinput");
let searchBtn = document.getElementById("searchbtn");
let edamamId = "15c45754";
let edamamKey = "27854137d14a75271ecad8471fbc5826";
let titleStorage = [];
let photoStorage = [];
let linkStorage = [];
let sourceStorage = [];

// Search button event listener
searchBtn.addEventListener("click", function() {
    // Clears data from storage for multiple searches
    localStorage.removeItem("Titles");
    localStorage.removeItem("Photos");
    localStorage.removeItem("Links");
    localStorage.removeItem("Sources");
    // Clears arrays for use in populating localStorage multiple times
    titleStorage = [];
    photoStorage = [];
    linkStorage = [];
    sourceStorage = [];
    foodCall(userInput);
})

// Edamam food search API call
function foodCall() {
    fetch("http://api.edamam.com/search?app_id=" + edamamId + "&app_key=" + edamamKey + "&q=" + userInput.value)
    .then (response => response.json())
    .then(data => {
        document.location.href="./results.html";
        console.log(data);
        // Loop to store data for population of results page
        for (let i=0; i < 10; i++) {
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
        localStorage.setItem("Titles", titleStorage);
        localStorage.setItem("Photos", photoStorage);
        localStorage.setItem("Links", linkStorage);
        localStorage.setItem("Sources", sourceStorage);
        }
    )
}

// Suggested search functions
function randomFood() {

}
