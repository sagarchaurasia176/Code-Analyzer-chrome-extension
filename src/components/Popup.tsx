import React from "react";
import AutheFrame from "../auth/AutheFrame";
import codeLogo from "../icons/codeAnalyzer.png";

// Popup - component.tsx
const Popup = () => {
  return (
    <div className="bg-slate-900 text-black w-96 p-6 rounded-lg shadow-xl border transition-all duration-300 ease-in-out">
      {/* Header Section */}
      <div className="flex  justify-center  items-center mb-6 bg-gradient-to-r from-slate-900 to-slate-700 rounded-2xl p-4 shadow-lg animate-fade-in">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-extrabold flex items-center text-white">Code</h1>
          <img src={codeLogo} alt="Code Analyzer Logo" className="w-6 h-6" />
          <h2 className="text-xl font-extrabold text-yellow-400">Analyzer</h2>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="text-center mb-4 animate-fade-in">
        {/* <p className="text-zinc-400 text-sm">
          Instantly Analyze Your Code Complexity with Ease
        </p> */}
        <p className=" text-slate-600 text-sm mt-2 font-semibold">
          Boost your coding efficiency and optimize performance!
        </p>
      </div>

      {/* Authentication Frame */}
      <AutheFrame />

      {/* Footer Message */}
      <div className="mt-6 text-center text-xs text-zinc-500 animate-slide-up">
        Your privacy matters. We never store or share your code.
      </div>
    </div>
  );
};

export default Popup;
