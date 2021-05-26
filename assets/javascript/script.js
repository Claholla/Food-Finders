// Document variable declarations
let userInput = document.getElementsByClassName("input is-warning");
let userSearch = userInput.value;
let searchBtn = document.getElementById("searchbtn");


// Search button event listener
searchBtn.addEventListener("click", function() {
    foodCall(userSearch);
    
})


// Edamam food search API call
function foodCall() {
    fetch("http://api.edamam.com/search/?q=" + userSearch + "&from=0&to=10")
    .then (response => response.json())
    .then(data => {
        console.log(data);
    })
}

