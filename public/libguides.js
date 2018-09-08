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
            var answersList = [];
            //Loop over each response
            for (var i = 0; i < response.data.length; i++) {
                   var nameOfLibguide = response.data[i].name;
                      console.log(nameOfLibguide);
                      //Add each result to the answersList array
                      answersList.push(nameOfLibguide);
                      console.log(answersList);
                      //Create an li for each response
                      var listItem = document.createElement('li');

                      // Add the item text
                      listItem.innerHTML = answersList[i];

                      // Add listItem to the list
                      libguidesName.appendChild(listItem);
                  }
            //If no results, display a message in the DOM
            if (answersList.length <= 0) {
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
