let recored_url;
let isGoogleFlightElementRendered = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "createGoogleFlightsPopout") {
        if (!isGoogleFlightElementRendered) {
            createPopout();
            isGoogleFlightElementRendered = true;
            // resolves the unchecked runtime.lastError error
            sendResponse({ message: "Google Flights popout created." });
            return true;
        } else if (window.location.href != recored_url) {
            document.querySelector("._travel_helper__button").style.display =
                "flex";
            document.querySelector(
                "._travel_helper_close__button"
            ).style.display = "flex";
        }
    }
});

var createPopout = function () {
    createPopoutButton();

    createGoogleFlightsPopout();
    createGoogleFlightsPopoutEvents();

    createPopoutButtonEvents();
};

var createPopoutButton = function () {
    const popoutButton = document.createElement("div");
    popoutButton.className = "_travel_helper__container";
    popoutButton.innerHTML =
        "<div class='_travel_helper__button'>Fly</div>" +
        "<div class='_travel_helper_close__button'>X</div>";
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
                document.querySelector("._travel_helper__button").style.right =
                    "35px";
                document.querySelector(
                    "._travel_helper_close__button"
                ).style.display = "flex";
            } else {
                document.querySelector("._travel_helper__button").innerHTML =
                    "X";
                document.querySelector("._travel_helper__button").style.right =
                    "15px";
                document.querySelector(
                    "._travel_helper_close__button"
                ).style.display = "none";
            }
        });
    //15 vs

    document
        .querySelector("._travel_helper_close__button")
        .addEventListener("click", function (event) {
            document.querySelector("._travel_helper__button").style.display =
                "none";
            document.querySelector(
                "._travel_helper_close__button"
            ).style.display = "none";

            recored_url = window.location.href;
        });
};
