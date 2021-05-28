// DOM selector variables


// Function to populate search results using localStorage data
window.onload = function() {
    // Statement determines which API was called through defined localStorage objects
    if (localStorage.drinkNames) {
        // Arrays to contain the localStorage objects for populating page
        let drinkNames = JSON.parse(localStorage.getItem("drinkNames"));
        let drinkGlasses = JSON.parse(localStorage.getItem("drinkGlasses"));
        let drinkPhotos = JSON.parse(localStorage.getItem("drinkPhotos"));
        let drinkURLs = JSON.parse(localStorage.getItem("drinkURLs"));
        console.log(drinkNames);
        // Loop clones the search result card and populates the clones
        for (y=0; y < drinkNames.length; y++) {
            let container = document.getElementById("container");
            let cardclone = document.getElementById("cardclone");
            document.getElementById("photo").setAttribute("src", drinkPhotos[y]);
            document.getElementById("maintext").innerHTML = drinkNames[y];
            document.getElementById("subtext").innerHTML = drinkGlasses[y];
            document.getElementById("link").setAttribute("href", drinkURLs[y]);
            let cln = cardclone.cloneNode(true);
            container.append(cln);
            
        }
        document.getElementById("cardclone").setAttribute("display", "none");
    }}
