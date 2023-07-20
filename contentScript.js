// alert("contentscript.js");

chrome.runtime.sendMessage({ message: "messageSent" }, function (response) {
    // when teh compare button gets clicked, send messaged to the background.js
    // to start scraping the site for the data
    // background.js would return the data scraped
    console.log(response);
});

const init = function () {
    const popout = document.createElement("div");
    popout.className = "travelHelper-container";
    popout.innerHTML = "travelHelper";
    popout.src = chrome.runtime.getURL("modal.html");
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

    document.body.appendChild(popout);

    const compareButton = document.createElement("button");
    compareButton.className = "btn-compare";
    compareButton.innerHTML = "Compare";
    document.body.appendChild(compareButton);
};

init();
