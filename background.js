// chrome.runtime.onMessage.addListener((msg, sender, response) => {
//     if (msg.command == "fetch") {
//         domain = msg.data.domain;
//         // console.log("domain:", domain);
//         response({ type: "result", status: "success", data: {}, request: msg });
//     }

//     return true;
// });

// let tabIdWithPopup = null;

// chrome.tabs.onActivated.addListener(({ tabId }) => {
//     // Check if the tab with the popup is active
//     if (tabId === tabIdWithPopup) {
//         console.log("popup already exists");
//         // Send a message to the content script to hide the popup
//         chrome.tabs.sendMessage(tabId, { action: "hideGoogleFlightsPopout" });
//     }
// });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // console.log(tab.url);
    if (
        changeInfo.status === "complete" &&
        tab.url.includes("google.com/travel/flights")
    ) {
        // check to see if the tab is still present
        chrome.tabs.get(tabId, (tabInfo) => {
            if (chrome.runtime.lastError || !tabInfo) {
                // The tab is not available, so we shouldn't send a message
                return;
            }

            chrome.tabs.sendMessage(tabId, {
                action: "createGoogleFlightsPopout",
            });
            // tabIdWithPopup = tabId;
        });
    }
});
