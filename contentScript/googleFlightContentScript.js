var createGoogleFlightsPopout = function () {
    // var couponHTML = "<p>Be the first to submit a coupon for this site</p>";
    var sites = ["Kayak", "Skyscanner", "Expedia"];

    var googleFlightsPopoutDisplay = document.createElement("div");
    googleFlightsPopoutDisplay.className = "_coupon__list";
    googleFlightsPopoutDisplay.innerHTML =
        // '<div class="submit-button">Submit Coupon</div>' +
        "<h1>Travel Helper</h1>" +
        // "<p>Browse coupons below that have been used for <strong>" +
        "<p>Compare flights and reveal missing fares from  <strong>" +
        "Google Flights" +
        "</strong></p>";
    // '<input type="checkbox" name="siteName" id="check1" class="flightCompareCheckbox" value="kayak"> Kayak' +
    // '<input type="checkbox" name="siteName" id="check1" class="flightCompareCheckbox" value="skyscanner"> Skyscanner' +
    // '<input type="checkbox" name="siteName" id="check1" class="flightCompareCheckbox" value="orbitz"> Orbitz' +
    // '<input type="checkbox" name="siteName" id="check1" class="flightCompareCheckbox" value="expedia"> Expedia' +
    // '<div class="flight-compare-button">Compare</div>';
    sitesHTML = "";
    for (var i = 0; i < sites.length; i++) {
        sitesHTML +=
            `<li><input type="checkbox" name="siteName" id="check${i}" class="flightCompareCheckbox" value="${sites[i].toLowerCase}">` +
            `<span>${sites[i]}</span></li>`;
    }

    googleFlightsPopoutDisplay.innerHTML +=
        `<ul>${sitesHTML}</ul>` +
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

const createGoogleFlightsPopoutEvents = function () {
    const getGoogleFlightsData = function () {
        let flightData = [];
        const tripType = document.querySelector("#i6");
        const passengers = document.querySelector("span[jsname=xAX4ff]");
        const adults = document.querySelector("div[jsname=mMhAUc]");
        const children = document.querySelector("div[jsname=LpMIEc]");
        const infantSeat = document.querySelector("div[jsname=u3Jn2e]");
        const infantLap = document.querySelector("div[jsname=TwhQhe]");
        const flightLevel = document.querySelector("#i19");
        const origin = document.querySelector("input[aria-labelledby=i24]");
        const destination = document.querySelector(
            "input[aria-labelledby=i30]"
        );
        const departureDate = document.querySelector(
            "input[aria-label=Departure]"
        );
        const returnDate = document.querySelector("input[aria-label=Return]");
        const bagCount = document.querySelector("span[jsname=NnAfwf");
        flightData.push(
            tripType.textContent,
            passengers.textContent,
            adults.getAttribute("aria-valuenow"),
            children.getAttribute("aria-valuenow"),
            infantSeat.getAttribute("aria-valuenow"),
            infantLap.getAttribute("aria-valuenow"),
            flightLevel.textContent,
            origin.value,
            destination.value,
            departureDate.value,
            returnDate.value,
            bagCount.textContent
        );
        // console.log("hello from google flights");
        // console.log(flightData);

        const flight = new Map([
            // ["cities", ["JFK", "NRT"]], // value=array(string airport name)
            // ["dates", ["2023-09-17", "2023-10-03"]], // value=array(string date formatted (year-month-day))
            ["cities", ["JFK", "HND"]],
            ["dates", ["2023-09-17"]],
            // ["cities", ["JFK", "HND", "HND", "KIX", "KIX", "JFK"]],
            // ["dates", ["2023-09-17", "2023-09-21", "2023-09-25"]],
            ["seat_type", "business"], // value=string
            ["adult_count", "2"], // value=string count
            ["child_count", "0"], // value=string count
            ["stops_count", null], // value=string count, null if not specified
        ]);

        return flight;
    };

    /**
     * Formats the given flight data in accordance to the websites given. The final url
     * contains the same information as found on the google flights page.
     *
     * @param {hashmap} requested_websites contains key=str and value=bool about
     * the website the user requests to be redirected to
     * @param {hashmap} flight_data contains information about the flight
     * @returns {array} full urls of the requested websites containing the flight data
     */
    const createURLs = function (requested_websites, flight_data) {
        // console.log(flight_data);
        const requested_website_urls = [];

        cities = flight_data.get("cities");
        dates = flight_data.get("dates");
        cabin_class = flight_data.get("seat_type");
        adult_count = flight_data.get("adult_count");
        child_count = flight_data.get("child_count");
        stops_count = flight_data.get("stops_count");

        // KAYAK
        if (requested_websites.has("kayak")) {
            kayak_url = "www.kayak.com/flights/";

            // add cities and dates
            if (dates.length == 2) {
                kayak_url += `${cities[0]}%2Cnearby-${cities[1]}%2Cnearby/${dates[0]}/${dates[1]}/`;
            } else {
                for (var i = 0; i < dates.length; i++) {
                    kayak_url += `${cities[i * 2]}%2Cnearby-${
                        cities[i * 2 + 1]
                    }%2Cnearby/${dates[i]}/`;
                }
            }

            // add cabin_class
            if (cabin_class.includes("business")) {
                kayak_url += "business/";
            } else if (cabin_class.includes("premium")) {
                kayak_url += "premium/";
            } else if (cabin_class.includes("first")) {
                kayak_url += "first/";
            }

            // add participants
            kayak_url += `${adult_count}adults`;
            if (child_count > 0) {
                kayak_url += "/children";
                for (var i = 0; i < parseInt(child_count); i++) {
                    kayak_url += "-11";
                }
            }

            // add sorting and page number
            kayak_url += "?sort=bestflight_a&afsrc=1";

            // add number of stops
            if (stops_count != null) {
                kayak_url += `&fs=stops=${stops_count}`;
            }

            // console.log(kayak_url);
            requested_website_urls.push(kayak_url);
        }

        // EXPEDIA
        if (requested_websites.has("expedia")) {
            expedia_url =
                "https://www.expedia.com/Flights-Search?flight-type=on&mode=search";

            // add trip type
            // dates = flight_data.get("dates");

            if (dates.length == 2) {
                expedia_url += "&trip=roundtrip";
            } else if (dates.length == 1) {
                expedia_url += "&trip=oneway";
            } else {
                expedia_url += "&trip=multi";
            }

            // add cities and dates
            // round trip condition
            var date_end = dates.length;
            if (dates.length == 2) {
                date_end = 1;
            }

            for (var i = 0; i < date_end; i++) {
                date = dates[i].split("-"); // year month day
                expedia_url += `&leg${i + 1}=from:${cities[2 * i]},to:${
                    cities[2 * i + 1]
                },departure:${date[1]}/${date[2]}/${date[0]}`;
            }

            // add second leg if its a round trip
            if (dates.length == 2) {
                date = dates[1].split("-"); // year month day
                expedia_url += `&leg2=from:${cities[1]},to:${cities[0]},departure:${date[1]}/${date[2]}/${date[0]}`;
            }

            // add cabin_class
            if (cabin_class.includes("business")) {
                expedia_url += "&options=cabinclass:business";
            } else if (cabin_class.includes("premium")) {
                expedia_url += "&options=cabinclass:premium";
            } else if (cabin_class.includes("first")) {
                expedia_url += "&options=cabinclass:first";
            } else {
                expedia_url += "&options=cabinclass:economy";
            }

            // add participants
            expedia_url += `&passengers=adults:${adult_count},`;
            child_count = parseInt(child_count);
            if (child_count != 0) {
                let temp = new Array(child_count);
                for (let i = 0; i < child_count; ++i) temp[i] = "10";
                expedia_url += `children:${child_count}[${temp.join(
                    ";"
                )}],infantinlap:0`;
            } else {
                expedia_url += `children:0,infantinlap:0`;
            }

            // console.log(expedia_url);
            // not adding number of stops for this website

            requested_website_urls.push(expedia_url);
        }

        // SKYSCANNER
        if (requested_websites.has("skyscanner")) {
            // multiway has a slightly different starting url than roundtrip and one way
            // multiway also has a different destination/date format
            if (dates.length <= 2) {
                skyscanner_url =
                    "https://www.skyscanner.com/transport/flights/";

                // add cities and dates
                skyscanner_url += `${cities[0]}/${cities[1]}/`;
                for (var i = 0; i < dates.length; i++) {
                    formatted_date = dates[i].split("-").join("").substring(2);
                    skyscanner_url += `${formatted_date}/`;
                }
            } else {
                skyscanner_url = "https://www.skyscanner.com/transport/d/";

                // add cities and dates
                for (var i = 0; i < dates.length; i++) {
                    skyscanner_url += `${cities[i * 2]}/${dates[i]}/${
                        cities[i * 2 + 1]
                    }/`;
                }
            }

            // add adults
            skyscanner_url += `?adults=${adult_count}&adultsv2=${adult_count}`;

            // add cabin class
            if (cabin_class.includes("business")) {
                skyscanner_url += "&cabinclass=business";
            } else if (cabin_class.includes("premium")) {
                skyscanner_url += "&cabinclass=premiumeconomy";
            } else if (cabin_class.includes("first")) {
                skyscanner_url += "&cabinclass=first";
            } else {
                skyscanner_url += "&cabinclass=economy";
            }

            // add children if any
            skyscanner_url += `&children=${child_count}&childrenv2=`;
            child_count = parseInt(child_count);
            if (child_count > 0) {
                let temp = new Array(child_count);
                for (let i = 0; i < child_count; ++i) temp[i] = "10";
                skyscanner_url += `${temp.join("%7c")}`;
            }

            skyscanner_url +=
                "&inboundaltsenabled=false&infants=0&outboundaltsenabled=false&preferdirects=false&ref=home&rtn=0";

            // console.log(skyscanner_url);
            requested_website_urls.push(skyscanner_url);
        }

        // console.log(requested_website_urls);
        return requested_website_urls;
    };

    document
        .querySelector("._coupon__list .flight-compare-button")
        .addEventListener("click", function (event) {
            const inputs = document.querySelectorAll(
                "._coupon__list .flightCompareCheckbox"
            );

            requested_websites = new Map();
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].checked) {
                    requested_websites.set(inputs[i].value, true);
                }
            }

            // check to see if the user selected any websites
            if (requested_websites.size != 0) {
                // console.log(requested_websites.size, requested_websites);
                flight_data = getGoogleFlightsData();

                requested_website_urls = createURLs(
                    requested_websites,
                    flight_data
                );

                console.log(requested_website_urls);
            }

            // console.log(flight_data);
            // console.log(flight_data.get("adult_count"));

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
