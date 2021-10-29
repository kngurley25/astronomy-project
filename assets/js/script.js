// Star Wars API

var getStarship = function () {

    var apiUrl = "https://swapi.dev/api/starships/";

    fetch(apiUrl)
        .then(function(response) {
            console.log(response);
            if (response.ok) {
                response.json().then(function(starshipInfo) {
                    console.log(starshipInfo);

                    // displayStarship(starshipInfo);

                })
            }
        })
}

getStarship();