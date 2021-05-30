// Document DOM selector variables
let container = document.getElementById("container");
let cardclone = document.getElementById("cardclone");

// Arrays to contain the localStorage data used for populating the page
let drinkNames = JSON.parse(localStorage.getItem("drinkNames"));
let drinkGlasses = JSON.parse(localStorage.getItem("drinkGlasses"));
let drinkPhotos = JSON.parse(localStorage.getItem("drinkPhotos"));
let drinkURLs = JSON.parse(localStorage.getItem("drinkURLs"));
let titles = JSON.parse(localStorage.getItem("Titles"));
let photos = JSON.parse(localStorage.getItem("Photos"));
let links = JSON.parse(localStorage.getItem("Links"));
let sources = JSON.parse(localStorage.getItem("Sources"));

// Function to populate search results using localStorage data
window.onload = function() {
    // Statement determines which API was called through defined localStorage objects
    if (localStorage.getItem("drinkNames")) {
        // Loop clones the search result card and populates the clones
        for (y=0; y < drinkNames.length; y++) {
            document.getElementById("photo").setAttribute("src", drinkPhotos[y]);
            document.getElementById("maintext").innerHTML = drinkNames[y];
            document.getElementById("subtext").innerHTML = drinkGlasses[y];
            document.getElementById("link").setAttribute("href", drinkURLs[y]);
            let cln = cardclone.cloneNode(true);
            container.append(cln);
        }
        // Deletes source for cloned results
        document.getElementById("cardclone").remove();

    } else if (localStorage.getItem("Titles")) {
        // Loop clones the search result card and populates the clones
        for (x=0; x < titles.length; x++) {
            document.getElementById("photo").setAttribute("src", photos[x]);
            document.getElementById("maintext").innerHTML = titles[x];
            document.getElementById("subtext").innerHTML = "Source: " + sources[x];
            document.getElementById("link").setAttribute("href", links[x]);
            let cln = cardclone.cloneNode(true);
            container.append(cln);
        }
        // Deletes source for cloned results
        document.getElementById("cardclone").remove();

    } else {
        document.getElementById("cardclone").remove();
        let container = document.getElementById("container");
        let error = document.createElement("h1");
        error.setAttribute("class", "column");
        error.innerHTML = "No results found.";
        container.append(error);
}}
