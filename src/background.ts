chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension Installed");
});
// Listen for messages from content script for analysis
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'ANALYZE') {
    // Handle analysis request
    console.log('Analysis requested:', message.data);
    sendResponse({ status: 'received' });
  }
  return true;
});
// Listen for messages to toggle detection
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === "TOGGLE_DETECT") {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       if (tabs[0]?.id) {
//         chrome.tabs.sendMessage(tabs[0].id, message);
//       }
//     });
//   }
// });


// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === "submitDetect") {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       if (tabs[0]?.id) {
//         chrome.tabs.sendMessage(tabs[0].id, message);
//       }
//     });
//   }
// });



// ❌error at toogle side , box not fetched



