var apiUrl = "https://lgapi-us.libapps.com/1.1/guides?site_id=8488&key=0b8da796b00334ae3471f60e6a10e8c6&search_terms=";
    var input = document.querySelector(".libguides-input");
    var libguidesName = document.querySelector(".libguides-name");
    var libguidesImage = document.querySelector(".libguides-image");

    function getLibguidesData() {
        //Use Axios to GET data
        axios.get(apiUrl + input.value)
        //Display the data in the DOM
        .then(function (response) {
            //Clear the list contents
            libguidesName.innerHTML = '';
            console.log("Working");
            console.log(response.data.length);
            //Make an array to store multiple results
            var namesList = [];
            var descriptionList = [];
            var urlList = [];
            var idList = [];
            //Loop over each response
            for (var i = 0; i < response.data.length; i++) {
                   var nameOfLibguide = response.data[i].name;
                      console.log(nameOfLibguide);
                      //Add data from each result to the namesList array
                      namesList.push(nameOfLibguide);
                      console.log(namesList);
                      var descriptionOfLibguide = response.data[i].description;
                      console.log(descriptionOfLibguide);
                      descriptionList.push(descriptionOfLibguide);
                      var urlOfLibguide = response.data[i].url;
                      console.log(urlOfLibguide);
                      var idOfLibguide = response.data[i].id;
                      idList.push(idOfLibguide);
                      urlList.push(urlOfLibguide);
                      //Create an li for each response
                      var listItem = document.createElement('li');
                      listItem.setAttribute("id", idList[i]);

                      // Add the item text
                      listItem.innerHTML = '<a href="' + urlList[i] + '" target="_blank">' + namesList[i] + '</a><br><br>' + descriptionList[i] +'<br><br><button>Favorite</button>';

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

    //Find button and listen for a click event
    var button = document.querySelector(".libguides-button");
    button.addEventListener("click", getLibguidesData);
