chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
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
        });
    }
});
