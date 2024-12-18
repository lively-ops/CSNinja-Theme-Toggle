// Apply the saved theme to the active tab
function applyThemeToTab(tabId) {
    chrome.storage.local.get("theme", (data) => {
        const savedTheme = data.theme || "light"; // Default to light
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: setTheme,
            args: [savedTheme], // Pass the saved theme to the script
        });
    });
}

// Listen for messages from popup.js to apply the theme
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "applyTheme" && sender.tab) {
        applyThemeToTab(sender.tab.id);
    }
});

// Apply the theme when the tab is updated or reloaded
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "loading") {
        applyThemeToTab(tabId);
    }
});

// Apply the theme when the active tab is changed
chrome.tabs.onActivated.addListener((activeInfo) => {
    applyThemeToTab(activeInfo.tabId);
});

// Function to set the theme on the page
function setTheme(theme) {
    const body = document.querySelector("body");
    if (body) {
        body.setAttribute("data-bs-theme", theme);
    }
}