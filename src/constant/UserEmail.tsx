import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BiSolidLogInCircle } from "react-icons/bi";
import { MdCopyAll, MdRefresh } from "react-icons/md";
import { useGlobalContext } from "../context/ContextManager";

interface UserEmailProps {
  models: string;
  setModel: React.Dispatch<React.SetStateAction<string>>;
}

const UserEmail: React.FC<UserEmailProps> = ({ models, setModel }) => {

  const{toggleDetect , randomCode , isGenerated , setIsGenerated , setRandomCode} = useGlobalContext()
  // Load code from localStorage on initial render

  // Function to generate a random code (only if not already generated)
  const generateRandomCode = () => {
    if (!isGenerated) {
      const newCode = generateCode();
      setRandomCode(newCode);
      localStorage.setItem("accessCode", newCode);
      setIsGenerated(true);
      toast.success("Access code generated successfully!");
    }
  };
  // Helper function to generate an 8-character random alphanumeric code
  const generateCode = () =>
    Math.random().toString(36).substring(2, 10).toUpperCase();
    
  return (
    <div className="flex flex-col items-center">
      <div className="p-4 rounded-lg w-full text-center  bg-gray-950 shadow-md">
        {randomCode ? (
          <>
            <h2 className="text-xl font-bold mt-2 animate-pulse text-green-600">
              {randomCode}
            </h2>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(randomCode || "");
                toast.success("Access code copied to clipboard!");
              }}
              className="p-2 bg-blue-900 text-white rounded cursor-pointer mt-2 transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-110"
            >
              Copy Code
              <MdCopyAll className="inline-block ml-2" />
            </button>
          </>
        ) : (
          <p className="text-gray-500">
            No code generated yet. Click the button below to generate a code.
          </p>
        )}
      </div>
      <div className="mt-4 flex flex-col gap-2 w-full">
        {/* Generate Code Button */}
        <button
          type="button"
          onClick={generateRandomCode}
          className="p-4 bg-black text-white rounded cursor-pointer  flex items-center justify-center disabled:opacity-50"
          disabled={isGenerated} // Disable after first generation
        >
          <BiSolidLogInCircle className="mr-2" />
          {isGenerated ? "Code Generated" : "Click to Generate Code"}
        </button>

        {/* click to bot generate */}
        <button
          type="button"
          onClick={toggleDetect}
          className="p-4 bg-green-600 text-white rounded cursor-pointer flex items-center justify-center disabled:opacity-50"
        >
          <MdRefresh className="mr-2" />
          {isGenerated ? "Bot Generated" : "Click to Generate Bot"}
        </button>
      </div>
    </div>
  );
};

export default UserEmail;
