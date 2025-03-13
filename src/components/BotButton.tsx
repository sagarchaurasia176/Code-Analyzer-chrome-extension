import React, { useState, useEffect } from "react";
import { VscRobot } from "react-icons/vsc";
import DialogueBox from "./DialogueBox";

const BotButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  const BotHandler = () => setIsOpen(!isOpen);

  // Handle screen resize for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {/* Bot Button */}
        <button
          onClick={BotHandler}
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: isMobile ? "50px" : "60px",
            height: isMobile ? "50px" : "60px",
            backgroundColor: isOpen ? "#fff" : "#000",
            color: isOpen ? "#000" : "#fff",
            border: isOpen ? "1px solid #000" : "none",
            borderRadius: "50%",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            zIndex: 999,
            transition: "all 0.4s ease",
            animation: isOpen ? "bounce 0.5s" : "none",
          }}
          aria-label={isOpen ? "Close Chatbot" : "Open Chatbot"}
        >
          <VscRobot
            style={{
              fontSize: isMobile ? "28px" : "36px",
              transform: isOpen ? "rotate(360deg)" : "rotate(0deg)",
              transition: "transform 0.4s ease",
            }}
          />
        </button>

      {/* Dialogue Box */}
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
              transform: translateY(30px);
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