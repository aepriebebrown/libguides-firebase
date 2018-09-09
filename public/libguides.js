var apiUrl = "https://lgapi-us.libapps.com/1.1/guides?site_id=8488&key=0b8da796b00334ae3471f60e6a10e8c6&search_terms=";
var input = document.querySelector(".libguides-input");
var libguidesName = document.querySelector(".libguides-name");
var libguidesImage = document.querySelector(".libguides-image");
var favoriteList = document.getElementById("favorites");

function getLibguidesData() {
    //Use Axios to GET data
    axios.get(apiUrl + input.value)

    //Display the data in the DOM
    .then(function (response) {

        //Clear the list contents
        libguidesName.innerHTML = '';

        //Make an array to store multiple results
        var namesList = [];
        var descriptionList = [];
        var urlList = [];
        var idList = [];

        //Loop over each response
        for (var i = 0; i < response.data.length; i++) {
            var nameOfLibguide = response.data[i].name;
            var descriptionOfLibguide = response.data[i].description;
            var urlOfLibguide = response.data[i].url;
            var idOfLibguide = response.data[i].id;
            var listItem = document.createElement('li');

            //Add data from each result to the namesList array
            namesList.push(nameOfLibguide);
            descriptionList.push(descriptionOfLibguide);
            idList.push(idOfLibguide);
            urlList.push(urlOfLibguide);

            //Create an li for each response
            listItem.setAttribute("id", idList[i]);

            // Add the item text
            listItem.innerHTML = '<a href="' + urlList[i] + '" target="_blank">' + namesList[i] + '</a><br><br>' + descriptionList[i] +'<br><br><button class="' + idList[i] + '" onClick="favButton(this.parentNode.id)">Favorite</button>';

            // Add listItem to the list
            libguidesName.appendChild(listItem);
        }

        //If no results, display a message in the DOM
        if (namesList.length <= 0) {
            console.log("No Results");
            libguidesName.innerHTML = "No results.";
        }
    })

    //Error catching
    .catch(function (error) {
        libguidesName.innerHTML = "(An error has occurred.)";
        console.log("Error!");
    });
}

//Allow user to add to Favorites list
function favButton(clicked_id) {
    var id = clicked_id;
    var buttonClass = String(id);
    var favoriteItem = document.createElement('li');

    //Display record from search results inside favorites li
    favoriteItem.innerHTML = document.getElementById(clicked_id).innerHTML;

    //Add the item to the favorites list
    favoriteList.appendChild(favoriteItem);
}

function clearResults() {
    libguidesName.innerHTML = '';
}

//Find button and listen for a click event
var button = document.querySelector(".libguides-button");
button.addEventListener("click", getLibguidesData);

var clearButton = document.getElementById('clear-results');
clearButton.addEventListener("click", clearResults);
