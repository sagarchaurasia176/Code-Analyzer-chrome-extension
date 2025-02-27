// Background script for the extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// // Listen for messages from content script
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === 'ANALYZE') {
//     // Handle analysis request
//     console.log('Analysis requested:', message.data);
//     sendResponse({ status: 'received' });
//   }
//   return true;
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "TOGGLE_DETECT") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, message);
      }
    });
  }
});



