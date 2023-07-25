// class FlightData {
//     constructor() {
//         this.num_people = 0;
//         this.adults = 0;
//         this.children = 0;
//     }

//     setAdultsNumber(val) {
//         this.adults = val;
//     }

//     getAdultsNumber() {
//         return this.adults;
//     }
// }

// const curr_flight_data = new FlightData();
// curr_flight_data.adults = 1;

var createGoogleFlightsPopout = function () {
    // var couponHTML = "<p>Be the first to submit a coupon for this site</p>";

    var googleFlightsPopoutDisplay = document.createElement("div");
    googleFlightsPopoutDisplay.className = "_coupon__list";
    googleFlightsPopoutDisplay.innerHTML =
        // '<div class="submit-button">Submit Coupon</div>' +
        "<h1>Travel Helper</h1>" +
        // "<p>Browse coupons below that have been used for <strong>" +
        "<p>Compare flights and reveal missing fares from  <strong>" +
        "Google Flights" +
        "</strong></p>" +
        '<input type="checkbox" name="siteName" id="check1" class="flightCompareCheckbox" value="kayak"> Kayak' +
        '<input type="checkbox" name="siteName" id="check1" class="flightCompareCheckbox" value="skyscanner"> Skyscanner' +
        '<input type="checkbox" name="siteName" id="check1" class="flightCompareCheckbox" value="orbitz"> Orbitz' +
        '<input type="checkbox" name="siteName" id="check1" class="flightCompareCheckbox" value="expedia"> Expedia' +
        '<div class="flight-compare-button">Compare</div>';
    googleFlightsPopoutDisplay.style.display = "none";
    document.body.appendChild(googleFlightsPopoutDisplay);

    // const compareBtn = document.querySelector(".flight-compare-button");
    // let flightData = [];
    // compareBtn.addEventListener("click", (e) => {
    //     const tripType = document.querySelector("#i6");
    //     const passengers = document.querySelector("span[jsname=xAX4ff]");
    //     const flightLevel = document.querySelector("#i19");
    //     const origin = document.querySelector(".yPKHsc");
    //     const destination = document.querySelector(".yPKHsc");
    //     const departureDate = document.querySelector(
    //         "input[aria-label=Departure"
    //     );
    //     const returnDate = document.querySelector("input[aria-label=Return]");
    //     flightData.push(
    //         tripType.textContent,
    //         passengers.textContent,
    //         flightLevel.textContent,
    //         origin.textContent,
    //         destination.textContent,
    //         departureDate.value,
    //         returnDate.value
    //     );
    //     return flightData;
    // });
    // cons
    // console.log(flightData);

    // var couponSubmitOverlay = document.createElement("div");
    // couponSubmitOverlay.className = "_submit-overlay";
    // couponSubmitOverlay.innerHTML =
    //     '<span class="close">(x) close</span>' +
    //     "<h3>Do you have a coupon for this site?</h3>" +
    //     '<div><label>Code:</label><input type="text" class="code"/></div>' +
    //     '<div><label>Description:</label><input type="text" class="desc"/></div>' +
    //     '<div><button class="submit-coupon">Submit Coupon</button></div>';
    // couponSubmitOverlay.style.display = "none";
    // document.body.appendChild(couponSubmitOverlay);
};

var createGoogleFlightsPopoutEvents = function () {
    var getGoogleFlightsData = function () {
        let flightData = [];
        const tripType = document.querySelector("#i6");
        const passengers = document.querySelector("span[jsname=xAX4ff]");
        const adults = document.querySelector('div[jsname=mMhAUc]');
        const children = document.querySelector('div[jsname=LpMIEc]');
        const infantSeat = document.querySelector('div[jsname=u3Jn2e]');
        const infantLap = document.querySelector('div[jsname=TwhQhe]');
        const flightLevel = document.querySelector("#i19");
        const origin = document.querySelector("input[aria-labelledby=i24]");
        const destination = document.querySelector("input[aria-labelledby=i30]");
        const departureDate = document.querySelector("input[aria-label=Departure]");
        const returnDate = document.querySelector("input[aria-label=Return]");
        const bagCount = document.querySelector("span[jsname=NnAfwf");
        flightData.push(
            tripType.textContent,
            passengers.textContent,
            adults.getAttribute('aria-valuenow'),
            children.getAttribute('aria-valuenow'),
            infantSeat.getAttribute('aria-valuenow'),
            infantLap.getAttribute('aria-valuenow'),
            flightLevel.textContent,
            origin.value,
            destination.value,
            departureDate.value,
            returnDate.value,
            bagCount.textContent,
        );
        console.log("hello from google flights");
        console.log(flightData);
    };

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

            getGoogleFlightsData();

            // const x = document.querySelectorAll("[role]");
            // const x = document.querySelectorAll(
            //     "center [role='presentation'] span"
            // );
            // for (var i = 0; i < x.length; i++) {
            //     console.log(x[i].innerHTML);
            // }

            // window.open("https://www.wikipedia.org/");
        });
};

//BUG:
// will have the popup when you first open google flights or when its reload
// if the page already has it and you go to another tab like explore,
// b/c the page doesnt reload, the popup doesn't go away
// vice versa if you are on google explore where it doesn't show up then you
// enter google flights but the state hasnt changed

// POSSIBLE SOLUTION:
// add a chrome tabs onUpdated listener to check the current url
// only show the tab if it complies with any of the sites approved

// STEPS:
// 1. see if the user wants to open any other site
// 2. if none dont do anything otherwise get data from page
// 3. have a error condition where the data can't be retrieve
//      show the user the error: tell them to try again
// 4. data retrieved successfully
// figure out some way to go to the given websites with filled in info
