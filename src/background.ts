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




// const CLIENT_ID = "606210864320-6tooichvh9jc208e87onp3i2g2uefbkk.apps.googleusercontent.com";
// const REDIRECT_URL = chrome.identity.getRedirectURL();
// // const AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&response_type=id_token&redirect_uri=${REDIRECT_URL}&scope=openid%20email%20profile&nonce=${Math.random()}`;
// const AUTH_URL = "https://extension--auth-firebase.web.app"

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "signIn") {
//     chrome.identity.launchWebAuthFlow(
//       {
//         url: AUTH_URL,
//         interactive: true, // Shows the Google popup
//       },
//       (responseUrl) => {
//         if (chrome.runtime.lastError) {
//           sendResponse({ error: chrome.runtime.lastError.message });
//         } else if (responseUrl) {
//           const idToken = new URL(responseUrl).hash.split("id_token=")[1].split("&")[0];

//           chrome.storage.local.set({ authToken: idToken }, () => {
//             sendResponse({ idToken });
//           });
//         } else {
//           sendResponse({ error: "No response from Google Auth" });
//         }
//       }
//     );
//     return true; // Keeps the message channel open for async response
//   } else if (message.action === "signOut") {
//     chrome.storage.local.remove("authToken", () => {
//       sendResponse({ success: true });
//     });
//     return true;
//   }
// });

