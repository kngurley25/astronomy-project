//HTML elements
var starshipEl = document.querySelector("#starship-info");

var shipButtonEl = document.querySelector(".ship-btn");

// ship array
var shipObject = {
    3: "star-destroyer", // starships/3/
    9: "death-star", // starships/9/
    10: "millennium-falcon", // starships/10/
    11: "y-wing", // starships/11/
    12: "x-wing", // starships/12/
    17: "rebel-transport" // starships/17/
}
console.log(Object.values(shipObject));
console.log(Object.keys(shipObject));

var verifyStarship = function (event) {
    
    var shipSelect = event.target.getAttribute("id");
    for (var i = 0; i < Object.keys(shipObject).length; i ++)
        if (shipSelect === shipObject[i]) {
            var shipNum = [i];
        }

    getStarship(shipNum);

}

// Star Wars API call
var getStarship = function (shipNum) {

    var apiUrl = "https://swapi.dev/api/starships/" + shipNum + "/";

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

    // starship data to display
    
    var shipName = document.createElement("h3");
    shipName.textContent = "Starship Name: " + shipData.name;

    var shipModel = document.createElement("p");
    shipModel.textContent = "Model: " + shipData.model;

    var shipManufacturer = document.createElement("p");
    shipManufacturer.textContent = "Manufacturer: " + shipData.manufacturer;

    var shipHyperdrive = document.createElement("p");
    shipHyperdrive.textContent = "Hyperdrive Rating: " + shipData.hyperdrive_rating;

    var shipCrew = document.createElement("p");
    shipCrew.textContent = "Crew: " + shipData.crew;

    var shipLength = document.createElement("p");
    shipLength.textContent = "Length: " + shipData.length + " meters";

    var shipCargo = document.createElement("p");
    shipCargo.textContent = "Cargo capacity: " + shipData.cargo_capacity + " kilograms";

    starshipEl.appendChild(shipName);
    starshipEl.appendChild(shipModel);
    starshipEl.appendChild(shipManufacturer);
    starshipEl.appendChild(shipHyperdrive);
    starshipEl.appendChild(shipCrew);
    starshipEl.appendChild(shipLength);
    starshipEl.appendChild(shipCargo);

}

// event listener to starship buttons
shipButtonEl.addEventListener("click", verifyStarship);