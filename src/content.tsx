import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import BotButton from "./components/BotButton";
import '../App.css'

// Create container for the Chrome extension
const container = document.createElement("div");
container.id = "chrome-extension-root";
document.body.appendChild(container);

const App = () => {
  const [userResponse, setUserResponse] = useState(false);

  // Manually manage userResponse state
  const checkUserStatus = () => {
    if (chrome?.storage.sync) {
      chrome.storage.sync.get("analyzer", (result) => {
        console.log("Fetched user status:", result.analyzer);
        setUserResponse(!!result.analyzer);
      });
      chrome.storage.sync.onChanged.addListener((changes) => {
        if (changes.analyzer) {
          setUserResponse(!!changes.analyzer.newValue);
        }
      });
    } else {
      console.warn("chrome.storage is not available.");
    }
  };
  useEffect(() => {
    checkUserStatus();
    return () => {
      chrome?.storage?.sync?.onChanged.removeListener(checkUserStatus);
    };
  }, []);

  return userResponse ? (<BotButton /> ):"";
};

const root = createRoot(container);
root.render(<App />);
