// function reddenPage() {
//     document.body.style.backgroundColor = "red";
// }

// -------------------

// function runThisFunction() {
//     console.log("running the function in background.js");
// }

// function googleMessage() {
//     chrome.runtime.onMessage.addListener(
//         // this is the message listener
//         // scrapes the page for the data and sends it to the
//         /// the content script to open the new tabs
//         function (request, sender, sendResponse) {
//             if (request.message === "messageSent") runThisFunction();
//         }
//     );
// }

// chrome.action.onClicked.addListener((tab) => {
//     console.log("here");
//     console.log(tab.id, tab.url);

// if (tab.url.includes("google")) {
//     console.log("google");

//     // googleMessage();

//     // chrome.scripting.executeScript({
//     //     target: { tabId: tab.id },
//     //     function: reddenPage,
//     // });

//     chrome.runtime.onMessage.addListener(
//         // this is the message listener
//         // scrapes the page for the data and sends it to the
//         /// the content script to open the new tabs
//         function (request, sender, sendResponse) {
//             if (request.message === "messageSent") runThisFunction();
//         }
//     );
// }
//     console.log("----");
// });

// -------------------

// document.querySelector(".openModal").addEventListener("click", function () {
//     console.log("here");
//     // chrome.tabs.query({ currentwindow: true, active: true }, function (tabs) {
//     //     var activeTab = tabs[0];
//     //     chrome.tabs.sendMessage(activeTab.id, { command: "openModal" });
//     // });
// });

const google_flights_url = "google.com/travel/flights";

chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if (msg.command == "fetch") {
        domain = msg.data.domain;
        console.log("domain:", domain);
        response({ type: "result", status: "success", data: {}, request: msg });
    }

    return true;
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // read changeInfo data and do something with it
    // like send the new url to contentscripts.js
    if (changeInfo.url) {
        chrome.tabs.sendMessage(tabId, {
            message: "hello!",
            url: changeInfo.url,
        });
    }
});
