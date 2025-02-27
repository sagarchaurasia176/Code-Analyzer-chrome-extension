import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useGlobalContext } from "../context/ContextManager"; // Importing the correct context hook

const GoogleSignup = () => {
  const { fn } = useGlobalContext(); // Assuming fn is the function for handling Google Sign-Up

  return (
    <div className="signupContainer">
      <div className="signupContainer__box__google">
        <button
          className="flex items-center gap-2 p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"
          onClick={fn} // Calling the function from context
        >
          Sign Up
          <span className="text-black-400">
            <FaArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
};

export default GoogleSignup;
