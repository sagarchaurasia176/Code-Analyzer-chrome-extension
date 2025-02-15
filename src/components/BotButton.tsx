import React, { useState, useEffect } from 'react'
import { VscRobot } from "react-icons/vsc";
import DialogueBox from './DialogueBox';
// GeminApi Detect logics 
import {SYSTEM_PROMPT} from '../constant/Prompts';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Bot Button Component

const BotButton = () => {
  const [GenAIKey, setGenAIKey] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Wait for window.ENV to be defined
    const checkEnv = () => {
    const Gemini = "AIzaSyA5rZAN7CU6LzTZPJuKi1ethXqWDKa30bM";     
    console.log("gemein api")
    console.log(Gemini)
    };
    checkEnv();
  }, []);
  
  // GeminApi prompt logics 
  const Fn = () => {
    setIsOpen(!isOpen);
  }

// Then return the button component
  return (
    <div>
      {/* Button with bot icon */}
      <button
        onClick={() => Fn()}
        style={{
          position: "fixed",
          right: "20px",
          top: "80%",
          backgroundColor: isOpen ? "white" : "black",
          color: isOpen ? "black" : "white",
          border: isOpen ? "1px solid black" : "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          borderRadius: "12px",
          transition: "all 0.3s ease",
          cursor: "pointer",
          animation: isOpen ? "bounce 0.5s" : "none",
          transform: isOpen ? "scale(1.1)" : "scale(1)"
        }}
      >
        <VscRobot style={{ 
          color: isOpen ? "black" : "white", 
          fontSize: "30px",
          transform: isOpen ? "rotate(360deg)" : "rotate(0deg)",
          transition: "all 0.3s ease"
        }} />
      </button>
      
    {/* Popup Dialog */}
      {isOpen && (
        // Dialogue Box Component
        <DialogueBox isOpen={isOpen} setIsOpen={setIsOpen}/>
      )}
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
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { 
              opacity: 0;
              transform: translateY(10px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  )
}

export default BotButton
