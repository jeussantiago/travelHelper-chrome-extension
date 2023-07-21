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

// var createGoogleFlightsPopout = function () {
//     // var couponHTML = "<p>Be the first to submit a coupon for this site</p>";

//     var googleFlightsPopoutDisplay = document.createElement("div");
//     googleFlightsPopoutDisplay.className = "_coupon__list";
//     googleFlightsPopoutDisplay.innerHTML =
//         // '<div class="submit-button">Submit Coupon</div>' +
//         "<h1>Travel Helper</h1>" +
//         // "<p>Browse coupons below that have been used for <strong>" +
//         "<p>Compare flights and reveal missing fares from  <strong>" +
//         "Google Flights" +
//         "</strong></p>" +
//         '<input type="checkbox" name="siteName" id="check1" class="flightCompareCheckbox" value="kayak"> Kayak' +
//         '<input type="checkbox" name="siteName" id="check1" class="flightCompareCheckbox" value="skyscanner"> Skyscanner' +
//         '<input type="checkbox" name="siteName" id="check1" class="flightCompareCheckbox" value="orbitz"> Orbitz' +
//         '<input type="checkbox" name="siteName" id="check1" class="flightCompareCheckbox" value="expedia"> Expedia' +
//         '<div class="flight-compare-button">Compare</div>';
//     googleFlightsPopoutDisplay.style.display = "none";
//     document.body.appendChild(googleFlightsPopoutDisplay);

//     // var couponSubmitOverlay = document.createElement("div");
//     // couponSubmitOverlay.className = "_submit-overlay";
//     // couponSubmitOverlay.innerHTML =
//     //     '<span class="close">(x) close</span>' +
//     //     "<h3>Do you have a coupon for this site?</h3>" +
//     //     '<div><label>Code:</label><input type="text" class="code"/></div>' +
//     //     '<div><label>Description:</label><input type="text" class="desc"/></div>' +
//     //     '<div><button class="submit-coupon">Submit Coupon</button></div>';
//     // couponSubmitOverlay.style.display = "none";
//     // document.body.appendChild(couponSubmitOverlay);
// };

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

// var createEvents = function () {
//     // document.querySelectorAll("._coupon__list .code").forEach((codeItem) => {
//     //     codeItem.addEventListener("click", (event) => {
//     //         var codeStr = codeItem.innerHTML;
//     //         copyToClipboard(codeStr);
//     //     });
//     // });

//     // document
//     //     .querySelector("._submit-overlay .close")
//     //     .addEventListener("click", function (event) {
//     //         document.querySelector("._submit-overlay").style.display = "none";
//     //     });

//     // document
//     //     .querySelector("._coupon__list .submit-button")
//     //     .addEventListener("click", function (event) {
//     //         document.querySelector("._submit-overlay").style.display = "block";
//     //     });

//     document
//         .querySelector("._coupon__list .flight-compare-button")
//         .addEventListener("click", function (event) {
//             console.log("here");
//             var inputs = document.querySelectorAll(
//                 "._coupon__list .flightCompareCheckbox"
//             );
//             for (var i = 0; i < inputs.length; i++) {
//                 console.log(inputs[i].value, inputs[i].checked);
//             }

//             window.open("https://www.wikipedia.org/");
//         });

//     // document
//     //     .querySelector("._submit-overlay  .submit-coupon")
//     //     .addEventListener("click", function (event) {
//     //         var code = document.querySelector("._submit-overlay .code").value;
//     //         var desc = document.querySelector("._submit-overlay .desc").value;
//     //         submitCoupon(code, desc, window.domain);
//     //     });

//     document
//         .querySelector("._coupon__button")
//         .addEventListener("click", function (event) {
//             if (
//                 document.querySelector("._coupon__list").style.display ==
//                 "block"
//             ) {
//                 document.querySelector("._coupon__list").style.display = "none";
//                 document.querySelector("._coupon__button").innerHTML = "Test";
//             } else {
//                 document.querySelector("._coupon__list").style.display =
//                     "block";
//                 document.querySelector("._coupon__button").innerHTML = "X";
//             }
//         });
// };

// var createGoogleFlightsPopoutEvents = function () {
//     var getGoogleFlightsData = function () {
//         console.log("hello from google flights");
//     };

//     document
//         .querySelector("._coupon__list .flight-compare-button")
//         .addEventListener("click", function (event) {
//             console.log("here");
//             var inputs = document.querySelectorAll(
//                 "._coupon__list .flightCompareCheckbox"
//             );
//             for (var i = 0; i < inputs.length; i++) {
//                 console.log(inputs[i].value, inputs[i].checked);
//             }

//             getGoogleFlightsData();

//             // const x = document.querySelectorAll("[role]");
//             // const x = document.querySelectorAll(
//             //     "center [role='presentation'] span"
//             // );
//             // for (var i = 0; i < x.length; i++) {
//             //     console.log(x[i].innerHTML);
//             // }

//             // window.open("https://www.wikipedia.org/");
//         });
// };
