import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
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
const root = createRoot(container);
root.render(<Content />);
