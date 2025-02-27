import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/ContextManager";

// Popup - component.tsx
const Popup = () => {
  const { fn, loader } = useGlobalContext(); // Fetch authentication function and loader state
  const [model, setModel] = useState("Gemini 1.5 Flash");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isDetect, setIsDetect] = useState<boolean>();

  useEffect(() => {
    chrome.storage.local.get("isDetect", (result) => {
      if (result.isDetect !== undefined) {
        setIsDetect(result.isDetect);
      }
    });
  }, []);

  const toggleDetect = () => {
    const newDetectState = !isDetect;
    setIsDetect(newDetectState);

    chrome.storage.local.set({ isDetect: newDetectState });
    chrome.runtime.sendMessage({
      type: "TOGGLE_DETECT",
      payload: newDetectState,
    });
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } w-96 p-6 rounded-lg shadow-lg border transition-all`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg border-b-2 font-bold">Complexity-Analyzer</h1>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="flex items-center gap-2 cursor-pointer text-sm"
        >
          <span>{isDarkMode ? "Dark" : "Light"} Mode</span>
          <div
            className={`w-10 h-5 rounded-full flex items-center p-1 transition-all ${
              isDarkMode ? "bg-orange-500" : "bg-gray-400"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transition-all ${
                isDarkMode ? "translate-x-5" : "translate-x-0"
              }`}
            ></div>
          </div>
        </button>
      </div>

      <div className="mb-4">
        <label htmlFor="model" className="block text-sm font-semibold mb-1">
          Select Model
        </label>
        <select
          id="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full p-2 rounded bg-gray-200 text-black border border-gray-300 outline-none"
        >
          <option>Gemini 1.5 Flash</option>
          <option>Chat-gpt</option>
          <option>Claude AI</option>
        </select>
      </div>

      <button
        className="w-full py-2 mt-2 rounded bg-red-500 cursor-pointer text-white font-bold hover:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={fn}
        disabled={loader} // Disable button when loading
      >
        {loader ? "Authenticating..." : "Authenticate"}
      </button>

      <button
        onClick={toggleDetect}
        className="w-full py-2 mt-2 rounded bg-blue-500 cursor-pointer text-white font-bold hover:opacity-90"
      >
        Try for Free
      </button>
    </div>
  );
};

export default Popup;
