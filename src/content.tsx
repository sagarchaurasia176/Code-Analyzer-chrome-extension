import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import BotButton from "./components/BotButton";
import {
  GlobalContextFunction,
} from "./context/ContextManager";

 
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
    <BotButton/>
  </GlobalContextFunction>
);
