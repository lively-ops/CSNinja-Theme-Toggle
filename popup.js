document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggle");

    // Fetch the current theme from storage and set the button text
    chrome.storage.local.get("theme", (data) => {
        const savedTheme = data.theme || "light";
        toggleButton.textContent = savedTheme === "dark" ? "Switch Admin to Light Mode" : "Switch Admin to Dark Mode";
    });

    // Add click listener to toggle theme
    toggleButton.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];

            // Get the current theme from storage
            chrome.storage.local.get("theme", (data) => {
                const currentTheme = data.theme || "light";
                const newTheme = currentTheme === "dark" ? "light" : "dark";

                // Save the new theme
                chrome.storage.local.set({ theme: newTheme });

                // Apply the theme immediately in the current tab
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: setTheme,
                    args: [newTheme]
                });

                // Update the button text
                toggleButton.textContent = newTheme === "dark" ? "Switch Admin to Light Mode" : "Switch Admin to Dark Mode";
            });
        });
    });
});

// Function to set the theme on the page
function setTheme(newTheme) {
    const body = document.querySelector("body");
    if (body) {
        body.setAttribute("data-bs-theme", newTheme);
    }
}