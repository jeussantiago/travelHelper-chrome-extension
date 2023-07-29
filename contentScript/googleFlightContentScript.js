var createGoogleFlightsPopout = function () {
    var googleFlightsPopoutDisplay = document.createElement("div");
    googleFlightsPopoutDisplay.className = "_google_flight__container";
    googleFlightsPopoutDisplay.innerHTML =
        "<h1>Travel Helper</h1>" +
        "<p>Compare flights and reveal missing fares from <strong>" +
        "Google Flights" +
        "</strong></p>";

    // error message section
    googleFlightsPopoutDisplay.innerHTML +=
        "<div class='flightErrorSection'></div>";

    sitesHTML =
        `<li><input type="checkbox" name="siteName" id="check0" class="flightCompareCheckbox" value="kayak" checked><span>Kayak</span></li>` +
        `<li><input type="checkbox" name="siteName" id="check0" class="flightCompareCheckbox" value="expedia" checked><span>Expedia</span></li>` +
        `<li><input type="checkbox" name="siteName" id="check0" class="flightCompareCheckbox" value="skyscanner" checked><span>Skyscanner</span></li>` +
        `<li><input type="checkbox" name="siteName" id="check0" class="flightCompareCheckbox" value="booking.com" ><span>Booking.com</span></li>`;

    googleFlightsPopoutDisplay.innerHTML +=
        `<ul>${sitesHTML}</ul>` +
        '<div class="flight-compare-button">Compare</div>';

    googleFlightsPopoutDisplay.style.display = "none";
    document.body.appendChild(googleFlightsPopoutDisplay);
};

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const createGoogleFlightsPopoutEvents = function () {
    /**
     * scrapes the google flights page and gathers the cities/airports(noted by the
     * closest airport to the city, using the airport's 3 symbols EX: Los Angeles is LAX),
     * departure dates, the number of adults, the number of children and the cabin class.
     *
     * @param {none}
     * @returns {hashmap} key=[data, error, raw_error]. error is a custom error message.
     * raw_error is the compiler error message. data is a hashmap containing the data
     * of the user's flight where key=[cities, dates, seat_type, adult_count, child_count]
     */
    const getGoogleFlightsData = async function () {
        const sleep_timer = 750;

        // PASSENGER DATA
        var adult_count = null;
        var child_count = null;
        try {
            // open passenger container to see the number of adults and children
            document.querySelector("span[jsname=xAX4ff]").click();
            // wait for data to load
            await sleep(sleep_timer);
            const passengers = document.querySelectorAll(
                "ul[jsname=nK2kYb] li span[jsname=NnAfwf]"
            );

            if (passengers.length == 0) {
                return {
                    data: null,
                    error: "Unable to read passenger data.",
                    raw_error: new TypeError(
                        "Cannot read properties of null (variable passengers)",
                        "googleFlightContentScript.js"
                    ),
                };
            }

            adult_count = passengers[0].innerHTML;
            child_count = passengers[1].innerHTML;
        } catch (err) {
            return {
                data: null,
                error: "Unable to read passenger data.",
                raw_error: err,
            };
        }

        // TRIP TYPE
        var trip_type = null;
        try {
            trip_type = document
                .querySelector("div[jsname=oYxtQd] span[id=i6]")
                .innerHTML.toLowerCase();
        } catch (err) {
            return {
                data: null,
                error: "Unable to read trip type data.",
                raw_error: err,
            };
        }

        // AIRPOT DATA
        var cities = [];
        try {
            // container of row holding two airports
            const airport_contianer = document.querySelectorAll(
                "[jscontroller=ANrR7b] [jscontroller=V6OXGf] [jsname=kj0dLd] [jscontroller=i8IY0e] "
            );

            // multi-city trip type means we can skip the first 2 items in the container
            var i = 0;
            var airport_end = airport_contianer.length;
            if (trip_type.includes("multi")) {
                // in multi-city, there are repeat values in the first 2 positions, skip them
                var i = 2;
            } else {
                // bug from going from multi city to round trip and one way. There would be too many inputs to unpack
                // the first two items are the only ones we need
                airport_end = 2;
            }

            // error handling. no data found. not an error since querySelectorAll found nothing
            if (airport_contianer.length == 0) {
                return {
                    data: null,
                    error: "Unable to read cities/airport data.",
                    raw_error: new TypeError(
                        "Cannot read properties of null (variable airport_contianer)",
                        "googleFlightContentScript.js"
                    ),
                };
            }

            for (i; i < airport_end; i++) {
                // airport symbol is located in a hidden place unless we open it
                airport_contianer[i].click();
                // need a timer before getting data to let the data load onto the page
                await sleep(sleep_timer);
                airport_symbol = document.querySelector(
                    "[jscontroller=ANrR7b] .P1pPOe"
                ).innerHTML;

                cities.push(airport_symbol);
            }
        } catch (err) {
            return {
                data: null,
                error: "Unable to read cities/airport data.",
                raw_error: err,
            };
        }

        // DATES
        var dates = [];
        try {
            var dates_scrapped = null;
            if (!trip_type.includes("round")) {
                // one way and multiway
                dates_scrapped = document.querySelectorAll(
                    "div.WhDFk.Io4vne.Ic3tg.NXzzqb.g7lVZ.HDland.sYt5sc"
                );
                var i = 0;
                var dates_end = dates_scrapped.length;
                if (trip_type.includes("one")) {
                    // the first item is the only ones we need for one way trip
                    dates_end = 1;
                }
                // transitions between items in multi are working fine

                // error handling. no data found. not an error since querySelectorAll found nothing
                if (dates_scrapped.length == 0) {
                    return {
                        data: null,
                        error: "Unable to read departure dates (One way/ multi-way) data.",
                        raw_error: new TypeError(
                            "Cannot read properties of null (variable dates_scrapped)",
                            "googleFlightContentScript.js"
                        ),
                    };
                }

                for (i; i < dates_end; i++) {
                    const date = dates_scrapped[i].getAttribute("data-iso");
                    if (!dates.includes(date)) {
                        dates.push(date);
                    }
                }
            } else {
                // round trip
                const dates_container = document.querySelector(
                    "[jsname=huwV5e] input"
                );

                // open calender
                dates_container.click();
                await sleep(sleep_timer);

                const flight_one = document
                    .querySelector("div.WhDFk.Io4vne.g7lVZ.Ic3tg.HDland.NXzzqb")
                    .getAttribute("data-iso");
                const flight_two = document
                    .querySelector("div.WhDFk.Io4vne.Ic3tg.g7lVZ.sYt5sc")
                    .getAttribute("data-iso");

                dates = [flight_one, flight_two];
            }
        } catch (err) {
            return {
                data: null,
                error: "Unable to read departure dates data.",
                raw_error: err,
            };
        }

        // CABIN CLASS
        var seat_type = null;
        try {
            seat_type = document
                .querySelector(".Maqf5d .TQYpgc [jsname=oYxtQd] span[id=i18]")
                .innerHTML.toLowerCase();
        } catch (err) {
            return {
                data: null,
                error: "Unable to read cabin class data.",
                raw_error: err,
            };
        }

        const flight_data = new Map([
            ["cities", cities],
            ["dates", dates],
            ["seat_type", seat_type], // value=string
            ["adult_count", adult_count.toString()], // value=string count
            ["child_count", child_count.toString()], // value=string count
            ["stops_count", null], // value=string count, null if not specified
        ]);

        return {
            data: flight_data,
            error: null,
            raw_error: null,
        };
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
        const requested_website_urls = new Map();

        cities = flight_data.get("cities");
        dates = flight_data.get("dates");
        cabin_class = flight_data.get("seat_type");
        adult_count = flight_data.get("adult_count");
        child_count = flight_data.get("child_count");
        stops_count = flight_data.get("stops_count");

        // KAYAK
        if (requested_websites.has("kayak")) {
            kayak_url = "https://www.kayak.com/flights/";

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

            requested_website_urls.set("kayak", kayak_url);
        }

        // EXPEDIA
        if (requested_websites.has("expedia")) {
            expedia_url =
                "https://www.expedia.com/Flights-Search?flight-type=on&mode=search";

            // add trip type
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

            // not adding number of stops for this website
            requested_website_urls.set("expedia", expedia_url);
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

            requested_website_urls.set("skyscanner", skyscanner_url);
        }

        // BOOKING.COM
        if (requested_websites.has("booking.com")) {
            booking_url = "https://flights.booking.com/flights/";

            // add airports
            const from_airports = [];
            const to_airports = [];
            for (let i = 0; i < cities.length; ++i) {
                if (i % 2 == 0) {
                    from_airports.push(cities[i] + ".AIRPORT");
                } else {
                    to_airports.push(cities[i] + ".AIRPORT");
                }
            }

            const from_airports_str = from_airports.join("%7C");
            const to_airports_str = to_airports.join("%7C");
            // console.log(from_airports_str);
            // console.log(to_airports_str);
            booking_url += `${from_airports_str}-${to_airports_str}/`;

            // add trip type
            var trip_type = "ROUNDTRIP";
            if (dates.length == 1) {
                trip_type = "ONEWAY";
            } else if (dates.length > 2) {
                trip_type = "MULTISTOP";
            }
            booking_url += `?type=${trip_type}`;

            // add number of adults
            booking_url += `&adults=${adult_count}`;

            // add seat type/cabin class
            var cabin_type = "ECONOMY";
            if (cabin_class.includes("business")) {
                cabin_type = "BUSINESS";
            } else if (cabin_class.includes("premium")) {
                cabin_type = "PREMIUM_ECONOMY";
            } else if (cabin_class.includes("first")) {
                cabin_type = "FIRST";
            }
            booking_url += `&cabinClass=${cabin_type}`;

            // add children
            booking_url += "&children=";
            child_count = parseInt(child_count);
            if (child_count > 0) {
                let temp = new Array(child_count);
                for (let i = 0; i < child_count; ++i) temp[i] = "10";
                booking_url += `${temp.join("%2C")}`;
            }

            // add from and to locations
            booking_url += `&from=${from_airports_str}`;
            booking_url += `&to=${to_airports_str}`;

            // add dates
            if (trip_type == "ROUNDTRIP") {
                booking_url += `&depart=${dates[0]}`;
                booking_url += `&return=${dates[1]}`;
            } else if (trip_type == "ONEWAY") {
                booking_url += `&depart=${dates[0]}`;
            } else {
                // Multi stop
                booking_url += `&multiStopDates=${dates.join("%7C")}`;
            }

            booking_url +=
                "&sort=BEST" +
                "&travelPurpose=leisure" +
                "&aid=304142" +
                "&label=gen173nr-1FCAEoggI46AdIM1gEaKQCiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKTrJWmBsACAdICJGMwMmE2MGE1LTI0YWMtNDUyOS04ZTFhLTcyYTM2MzQyNmM3NdgCBeACAQ";

            requested_website_urls.set("booking.com", booking_url);
        }

        return requested_website_urls;
    };

    const handleError = function (isError) {
        const errorContainer = document.querySelector(".flightErrorSection");
        if (isError) {
            // add error message to UI
            errorContainer.innerHTML =
                "<div class='flightErrorContainer'><p><strong>Error Occured <br />" +
                "</strong> Try again or reload page</p></div>";
        } else {
            // remove error message
            errorContainer.innerHTML = "";
        }
    };

    document
        .querySelector("._google_flight__container .flight-compare-button")
        .addEventListener("click", function (event) {
            // might be a second search, remove the error message
            handleError(false);

            const inputs = document.querySelectorAll(
                "._google_flight__container .flightCompareCheckbox"
            );

            var requested_websites = new Map();
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].checked) {
                    requested_websites.set(inputs[i].value, true);
                }
            }

            // check to see if the user selected any websites
            if (requested_websites.size != 0) {
                // get the user's flight data
                const flightDataPromise = getGoogleFlightsData();
                flightDataPromise.then((res) => {
                    if (res.error) {
                        // error occured, update frontend
                        console.log(res.error);
                        console.log(res.raw_error);
                        // Add error message
                        handleError(true);
                    } else {
                        // successfully retrived data, create URLs
                        const requested_website_urls = createURLs(
                            requested_websites,
                            res.data
                        );

                        // open the urls the user requested
                        requested_websites.forEach(function (isRequested, key) {
                            // console.log(key + " = " + isRequested);
                            if (isRequested) {
                                window.open(requested_website_urls.get(key));
                            }
                        });
                    }
                });
            }
        });

    // opens the google flights popup
    document
        .querySelector("._travel_helper__button")
        .addEventListener("click", function (event) {
            if (
                document.querySelector("._travel_helper__button").innerHTML ==
                "X"
            ) {
                document.querySelector(
                    "._google_flight__container"
                ).style.display = "none";

                // remove error message
                handleError(false);
            } else {
                document.querySelector(
                    "._google_flight__container"
                ).style.display = "block";
            }
        });
};

// BUG:
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
BOOKING.COM

cabin_seats = [ECONOMY, BUSINESS, FIRST, PREMIUM_ECONOMY]
trip_type = [ROUNDTRIP, MULTISTOP, ONEWAY]

airports = (starting airports (seperated by %7C)) - (end_airports (seperated by %7C))
    - starting airports value pasted also in front of &from=
    - ending airports for &to=

dates:
    roundtrip
        - &depart=
        - &return=
    one way
        - &depart=
    multi
        - &multiStopDates=


add:
    &sort=BEST
    &travelPurpose=leisure&aid=304142
    &label=gen173nr-1FCAEoggI46AdIM1gEaKQCiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKTrJWmBsACAdICJGMwMmE2MGE1LTI0YWMtNDUyOS04ZTFhLTcyYTM2MzQyNmM3NdgCBeACAQ
https://flights.booking.com/flights/JFK.AIRPORT%7CHND.AIRPORT%7CKIX.AIRPORT-HND.AIRPORT%7CKIX.AIRPORT%7CJFK.AIRPORT/?type=MULTISTOP&adults=2&cabinClass=BUSINESS&children=&from=JFK.AIRPORT%7CHND.AIRPORT%7CKIX.AIRPORT
&to=HND.AIRPORT%7CKIX.AIRPORT%7CJFK.AIRPORT
&multiStopDates=2023-09-17%7C2023-09-21%7C2023-09-25

https://flights.booking.com/flights/
JFK.AIRPORT-NRT.AIRPORT/
?type=ROUNDTRIP
&adults=2
&cabinClass=BUSINESS
&children=
&from=JFK.AIRPORT
&to=NRT.AIRPORT
&depart=2023-09-17
&return=2023-10-03

https://flights.booking.com/flights/
JFK.AIRPORT-NRT.AIRPORT/
?type=ONEWAY
&adults=2
&cabinClass=BUSINESS
&children=
&from=JFK.AIRPORT
&to=NRT.AIRPORT
&depart=2023-09-17

ROUND TRIP

https://flights.booking.com/flights/
JFK.AIRPORT-MIA.AIRPORT/
?type=ROUNDTRIP
&adults=1
&cabinClass=ECONOMY
&children=
&from=JFK.AIRPORT
&to=MIA.AIRPORT
&depart=2023-09-02
&return=2023-09-09
&sort=BEST
&travelPurpose=leisure
&aid=304142
&label=gen173nr-1FCAEoggI46AdIM1gEaKQCiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKTrJWmBsACAdICJGMwMmE2MGE1LTI0YWMtNDUyOS04ZTFhLTcyYTM2MzQyNmM3NdgCBeACAQ

MULTI WAY

https://flights.booking.com/flights/
JFK.AIRPORT%7CMIA.AIRPORT%7CAUS.AIRPORT-MIA.AIRPORT%7CAUS.AIRPORT%7CSAT.AIRPORT/
?type=MULTISTOP
&adults=1
&cabinClass=BUSINESS
&children=6%2C13%2C4
&from=JFK.AIRPORT%7CMIA.AIRPORT%7CAUS.AIRPORT
&to=MIA.AIRPORT%7CAUS.AIRPORT%7CSAT.AIRPORT
&multiStopDates=2023-09-02%7C2023-09-05%7C2023-09-07
&sort=BEST
&travelPurpose=leisure&aid=304142
&label=gen173nr-1FCAEoggI46AdIM1gEaKQCiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKTrJWmBsACAdICJGMwMmE2MGE1LTI0YWMtNDUyOS04ZTFhLTcyYTM2MzQyNmM3NdgCBeACAQ


ONE WAY

https://flights.booking.com/flights/
JFK.AIRPORT-MIA.AIRPORT/
?type=ONEWAY
&adults=2
&cabinClass=FIRST
&children=6%2C13
&from=JFK.AIRPORT
&to=MIA.AIRPORT
&depart=2023-09-02
&sort=BEST
&travelPurpose=leisure
&aid=304142
&label=gen173nr-1FCAEoggI46AdIM1gEaKQCiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKTrJWmBsACAdICJGMwMmE2MGE1LTI0YWMtNDUyOS04ZTFhLTcyYTM2MzQyNmM3NdgCBeACAQ
*/
