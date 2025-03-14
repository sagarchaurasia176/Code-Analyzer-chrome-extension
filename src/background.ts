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