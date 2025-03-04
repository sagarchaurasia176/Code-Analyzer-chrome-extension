import React, { useState } from "react";
import { VscRobot } from "react-icons/vsc";
import DialogueBox from "./DialogueBox";
import { useGlobalContext } from "../context/ContextManager";
// Bot Button Component
const BotButton = () => {
  const [isCodePasted, setIsCodePasted] = useState(false);
  const [userCode, setUserCode] = useState("");
  const { isGenerated, setIsGenerated} = useGlobalContext();
  const[isOpen , setIsOpen]  = useState<boolean>(false);

  // Toglge bot 
  const toggleBot = () => {
    if (isCodePasted) {
      setIsOpen(!isOpen);
    }
  };

  // Handle user pasting the code (only once)
  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (!isCodePasted) {
      const pastedText = event.clipboardData.getData("text");
      setUserCode(pastedText);
      setIsCodePasted(true);
    }
  };

  return (
    <div>
 {!isCodePasted && (
  <div className="fixed inset-0 flex items-center justify-center bg-black text-black bg-opacity-50 z-50">

    {/* Pending task  */}
    <textarea
      placeholder="Paste your code here..."
      onPaste={handlePaste}
      className="w-[200px] h-[150vh] p-3 border-2 border-black rounded-lg text-lg text-black bg-white outline-none shadow-lg"
    />
  </div>
)}


        {/* Bot Button (only enabled after pasting) */}
      <button
        onClick={toggleBot}
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
      {isGenerated && <DialogueBox isOpen={isOpen} setIsOpen={setIsOpen} />}

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
