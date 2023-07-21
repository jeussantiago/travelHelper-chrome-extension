// alert("contentscript.js");

// chrome.runtime.sendMessage({ message: "messageSent" }, function (response) {
//     // when teh compare button gets clicked, send messaged to the background.js
//     // to start scraping the site for the data
//     // background.js would return the data scraped
//     console.log(response);
// });

// const init = function () {
//     const popout = document.createElement("div");
//     popout.className = "travelHelper-container";
//     popout.innerHTML = "travelHelper";
//     popout.src = chrome.runtime.getURL("modal.html");
// console.log(chrome.runtime.getURL("modal.html"))

// console.log("here");
// fetch(chrome.runtime.getURL("/modal.html"))
//     .then((response) => {
//         console.log(response);
//         response.text();
//     })
//     .then((data) => {
//         console.log(JSON.stringify(data));
//         popout.innerHTML = data;
//         // other code
//         // eg update injected elements,
//         // add event listeners or logic to connect to other parts of the app
//     })
//     .catch((err) => {
//         // handle error
//         console.log(err);
//     });
// popout.innerHTML = chrome.runtime.getURL("/modal.html");

// popoutTitle = popout.createElement("div");
// popoutTitle.innerHTML = "Travel Helper 2nd Edition";

//     document.body.appendChild(popout);

//     const compareButton = document.createElement("button");
//     compareButton.className = "btn-compare";
//     compareButton.innerHTML = "Compare";
//     document.body.appendChild(compareButton);
// };

// init();

var domain = window.location.hostname;
domain = domain
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "")
    .split(/[/?#]/)[0];

chrome.runtime.sendMessage(
    { command: "fetch", data: { domain: domain } },
    (response) => {
        // parseCoupons(domain);
        createPopout(domain);
        // console.log("response from firebase:", response.date);
    }
);

var createPopout = function (domain) {
    createPopoutButton();
    createGoogleFlightsPopout();
    createEvents();
};

var createPopoutButton = function () {
    var couponButton = document.createElement("div");
    couponButton.className = "_coupon__button";
    couponButton.innerHTML = "Test";
    document.body.appendChild(couponButton);
};

var createGoogleFlightsPopout = function () {
    var couponHTML = "<p>Be the first to submit a coupon for this site</p>";

    var couponDisplay = document.createElement("div");
    couponDisplay.className = "_coupon__list";
    couponDisplay.innerHTML =
        '<div class="submit-button">Submit Coupon</div>' +
        "<h1>Travel Helper</h1>" +
        // "<p>Browse coupons below that have been used for <strong>" +
        "<p>Compare flights and reveal missing fares from  <strong>" +
        "Google Flights" +
        "</strong></p>" +
        '<p style="font-style:italic;">Click any coupon to copy &amp; use</p>' +
        "<ul>" +
        couponHTML +
        "</ul>" +
        '<input type="checkbox" name="siteName" id="check1" class="flightCompareCheckbox" value="kayak"> Kayak' +
        '<input type="checkbox" name="siteName" id="check1" class="flightCompareCheckbox" value="skyscanner"> Skyscanner' +
        '<input type="checkbox" name="siteName" id="check1" class="flightCompareCheckbox" value="orbitz"> Orbitz' +
        '<input type="checkbox" name="siteName" id="check1" class="flightCompareCheckbox" value="expedia"> Expedia' +
        '<div class="flight-compare-button">Compare</div>';
    couponDisplay.style.display = "none";
    document.body.appendChild(couponDisplay);

    var couponSubmitOverlay = document.createElement("div");
    couponSubmitOverlay.className = "_submit-overlay";
    couponSubmitOverlay.innerHTML =
        '<span class="close">(x) close</span>' +
        "<h3>Do you have a coupon for this site?</h3>" +
        '<div><label>Code:</label><input type="text" class="code"/></div>' +
        '<div><label>Description:</label><input type="text" class="desc"/></div>' +
        '<div><button class="submit-coupon">Submit Coupon</button></div>';
    couponSubmitOverlay.style.display = "none";
    document.body.appendChild(couponSubmitOverlay);
};

// var parseCoupons = function (domain) {
//     try {
//         var couponHTML = "";
//         // for (var key in coupons) {
//         //     var coupon = coupons[key];
//         //     //coupons.forEach(function(coupon, index){
//         //     couponHTML +=
//         //         '<li><span class="code">' +
//         //         coupon.code +
//         //         "</span>" +
//         //         "<p>→ " +
//         //         coupon.description +
//         //         "</p></li>";
//         // }

//         if (couponHTML == "") {
//             couponHTML = "<p>Be the first to submit a coupon for this site</p>";
//         }

//         var couponDisplay = document.createElement("div");
//         couponDisplay.className = "_coupon__list";
//         couponDisplay.innerHTML =
//             '<div class="submit-button">Submit Coupon</div>' +
//             "<h1>Coupons</h1><p>Browse coupons below that have been used for <strong>" +
//             domain +
//             "</strong></p>" +
//             '<p style="font-style:italic;">Click any coupon to copy &amp; use</p>' +
//             "<ul>" +
//             couponHTML +
//             "</ul>";
//         couponDisplay.style.display = "none";
//         document.body.appendChild(couponDisplay);

//         var couponButton = document.createElement("div");
//         couponButton.className = "_coupon__button";
//         couponButton.innerHTML = "T";
//         document.body.appendChild(couponButton);

//         var couponSubmitOverlay = document.createElement("div");
//         couponSubmitOverlay.className = "_submit-overlay";
//         couponSubmitOverlay.innerHTML =
//             '<span class="close">(x) close</span>' +
//             "<h3>Do you have a coupon for this site?</h3>" +
//             '<div><label>Code:</label><input type="text" class="code"/></div>' +
//             '<div><label>Description:</label><input type="text" class="desc"/></div>' +
//             '<div><button class="submit-coupon">Submit Coupon</button></div>';
//         couponSubmitOverlay.style.display = "none";
//         document.body.appendChild(couponSubmitOverlay);

//         createEvents();
//     } catch (e) {
//         console.log("no coupond found for this domain", e);
//     }
// };

var createEvents = function () {
    document.querySelectorAll("._coupon__list .code").forEach((codeItem) => {
        codeItem.addEventListener("click", (event) => {
            var codeStr = codeItem.innerHTML;
            copyToClipboard(codeStr);
        });
    });

    document
        .querySelector("._submit-overlay .close")
        .addEventListener("click", function (event) {
            document.querySelector("._submit-overlay").style.display = "none";
        });

    document
        .querySelector("._coupon__list .submit-button")
        .addEventListener("click", function (event) {
            document.querySelector("._submit-overlay").style.display = "block";
        });

    document
        .querySelector("._coupon__list .flight-compare-button")
        .addEventListener("click", function (event) {
            console.log("here");
            var inputs = document.querySelectorAll(
                "._coupon__list .flightCompareCheckbox"
            );
            for (var i = 0; i < inputs.length; i++) {
                console.log(inputs[i].value, inputs[i].checked);
            }
        });

    document
        .querySelector("._submit-overlay  .submit-coupon")
        .addEventListener("click", function (event) {
            var code = document.querySelector("._submit-overlay .code").value;
            var desc = document.querySelector("._submit-overlay .desc").value;
            submitCoupon(code, desc, window.domain);
        });

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
