//HTML elements
var starshipEl = document.querySelector("#starship-info");
var shipButtonEl = document.querySelector("#ship-buttons");

var inputNameEl = document.querySelector("#name-input");
var submitButtonEl = document.querySelector("#submit-btn");

var nameAndStarshipEl = document.querySelector("#name-starship");

// ship array
var shipObject = {
    3: "star-destroyer", // starships/3/
    9: "death-star", // starships/9/
    10: "millennium-falcon", // starships/10/
    11: "y-wing", // starships/11/
    12: "x-wing", // starships/12/
    17: "rebel-transport" // starships/17/
}

var verifyStarship = function (event) {
    
    var shipSelect = event.target.getAttribute("id");

    if (shipSelect === shipObject[3]) {
        var shipNum = 3;
    } else if (shipSelect === shipObject[9]) {
        var shipNum = 9;
    } else if (shipSelect === shipObject[10]) {
        var shipNum = 10;
    } else if (shipSelect === shipObject[11]) {
        var shipNum = 11;
    } else if (shipSelect === shipObject[12]) {
        var shipNum = 12;
    } else if (shipSelect === shipObject[17]) {
        var shipNum = 17;
    }

    getStarship(shipNum);

}

// Star Wars API call
var getStarship = function (shipNum) {

    var apiUrl = "https://swapi.dev/api/starships/" + shipNum + "/";

    fetch(apiUrl)
        .then(function(response) {
            // console.log(response);
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

// function to capture name input form
var formSubmitHandler = function(event) {
    event.preventDefault();

    var inputName = inputNameEl.value.trim();

    if (inputName) {
        displayData(inputName);
    }
}

// function to display name and starship data to page
var displayData = function(inputName, shipName) {

    var displayName = document.createElement("p");
    displayName.textContent = "Passenger Name: " + inputName;

    var displayShipName = document.createElement("p");
    displayShipName.textContent = "Selected Starship: " + shipName;

    var launch = document.createElement("p");
    launch.textContent = "Scheduled Launch: " + moment().add(7, 'days').format("dddd, MMMM Do YYYY, h:mm:ss a");
    
    var message = document.createElement("p");
    message.textContent = "Good luck!";

    nameAndStarshipEl.appendChild(displayName);
    nameAndStarshipEl.appendChild(displayShipName);
    nameAndStarshipEl.appendChild(launch);
    nameAndStarshipEl.appendChild(message);
}

// event listener to starship buttons
shipButtonEl.addEventListener("click", verifyStarship);
submitButtonEl.addEventListener("click", formSubmitHandler);


