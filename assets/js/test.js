// NASA API key
var apiKey = "fjvfRJ8cEyas9WxKMPUG1LSDE9gdd3Bf4XWRrIe2";

// HTML elements
var photoSectionEl = document.querySelector("#photo-section");
var weatherSectionEl = document.querySelector("#weather-section");
var earthSectionEl = document.querySelector("#earth-section");
var peopleSectionEl = document.querySelector("#people-section");
var horoscopeEl = document.querySelector("#horoscope-section");

// current date from moment cdn
var todaysDate = moment().format("YYYY-MM-DD");
console.log(todaysDate);

// a week ago date from moment
var weekPast = moment().subtract(7, 'days').format("YYYY-MM-DD");
var weekPastImage = moment().subtract(7, 'days').format("YYYY/MM/DD");
console.log(weekPast);
console.log(weekPastImage);


// NASA mars rover photo API
var getPhotos = function () {

    // latest photos query by earth date
    var apiUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=" + apiKey + "&earth_date=" + todaysDate;

    fetch(apiUrl)
        .then(function(response) {
            console.log(response);
            if (response.ok) {
                response.json().then(function(photoInfo) {
                    console.log(photoInfo);

                    displayInfo(photoInfo);

                })
            }
        })
}

var displayInfo = function(photoInfo) {
    
    // display info for single photo. TODO: determine how we want to loop or filter through arrays
    var RoverName = document.createElement("p");
    RoverName.textContent = "rover name = " + photoInfo.latest_photos[0].rover.name;
    
    var date = document.createElement("p");
    date.textContent = "date of photo = " + photoInfo.latest_photos[0].earth_date;

    var sol = document.createElement("p");
    sol.textContent = "sol = " + photoInfo.latest_photos[0].sol;

    var image = document.createElement("img");
    image.src = photoInfo.latest_photos[0].img_src;

    photoSectionEl.appendChild(RoverName);
    photoSectionEl.appendChild(date);
    photoSectionEl.appendChild(sol);
    photoSectionEl.appendChild(image);

}

// NASA mars weather API
var getWeather = function () {

    // general API call
    var apiUrl = "https://api.nasa.gov/insight_weather/?api_key=" + apiKey + "&feedtype=json&ver=1.0";

    fetch(apiUrl)
        .then(function(response) {
            console.log(response);
            if (response.ok) {
                response.json().then(function(weatherInfo) {
                    console.log(weatherInfo);

                    displayWeather(weatherInfo);

                })
            }
        })
}

var displayWeather = function(weatherInfo) {

    for (var i = 0; i < weatherInfo.length; i++) {

        // this API is missing a lot of data - see documentation. It often does not have valid readings from.
        // validity checks are listed as false in response. can not get weather data as outlined in documentation.
        var solNum = document.createElement("p");
        solNum.textContent = weatherInfo[i].sol_key;
        console.log(solNum);

        var temp = document.createElement("p");
        temp.textContent = weatherInfo[i].AT.av;
        console.log(temp);

        var pressure = document.createElement("p");
        pressure.textContent = weatherInfo[i].PRE.av;
        console.log(pressure);

        var wind = document.createElement("p");
        wind.textContent = weatherInfo[i].HWS.av;
        console.log(wind);

        weatherSectionEl.appendChild(solNum);
        weatherSectionEl.appendChild(temp);
        weatherSectionEl.appendChild(pressure);
        weatherSectionEl.appendChild(wind);

    }
}

// NASA earth imaging camera API
var getEarthPhoto = function () {

    // query by enhanced color photo and today's date
    // this is a little behind and sometimes there is no date for this - 
    // is there a way to go to most recent available data?
    var apiUrl = "https://epic.gsfc.nasa.gov/api/enhanced/date/" + weekPast;

    fetch(apiUrl)
        .then(function(response) {
            console.log(response);
            if (response.ok) {
                response.json().then(function(photoInfo) {
                    console.log(photoInfo);

                    displayEarth(photoInfo);

                })
            }
        })
}

var displayEarth = function(photoInfo) {
    
    var caption = document.createElement("p");
    caption.textContent = "caption = " + photoInfo[0].caption;
    
    var date = document.createElement("p");
    date.textContent = "date of photo = " + photoInfo[0].date;

    var image = document.createElement("img");
    // image.src = "https://epic.gsfc.nasa.gov/archive/natural/" + weekPastImage + "/png/" + photoInfo[0].image + ".png";
    // note - the epic image id is not matching what is on NASA online site (the "1b")
    image.src = "https://epic.gsfc.nasa.gov/archive/natural/2021/10/20/png/epic_1b_20211020001752.png";

    earthSectionEl.appendChild(caption);
    earthSectionEl.appendChild(date);
    earthSectionEl.appendChild(image);

}

// open notify API source people in space right now
var getSpacePeople = function () {

    var apiUrl = "http://api.open-notify.org/astros.json";

    fetch(apiUrl)
        .then(function(response) {
            console.log(response);
            if (response.ok) {
                response.json().then(function(peopleInfo) {
                    console.log(peopleInfo);

                    displayNames(peopleInfo);

                })
            }
        })
}

var displayNames = function(peopleData) {
    
    // display number of people in space
    var number = document.createElement("p");
    number.textContent = peopleData.number;
    
    // would loop through to display all names and craft to page
    var names = document.createElement("p");
    names.textContent = peopleData.people[0].name;

    peopleSectionEl.appendChild(number);
    peopleSectionEl.appendChild(names);

}

// Star Wars API data
var getStarship = function () {

    var apiUrl = "https://swapi.dev/api/starships/";

    fetch(apiUrl)
        .then(function(response) {
            console.log(response);
            if (response.ok) {
                response.json().then(function(signInfo) {
                    console.log(signInfo);

                    // displayNames(signInfo);

                })
            }
        })
}



getPhotos();
getWeather();
getEarthPhoto();
getSpacePeople();
getStarship();