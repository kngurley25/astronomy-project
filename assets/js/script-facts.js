
// HTML elements
var factBtnElOne = document.querySelector("#fact-btn-one");
var factBtnElTwo = document.querySelector("#fact-btn-two");
var factBtnElThree = document.querySelector("#fact-btn-three");

var displayFactOneEl = document.querySelector("#display-one");
var displayFactTwoEl = document.querySelector("#display-two");
var displayFactThreeEl = document.querySelector("#display-three");

// array for NASA ID numbers of information images tied to true/false
var questionNumber = 0;
var imageArray = [
    {
        nasaId: "PIA17303",
        answer: "one-true"
    },
    {
        nasaId: "PIA15962",
        answer: "two-false"
    },
    {
        nasaId: "PIA17305",
        answer: "three-false"
    }
]

var grade = document.createElement("p");
var verifyAnswer = function (event) {

    if ((questionNumber + 1) > imageArray.length) {
        console.log("all questions answered");
        return;

    } else {

        var btnSelect = event.target.getAttribute("id");
        var correct = imageArray[questionNumber].answer;

        if (btnSelect === correct) {
            
            grade.textContent = "Correct!";

            var nasaId = imageArray[questionNumber].nasaId;
            // console.log(nasaId);
            getImage(nasaId);
            
        } else {

            
            grade.textContent = "Incorrect!";
            
            var nasaId = imageArray[questionNumber].nasaId;
            // console.log(nasaId);
            getImage(nasaId);
        }
    }
    questionNumber++;
}

// NASA image library API call
var getImage = function (nasaId) {

    var apiUrl = "https://images-api.nasa.gov/search?q=" + nasaId;

    fetch(apiUrl)
        .then(function(response) {
            // console.log(response);
            if (response.ok) {
                response.json().then(function(imageInfo) {
                    console.log(imageInfo);

                    displayFact(imageInfo);

                })
            }
        })
}

var displayFact = function(imageInfo) { 

    var image = document.createElement("img");
    image.src = imageInfo.collection.items[0].links[0].href;
    image.classList = "card-image";

    var caption = document.createElement("p");
    caption.textContent = imageInfo.collection.items[0].data[0].description;
    console.log(caption);
    caption.classList = "card-content";
    
    if (questionNumber === 1) {
        displayFactOneEl.appendChild(grade);
        displayFactOneEl.appendChild(image);
        displayFactOneEl.appendChild(caption);

    } else if (questionNumber === 2) {
        displayFactTwoEl.appendChild(grade);
        displayFactTwoEl.appendChild(image);
        displayFactTwoEl.appendChild(caption);

    } else if (questionNumber === 3) {
        displayFactThreeEl.appendChild(grade);
        displayFactThreeEl.appendChild(image);
        displayFactThreeEl.appendChild(caption);
    }
    
}

// event listeners for true/ false
factBtnElOne.addEventListener("click", verifyAnswer);
factBtnElTwo.addEventListener("click", verifyAnswer);
factBtnElThree.addEventListener("click", verifyAnswer);