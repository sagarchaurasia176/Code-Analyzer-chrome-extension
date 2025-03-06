import React, { useState } from "react";
import GoogleAuth from "../auth/GoogleAuth";

// Popup - component.tsx
const Popup = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
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
      <div className="text-center flex flex-col p-3">
        <h2 className="text-md font-bold text-white mb-2">
          Authenticate with Google to use
        </h2>
        <h3 className="text-sm  text-green-500 font-semibold mb-4">
          Complexity Analyzer
        </h3>
        <p className="text-xs text-gray-400 mb-4">
          Your data is secure and will not be shared with third parties
        </p>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Popup;
