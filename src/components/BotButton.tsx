import React, { useState } from "react";
import { VscRobot } from "react-icons/vsc";
import DialogueBox from "./DialogueBox";
import { useGlobalContext } from "../context/ContextManager";
// Bot Button Component
const BotButton = () => {
  const[isOpen , setIsOpen]  = useState<boolean>(false);

  return (
    <div>
        {/* Bot Button (only enabled after pasting) */}
      <button

        style={{
          position: "fixed",
          right: "20px",
          bottom: "20px",
          marginTop:"254px",
          backgroundColor: isOpen ? "white" : "black",
          color: isOpen ? "black" : "white",
          border: isOpen ? "1px solid black" : "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "12px",
          borderRadius: "50%",
          transition: "all 0.3s ease",
        }}
      >
        <VscRobot
          style={{
            color: isOpen ? "black" : "white",
            fontSize: "30px",
            transform: isOpen ? "rotate(360deg)" : "rotate(0deg)",
            transition: "all 0.3s ease",
          }}
        />
      </button>

      {/* Popup Dialog (if needed) */}
      <DialogueBox isOpen={isOpen} setIsOpen={setIsOpen} />

      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          @keyframes slideIn {
            from { 
              opacity: 0;
              transform: translateY(20px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default BotButton;
