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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === "hello!") {
        console.log(request.url); // new url is now in content scripts!
        if (request.url.includes(google_flights_url)) {
            console.log("valid site");
            // createPopout(request.url);
        } else {
            console.log("invalid site");
        }
    }
});

// chrome.runtime.onMessage.addListener((msg, sender, response) => {
//     if (msg.command == "start") {
//         console.log("contentscript.js, domain:", msg.data.domain);
//         // createPopout(msg.data.domain);
//         response({ type: "result", status: "success", data: {}, request: msg });
//     }

//     return true;
// });

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
