chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension Installed");
});
// Listen for messages from content script for analysis
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'ANALYZE') {
    // Handle analysis request
    console.log('Analysis requested:', message.data);
    sendResponse({ status: 'received' });
  }
  return true;
}); 
// Simulate user login
chrome.storage.local.set({ analyzer: true });
// Simulate user logout
chrome.storage.local.remove("analyzer");


//LIMIT logic 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchBotLimit") {
    const { uid } = request;
  
    fetch("https://code-analyzer-chrome-extension.onrender.com/bot/limit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid })
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(`Server responded with ${response.status}: ${text}`);
        });
      }
      return response.json();
    })
    .then(data => {
      console.log("Background script received data:", data);
      sendResponse({ success: true, data });
    })
    .catch(error => {
      console.error("Background script fetch error:", error);
      sendResponse({ success: false, error: error.message });
    });
    
    return true; // Required to use sendResponse asynchronously
  }
});