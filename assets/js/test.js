// NASA API key
var apiKey = "fjvfRJ8cEyas9WxKMPUG1LSDE9gdd3Bf4XWRrIe2";

var photoSectionEl = document.querySelector("#photo-section");
var weatherSectionEl = document.querySelector("#weather-section");

// current date from moment cdn
var todaysDate = moment().format("YYYY-MM-DD");
console.log(todaysDate);

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
    var RoverName = document.createElement("h3");
    RoverName.textContent = "Rover Name = " + photoInfo.latest_photos[0].rover.name;
    
    var date = document.createElement("p");
    date.textContent = "Date of photo = " + photoInfo.latest_photos[0].earth_date;

    var sol = document.createElement("p");
    sol.textContent = "Sol = " + photoInfo.latest_photos[0].sol;

    var image = document.createElement("img");
    image.src = photoInfo.latest_photos[0].img_src;

    photoSectionEl.appendChild(RoverName);
    photoSectionEl.appendChild(date);
    photoSectionEl.appendChild(sol);
    photoSectionEl.appendChild(image);

}

// NASA mars weather API
var getWeather = function () {

    // latest photos query by earth date
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


getPhotos();
getWeather();



