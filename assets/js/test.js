// NASA API key
var apiKey = "fjvfRJ8cEyas9WxKMPUG1LSDE9gdd3Bf4XWRrIe2";

var photoSectionEl = document.querySelector("#photo-section");

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

getPhotos();



