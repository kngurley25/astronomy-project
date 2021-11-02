
// HTML elements
var factBtnElOne = document.querySelector("#fact-btn-one");
var factBtnElTwo = document.querySelector("#fact-btn-two");
var factBtnElThree = document.querySelector("#fact-btn-three");

// array for NASA ID numbers of information images tied to true/false
var questionNumber = 0;
var imageArray = [
    {
        NasaId: "PIA17303",
        answer: "one-true"
    },
    {
        NasaId: "PIA15962",
        answer: "two-false"
    },
    {
        NasaId: "PIA17305",
        answer: "three-false"
    }
]

var verifyAnswer = function (event) {

    if ((questionNumber + 1) > imageArray.length) {
        console.log("all questions answered");
        return;

    } else {

        var btnSelect = event.target.getAttribute("id");
        var correct = imageArray[questionNumber].answer;

        if (btnSelect === correct) {
            console.log("correct");
        } else {
            console.log("incorrect");
        }
    }
    questionNumber++;

}

var imageId = "PIA17303";

// NASA image library API call
var getImage = function (imageId) {

    var apiUrl = "https://images-api.nasa.gov/search?q=" + imageId;

    fetch(apiUrl)
        .then(function(response) {
            // console.log(response);
            if (response.ok) {
                response.json().then(function(imageInfo) {
                    console.log(imageInfo);

                    // starshipInfo(imageInfo);

                })
            }
        })
}

getImage();

// event listeners for true/ false
factBtnElOne.addEventListener("click", verifyAnswer);
factBtnElTwo.addEventListener("click", verifyAnswer);
factBtnElThree.addEventListener("click", verifyAnswer);