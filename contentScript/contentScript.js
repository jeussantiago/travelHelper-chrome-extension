// alert("contentscript.js");
// import("./contentScript/googleFlightContentScript.js");
// import(
//     (chrome.runtime.getURL || chrome.extension.getURL)(
//         "./contentScript/googleFlightContentScript.js"
//     )
// );

var domain = window.location.hostname;
var fullUrl = window.location.href;
const google_flights_url = "google.com/travel/flights";

chrome.runtime.sendMessage(
    { command: "fetch", data: { domain: domain } },
    (response) => {
        createPopout(fullUrl);
    }
);

// chrome.action.onClicked.addListener((tab) => {
//     console.log(tab.id, tab.url);
// });
// console.log(domain);
// createPopout(domain);

var createPopout = function (domain) {
    createPopoutButton();

    if (domain.includes(google_flights_url)) {
        createGoogleFlightsPopout();
        createGoogleFlightsPopoutEvents();
    }

    createPopoutButtonEvents();
};

var createPopoutButton = function () {
    var popoutButton = document.createElement("div");
    popoutButton.className = "_travel_helper__button";
    popoutButton.innerHTML = "Fly";
    document.body.appendChild(popoutButton);
};

var createPopoutButtonEvents = function () {
    document
        .querySelector("._travel_helper__button")
        .addEventListener("click", function (event) {
            if (
                document.querySelector("._travel_helper__button").innerHTML ==
                "X"
            ) {
                document.querySelector("._travel_helper__button").innerHTML =
                    "Fly";
            } else {
                document.querySelector("._travel_helper__button").innerHTML =
                    "X";
            }
        });
};

// createPopout(fullUrl);
