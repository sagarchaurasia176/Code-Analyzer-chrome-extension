// import React from 'react'
// import { createRoot } from 'react-dom/client'
// import Content from './components/content'
// import { GlobalContextFunction } from './context/ContextManager'
// import { Toaster } from 'react-hot-toast'
// // Create a container for your React app
// const container = document.createElement('div')
// container.id = 'LeetcodeContainer'
// document.body.append(container)

// // create Root of this files okay here we are creating the root of the react app
// createRoot(container).render(
//     <GlobalContextFunction>
//      <Toaster/>
//         <Content/>
//     </GlobalContextFunction>
// ) 

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import BotButton from "./components/BotButton";

const Content = () => {
  const [isDetect, setIsDetect] = useState(false);

  // Listen for Chrome Storage changes
  useEffect(() => {
    chrome.storage.local.get("isDetect", (result) => {
      if (result.isDetect !== undefined) {
        setIsDetect(result.isDetect);
      }
    });

    chrome.storage.onChanged.addListener((changes) => {
      if (changes.isDetect) {
        setIsDetect(changes.isDetect.newValue);
      }
    });

    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "TOGGLE_DETECT") {
        setIsDetect(message.payload);
      }
    });
  }, []);

  return isDetect ? (
      <BotButton />
  ) : null;
};

// Inject component into the webpage
const container = document.createElement("div");
document.body.appendChild(container);
ReactDOM.render(<Content />, container);
