//HTML elements
var starshipEl = document.querySelector("#starship-info");
var shipButtonEl = document.querySelector("#ship-buttons");

var inputNameEl = document.querySelector("#name-input");
var submitButtonEl = document.querySelector("#submit-btn");
var shipDropdownEl = document.querySelector("#starship-dropdown");

var nameAndStarshipEl = document.querySelector("#name-starship");
var pastPassengerEl = document.querySelector("#past-name-starship");
var tableHeadingEl = document.querySelector("#table");

// mars rover HTML elements
var rhaz = document.getElementById("rhaz");
var fhaz = document.getElementById("fhaz");
var navcam = document.getElementById("navcam");
var marsRoverPicture = document.querySelector("#marsRoverPicture");

var todaysDate = moment().format("YYYY-MM-DD");
// NASA API key
var apiKey = "fjvfRJ8cEyas9WxKMPUG1LSDE9gdd3Bf4XWRrIe2";

// NASA mars rover photo API, camera Rhaz on curiosity
var getPhotosRhaz = function () {

    // latest photos query by earth date
    var apiUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=" + apiKey + "&earth_date=" + todaysDate + "&camera=rhaz";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(photoInfo) {
                    displayPhotoRhaz(photoInfo);
                })
            }
        })
}

// NASA mars rover photo API, camera Fhaz on curiosity
var getPhotosFhaz = function () {

    // latest photos query by earth date
    var apiUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=" + apiKey + "&earth_date=" + todaysDate + "&camera=fhaz";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(photoInfo) {
                    displayPhotoFhaz(photoInfo);
                })
            }
        })
}
// NASA mars rover photo API, camera Navcam on curiosity
var getPhotosNavcam = function () {

    // latest photos query by earth date
    var apiUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=" + apiKey + "&earth_date=" + todaysDate + "&camera=navcam";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(photoInfo) {
                    displayPhotoNavcam(photoInfo);
                })
            }
        })
}


  var displayPhotoRhaz = function(photoInfo) {
    
    // display info for single photo. TODO: determine how we want to loop or filter through arrays
    var rhaz = document.createElement("p");
    rhaz.textContent = "rovername = " + photoInfo.latest_photos[0].rover.name;
    
    var date = document.createElement("p");
    date.textContent = "date of photo = " + photoInfo.latest_photos[0].earth_date;

    var sol = document.createElement("p");
    sol.textContent = "sol = " + photoInfo.latest_photos[0].sol;

    var image = document.createElement("img");
    image.src = photoInfo.latest_photos[0].img_src;

    marsRoverPicture.appendChild(rhaz);
    marsRoverPicture.appendChild(date);
    marsRoverPicture.appendChild(sol);
    marsRoverPicture.appendChild(image);

}

var displayPhotoFhaz = function(photoInfo) {
    
    // display info for single photo. TODO: determine how we want to loop or filter through arrays
    var fhaz = document.createElement("p");
    fhaz.textContent = "rovername = " + photoInfo.latest_photos[0].rover.name;
    
    var date = document.createElement("p");
    date.textContent = "date of photo = " + photoInfo.latest_photos[0].earth_date;

    var sol = document.createElement("p");
    sol.textContent = "sol = " + photoInfo.latest_photos[0].sol;

    var image = document.createElement("img");
    image.src = photoInfo.latest_photos[0].img_src;

    marsRoverPicture.appendChild(fhaz);
    marsRoverPicture.appendChild(date);
    marsRoverPicture.appendChild(sol);
    marsRoverPicture.appendChild(image);

}

var displayPhotoNavcam = function(photoInfo) {
    
    // display info for single photo. TODO: determine how we want to loop or filter through arrays
    var navcam = document.createElement("p");
    navcam.textContent = "rovername = " + photoInfo.latest_photos[0].rover.name;
    
    var date = document.createElement("p");
    date.textContent = "date of photo = " + photoInfo.latest_photos[0].earth_date;

    var sol = document.createElement("p");
    sol.textContent = "sol = " + photoInfo.latest_photos[0].sol;

    var image = document.createElement("img");
    image.src = photoInfo.latest_photos[0].img_src;

    marsRoverPicture.appendChild(navcam);
    marsRoverPicture.appendChild(date);
    marsRoverPicture.appendChild(sol);
    marsRoverPicture.appendChild(image);

}

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
    
    var shipName = document.createElement("p");
    shipName.textContent = shipData.name;
    shipName.classList = "card-header-title";

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

    var starShip = shipDropdownEl.options[shipDropdownEl.selectedIndex].text;

    var combined = inputName + "," + starShip;

    if (inputName) {
        displayData(inputName, starShip);

        inputNameEl.value = "";
    }

    // save submitted passengers to array
    if (pastSubmits.includes(inputName) === false) {
        pastSubmits.push(combined);
    }

    saveSubmits();
}

// function to display name and starship data to page
var displayData = function(inputName, starShip) {

    // nameAndStarshipEl.textContent = "";

    var displayName = document.createElement("p");
    displayName.textContent = "Passenger Name: " + inputName;
    displayName.classList = "has-text-weight-bold is-capitalized";

    var displayShipName = document.createElement("p");
    displayShipName.textContent = "Selected Starship: " + starShip;

    var launch = document.createElement("p");
    launch.textContent = "Scheduled Launch: " + moment().add(3, 'days').format("dddd, MMMM Do YYYY, h:mm:ss a");

    var message = document.createElement("p");
    message.textContent = "Good luck space traveler - may the force be with you!"

    nameAndStarshipEl.prepend(message);
    nameAndStarshipEl.prepend(launch);
    nameAndStarshipEl.prepend(displayShipName);
    nameAndStarshipEl.prepend(displayName);
}

// local storage
var pastSubmits = [];
var saveSubmits = function() {
    localStorage.setItem("passengers", JSON.stringify(pastSubmits));
}

var loadSubmits = function() {

    var savedPassengers = JSON.parse(localStorage.getItem("passengers"));
    console.log(savedPassengers);

    if (!savedPassengers) {
        return false;
    }

    var pastTravelerHeading = document.createElement("th");
    pastTravelerHeading.textContent = "Past travelers and starships:";
    pastPassengerEl.appendChild(pastTravelerHeading);

    for (var i = 0; i < savedPassengers.length; i++) {

        var pastTravelers = document.createElement("tr");

        var traveler = document.createElement("td");
        traveler.textContent = savedPassengers[i].split(",")[0];
        traveler.classList = "is-capitalized";

        var travelerShip = document.createElement("td");
        travelerShip.textContent = savedPassengers[i].split(",")[1];
        
        // pastTravelers.textContent = "Past Traveler: " + savedPassengers[i].split(",")[0] + " - " + savedPassengers[i].split(",")[1];
        
        pastTravelers.appendChild(traveler);
        pastTravelers.appendChild(travelerShip);
        pastPassengerEl.appendChild(pastTravelers);

        pastSubmits.push(savedPassengers[i]);
    }
    
    localStorage.setItem("passengers", JSON.stringify(savedPassengers));
}

// event listener for mars rover buttons
rhaz.addEventListener("click", getPhotosRhaz());
fhaz.addEventListener("click", getPhotosFhaz());
navcam.addEventListener("click", getPhotosNavcam());


// event listener to starship buttons
shipButtonEl.addEventListener("click", verifyStarship);
submitButtonEl.addEventListener("click", formSubmitHandler);

loadSubmits();

