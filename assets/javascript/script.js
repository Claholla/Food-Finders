// Document variable declarations
let userInput = document.getElementById("searchinput");
// let searchInput = userInput.value;
let searchBtn = document.getElementById("searchbtn");
let edamamId = "15c45754";
let edamamKey = "27854137d14a75271ecad8471fbc5826";

// Search button event listener
searchBtn.addEventListener("click", function() {
    foodCall(userInput);
})


// Edamam food search API call
function foodCall() {
    fetch("http://api.edamam.com/search?app_id=" + edamamId + "&app_key=" + edamamKey + "&q=" + userInput.value)
    .then (response => response.json())
    .then(data => {
        // document.location.href="./results.html";
        console.log(data)
        
        }
    )
}

// Suggested search functions
function suggested() {

}