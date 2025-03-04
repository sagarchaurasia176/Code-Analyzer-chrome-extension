import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import BotButton from "./components/BotButton";
import {
  GlobalContextFunction,
  useGlobalContext,
} from "./context/ContextManager";

const Content = () => {
  const { isGenerated, setIsGenerated } = useGlobalContext();

  useEffect(() => {
    const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      if (changes.isDetect) {
        setIsGenerated(changes.isDetect.newValue);
      }
    };

    chrome.storage.local.get("isDetect", (result) => {
      setIsGenerated(result.isDetect ?? false);
    });

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  return isGenerated ? <BotButton /> : null;
};

// Inject Chrome Extension into the page
const CONTAINER_ID = "chrome-extension-root";
let container = document.getElementById(CONTAINER_ID);
if (!container) {
  container = document.createElement("div");
  container.id = CONTAINER_ID;
  document.body.appendChild(container);
}

const root = createRoot(container);
root.render(
  <GlobalContextFunction>
    <Content />
  </GlobalContextFunction>
);
