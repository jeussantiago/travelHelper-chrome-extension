// alert("contentscript.js");

var domain = window.location.hostname;
var fullUrl = window.location.href;
// domain = domain
//     .replace("http://", "")
//     .replace("https://", "")
//     .replace("www.", "")
//     .split(/[/?#]/)[0];

chrome.runtime.sendMessage(
    { command: "fetch", data: { domain: domain } },
    (response) => {
        // parseCoupons(domain);
        console.log(fullUrl);
        createPopout(domain);
        // console.log("response from firebase:", response.date);
    }
);

// chrome.action.onClicked.addListener((tab) => {
//     console.log(tab.id, tab.url);
// });
// console.log(domain);
// createPopout(domain);

var createPopout = function (domain) {
    createPopoutButton();
    // functions from googleFlightContentScript.js
    // console.log(domain);
    createGoogleFlightsPopout();
    createGoogleFlightsPopoutEvents();

    createPopoutButtonEvents();
};

var createPopoutButton = function () {
    var popoutButton = document.createElement("div");
    popoutButton.className = "_coupon__button";
    popoutButton.innerHTML = "Test";
    document.body.appendChild(popoutButton);
};

var createPopoutButtonEvents = function () {
    document
        .querySelector("._coupon__button")
        .addEventListener("click", function (event) {
            if (
                document.querySelector("._coupon__list").style.display ==
                "block"
            ) {
                document.querySelector("._coupon__list").style.display = "none";
                document.querySelector("._coupon__button").innerHTML = "Test";
            } else {
                document.querySelector("._coupon__list").style.display =
                    "block";
                document.querySelector("._coupon__button").innerHTML = "X";
            }
        });
};
