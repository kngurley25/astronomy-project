//HTML elements
var starshipEl = document.querySelector("#starship-info");

// Star Wars API call
var getStarship = function () {

    var apiUrl = "https://swapi.dev/api/starships/";

    fetch(apiUrl)
        .then(function(response) {
            console.log(response);
            if (response.ok) {
                response.json().then(function(starship) {
                    console.log(starship);

                    starshipInfo(starship);

                })
            }
        })
}

// display starship info to page
var starshipInfo = function(shipData) {

    // clear old content
    starshipEl.textContent = "";

    var shipName = document.createElement("h3");
    shipName.textContent = "Starship Name: " + shipData.results[1].name;

    var shipModel = document.createElement("p");
    shipModel.textContent = "Model: " + shipData.results[1].model;

    var shipManufacturer = document.createElement("p");
    shipManufacturer.textContent = "Manufacturer: " + shipData.results[1].manufacturer;

    var shipHyperdrive = document.createElement("p");
    shipHyperdrive.textContent = "Hyperdrive Rating: " + shipData.results[1].hyperdrive_rating;

    var shipCrew = document.createElement("p");
    shipCrew.textContent = "Crew: " + shipData.results[1].crew;

    var shipLength = document.createElement("p");
    shipLength.textContent = "Length: " + shipData.results[1].length + " meters";

    var shipCargo = document.createElement("p");
    shipCargo.textContent = "Cargo capacity: " + shipData.results[1].cargo_capacity + " kilograms";

    starshipEl.appendChild(shipName);
    starshipEl.appendChild(shipModel);
    starshipEl.appendChild(shipManufacturer);
    starshipEl.appendChild(shipHyperdrive);
    starshipEl.appendChild(shipCrew);
    starshipEl.appendChild(shipLength);
    starshipEl.appendChild(shipCargo);

}

getStarship();