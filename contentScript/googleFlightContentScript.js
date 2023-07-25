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
            // ["cities", ["JFK", "HND"]],
            // ["dates", ["2023-09-17"]],
            ["cities", ["JFK", "HND", "HND", "KIX", "KIX", "JFK"]],
            ["dates", ["2023-09-17", "2023-09-21", "2023-09-25"]],
            ["seat_type", "economu"], // value=string
            ["adult_count", "2"], // value=string count
            ["child_count", "0"], // value=string count
            ["stops_count", "0"], // value=string count, null if not specified
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

        if (requested_websites.has("kayak")) {
            kayak_url = "www.kayak.com/flights/";

            // add cities and dates
            cities = flight_data.get("cities");
            dates = flight_data.get("dates");
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
            cabin_class = flight_data.get("seat_type");
            if (cabin_class.includes("business")) {
                kayak_url += "business/";
            } else if (cabin_class.includes("premium")) {
                kayak_url += "premium/";
            } else if (cabin_class.includes("first")) {
                kayak_url += "first/";
            }

            // add participants
            adult_count = flight_data.get("adult_count");
            child_count = flight_data.get("child_count");
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
            stops_count = flight_data.get("stops_count");
            if (stops_count != null) {
                kayak_url += `&fs=stops=${stops_count}`;
            }

            // console.log(kayak_url);
            requested_website_urls.push(kayak_url);
        }

        if (requested_websites.has("expedia")) {
            expedia_url =
                "https://www.expedia.com/Flights-Search?flight-type=on&mode=search";

            // add trip type
            dates = flight_data.get("dates");

            if (dates.length == 2) {
                expedia_url += "&trip=roundtrip";
            } else if (dates.length == 1) {
                expedia_url += "&trip=oneway";
            } else {
                expedia_url += "&trip=multi";
            }

            // add cities and dates
            cities = flight_data.get("cities");
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
            cabin_class = flight_data.get("seat_type");
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
            expedia_url += `&passengers=adults:${flight_data.get(
                "adult_count"
            )},`;
            child_count = parseInt(flight_data.get("child_count"));
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
/*
EXPEDIA

https://www.expedia.com/Flights-Search?flight-type=on&mode=search
$trip={trip_type}
$leg{curr_leg_ind}=from:{airport_1},to:{airport_2},departure:{day/month/year}
$options=cabinclass:{cabin_class}
if not multi {
    &fromDate={09/17/2023 day/month/year}
    &d1={2023-09-17 year-month-day}

    if roundtrip {
        &toDate={09/17/2023 day/month/year}
        &d2={2023-09-17 year-month-day}
    }
}
&passengers=adults:{adult_count},children:0,infantinlap:0
if children != 0 {
    2[6;15]
    {children_count}[count of children seperate by ";"]
}


trip_type = [roundtrip, oneway, multi]
cabin_class = [economy, premium, business, first]





ROUND TRIP

2 adults - 1 child - business
https://www.expedia.com/Flights-Search?flight-type=on&mode=search&
trip=roundtrip
&leg1=from:NYC,to:TYO,departure:09/17/2023
&leg2=from:TYO,to:NYC,departure:09/21/2023
&options=cabinclass:business
&fromDate=09/17/2023
&toDate=09/21/2023
&d1=2023-09-17
&d2=2023-09-21
&passengers=adults:3,children:0,infantinlap:0

2 adults - 1 child - premium  economy
https://www.expedia.com/Flights-Search?flight-type=on&mode=search&
trip=roundtrip
&leg1=from:NYC,to:TYO,departure:09/17/2023
&leg2=from:TYO,to:NYC,departure:09/21/2023
&options=cabinclass:premium
&fromDate=09/17/2023
&toDate=09/21/2023
&d1=2023-09-17
&d2=2023-09-21
&passengers=adults:3,children:0,infantinlap:0

https://www.expedia.com/Flights-Search?flight-type=on&mode=search
&trip=roundtrip
&leg1=from:Newark,%20NJ,%20United%20States%20of%20America%20(EWR-Liberty%20Intl.),to:Tokyo%20(and%20vicinity),%20Tokyo%20Prefecture,%20Japan,departure:8/12/2023TANYT
&leg2=from:Tokyo%20(and%20vicinity),%20Tokyo%20Prefecture,%20Japan,to:Newark,%20NJ,%20United%20States%20of%20America%20(EWR-Liberty%20Intl.),departure:8/17/2023TANYT
&options=cabinclass:economy
&fromDate=8/12/2023
&toDate=8/17/2023
&d1=2023-8-12
&d2=2023-8-17
&passengers=children:2[6;15],adults:1,infantinlap:N


ONE WAY 

1 adult - 4 children - first class
https://www.expedia.com/Flights-Search?flight-type=on&mode=search&
trip=oneway
&leg1=from:NYC,to:TYO,departure:09/17/2023
&options=cabinclass:first
&fromDate=09/17/2023
&d1=2023-09-17
&passengers=adults:4,children:0,infantinlap:0

https://www.expedia.com/Flights-Search?flight-type=on&mode=search
&trip=oneway
&leg1=from:NYC,to:TYO,departure:09/17/2023
&options=cabinclass:first
&fromDate=09/17/2023
&d1=2023-09-17
&passengers=adults:4,children:0,infantinlap:0


MULTIWAY

https://www.expedia.com/Flights-Search?flight-type=on&mode=search
&trip=multi
&leg1=from:NYC,to:TYO,departure:09/17/2023
&leg2=from:TYO,to:OSA,departure:09/21/2023
&leg3=from:OSA,to:NYC,departure:09/25/2023
&options=cabinclass:economy
&passengers=adults:4,children:0,infantinlap:0


https://www.expedia.com/Flights-Search?
leg1=from%3ANew%20York%20%28JFK%20-%20John%20F.%20Kennedy%20Intl.%29%2Cto%3ATokyo%20%28NRT%20-%20Narita%20Intl.%29%2Cdeparture%3A9%2F17%2F2023TANYT
&leg2=from%3ATokyo%20%28NRT%20-%20Narita%20Intl.%29%2Cto%3AOsaka%20%28KIX%20-%20Kansai%20Intl.%29%2Cdeparture%3A9%2F19%2F2023TANYT
&leg3=from%3AOsaka%20%28KIX%20-%20Kansai%20Intl.%29%2Cto%3ANew%20York%20%28JFK%20-%20John%20F.%20Kennedy%20Intl.%29%2Cdeparture%3A9%2F22%2F2023TANYT
&mode=search
&options=carrier%3A%2A%2Ccabinclass%3Afirst%2Cmaxhops%3A1%2Cnopenalty%3AN
&pageId=0
&passengers=adults%3A4%2Cchildren%3A0%2Cinfantinlap%3AN&trip=multi

https://www.expedia.com/Flights-Search?
filters=%22numOfStopFilterValue%22%22stopInfo%22%22numberOfStops%22%22stopFilterOperation%22%22EQUAL%22flight-type=on
&mode=search
&trip=oneway
&leg1=from:NYC,to:TYO,departure:09/17/2023
&leg2=from:TYO,to:NYC
&options=cabinclass:business
&fromDate=09/17/2023
&d1=2023-09-17
&passengers=adults:4,children:0,infantinlap:0

https://www.expedia.com/Flights-Search?
filters=%5B%7B%22numOfStopFilterValue%22%3A%7B%22stopInfo%22%3A%7B%22numberOfStops%22%3A1%2C%22stopFilterOperation%22%3A%22EQUAL%22%7D%7D%7D%5D
&leg1=from%3ANew%20York%2C%20NY%20%28JFK-John%20F.%20Kennedy%20Intl.%29%2Cto%3ATokyo%20%28NRT-Narita%20Intl.%29%2Cdeparture%3A8%2F9%2F2023TANYT
&mode=search
&options=carrier%3A%2A%2Ccabinclass%3A%2Cmaxhops%3A1%2Cnopenalty%3AN
&passengers=adults%3A1%2Cchildren%3A0%2Cinfantinlap%3AN
&trip=oneway

*/

/*
KAYAK
kayak.com/flights/
    {city_a}%2Cnearby-{city_b}%2Cnearby/{dates}/
    {seat_type}/ (if not economy)
    {adult_count}adults
    /children{"-11" * count_of_children} (if children_cnt != 0)
    ?sort=bestflight_a&afsrc=1
    &fs=stops={number_of_stops} (if stops specified)

destination city/date
if len(dates) == 2:
    city_a to city_b / date_a / date_b
    {airport_name_1}%2Cnearby-{airport_name_1}%2Cnearby/{flight_date_1 year-month-day}/{flight_date_2 year-month-day}
else:
    city_a to city_b / date
    {airport_name_1}%2Cnearby-{airport_name_1}%2Cnearby/{year-month-day}/

seat type
    if economy:
        - don't add anything
    if business:
        - add 'business/'
    if premium economy:
        - add 'premium/'
    if first class:
        - add 'first/

number of stops
    if stops not specified:
        add nothing
    if stops == nonstop
        &fs=stops=0
    if stops == 1
        &fs=stops=1
    if stops == 2+
        &fs=stops=2


adults: {count_of_adults}adults/
children: children{"-11" * count_of_children}


ROUND TRIP:

Round Trip - 1 adult - nonstop
https://www.kayak.com/flights/
    JFK%2Cnearby-NRT%2Cnearby/2023-09-17/2023-10-03/
    1adults?
    sort=bestflight_a&afsrc=1
    &fs=stops=0

Round Trip - 1 adult 1 child
https://www.kayak.com/flights/
    JFK%2Cnearby-NRT%2Cnearby/2023-09-17/2023-10-03/
    1adults/children-11?
    sort=bestflight_a&afsrc=1

Round Trip - 3 adult 3 child
https://www.kayak.com/flights/
    JFK%2Cnearby-NRT%2Cnearby/2023-09-17/2023-10-03/
    3adults/children-11-11-11?
    sort=bestflight_a&afsrc=1

Round Trip - 1 adult 8 child
https://www.kayak.com/flights/
    JFK%2Cnearby-NRT%2Cnearby/2023-09-17/2023-10-03/
        1adults/children-11-11-11-11-11-11-11-11?
        sort=bestflight_a&afsrc=1

Round Trip - 2 adults - 
economy
https://www.kayak.com/flights/
    JFK%2Cnearby-NRT%2Cnearby/2023-09-17/2023-09-21/
    2adults?
    sort=bestflight_a&afsrc=1

business
https://www.kayak.com/flights/
    JFK%2Cnearby-NRT%2Cnearby/2023-09-17/2023-09-21/
    business/
    2adults?
    sort=bestflight_a&afsrc=1

premium economy
https://www.kayak.com/flights/
    JFK%2Cnearby-NRT%2Cnearby/2023-09-17/2023-09-21/
    premium/
    2adults?
    sort=bestflight_a&afsrc=1

first class
https://www.kayak.com/flights/
    JFK%2Cnearby-NRT%2Cnearby/2023-09-17/2023-09-21/
    first/
    2adults?
    sort=bestflight_a&afsrc=1

ONE WAY:

One Way - 1 adult 8 child
https://www.kayak.com/flights/
    JFK%2Cnearby-NRT%2Cnearby/2023-09-17/
    1adults/children-11-11-11-11-11-11-11-11?
    sort=bestflight_a&afsrc=1

One Way - 2 adult 
https://www.kayak.com/flights/
    EWR%2Cnearby-NRT%2Cnearby/2023-09-17/
    2adults?
    sort=bestflight_a&afsrc=1

MULTI-WAY:

multi way - 1 adult
https://www.kayak.com/flights/
    JFK%2Cnearby-HND%2Cnearby/2023-09-17/
    HND%2Cnearby-KIX%2Cnearby/2023-09-21/
    KIX%2Cnearby-JFK%2Cnearby/2023-09-25/
    2adults?sort=bestflight_a&afsrc=1

www.kayak.com/flights/
    JFK%2Cnearby-HND%2Cnearby/2023-09-17/
    HND%2Cnearby-KIX%2Cnearby/2023-09-21/
    KIX%2Cnearby-JFK%2Cnearby/2023-09-25/
*/
