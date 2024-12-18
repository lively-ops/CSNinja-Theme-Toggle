// Observe DOM changes and apply the theme dynamically
function observeDOMChanges() {
    const observer = new MutationObserver(() => {
        chrome.storage.local.get("theme", (data) => {
            const savedTheme = data.theme || "light"; // Default to light
            const body = document.querySelector("body");
            if (body && body.getAttribute("data-bs-theme") !== savedTheme) {
                body.setAttribute("data-bs-theme", savedTheme);
            }
        });
    });

    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
}

// Apply the saved theme on page load and monitor changes
chrome.storage.local.get("theme", (data) => {
    const savedTheme = data.theme || "light"; // Default to light
    const body = document.querySelector("body");
    if (body) {
        body.setAttribute("data-bs-theme", savedTheme);
    }
    observeDOMChanges();
});