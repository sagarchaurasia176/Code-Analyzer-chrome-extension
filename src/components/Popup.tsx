import React, { useEffect, useState } from "react";
import AuthIframe from "../config/AuthFrame";
import { useGlobalContext } from "../context/ContextManager";
import SelectMode from "../constant/SelectMode";
// import UsernamePropsPassed from "../config/UsernamePropsPassed";

// Popup - component.tsx
const Popup = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isDetect, setIsDetect] = useState<boolean>();
  const{user} = useGlobalContext();


  useEffect(() => {
    chrome.storage.local.get("isDetect", (result) => {
      if (result.isDetect !== undefined) {
        setIsDetect(result.isDetect);
      }
    });
  }, []);

  // Toggle Detection apply here
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
      <span className=" flex justify-center text-center text-zinc-400 text-sm">
        Instantly Analyze Your Code Complexity
        </span>
        <br />
      {/* put the authentication here */}
      <span className={`text-center flex justify-center font-bold ${isDarkMode ? "text-white" : "text-black"}`} >
        {`Hello, ${user?.name}` || "Hey kindly login in"}
      </span>      
      {/* Select Mode.tsx */}
      <SelectMode/>
      {/* AuthIframe */}
      <AuthIframe />
      <div className="flex items-center justify-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-500">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <button
        onClick={toggleDetect}
        className="p-2 rounded-lg w-full cursor-pointer bg-amber-400 text-black font-bold shadow-md flex items-center justify-center mt-4"
      >
        Try for Free
      </button>
    </div>
  );
};

export default Popup;
