import React, { useState, useEffect } from "react";
import { VscRobot } from "react-icons/vsc";
import DialogueBox from "./DialogueBox";
import SubscriptionPrompt from "./SubscriptionBox";


const BotButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState<boolean>(false);

  // Handle screen resize for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Retrieve UID from Chrome storage
  const getUserUid = (): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get("analyzer", (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result.analyzer || null);
        }
      });
    });
  };

  // Handles the chatbot click event
  const BotHandler = async () => {
    try {
      // Step 1: Get UID
      const user = await getUserUid();
      if (!user) {
        alert("User ID not found. Please log in.");
        return;
      }
      const { uid } = JSON.parse(user);
      chrome.runtime.sendMessage(
        { 
          action: "fetchBotLimit", 
          uid 
        },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error("Chrome runtime error:", chrome.runtime.lastError);
            alert("Extension error. Please try again.");
            return;
          }
          if (!response.success) {
            console.error("Request failed:", response.error);
            setShowSubscriptionPrompt(true);
            return;
          }
          const data = response.data;
          // Step 3: Check limit and toggle bot
          if (data.userLimit.clickCount >= data.userLimit.LimitOfBot) {
            setShowSubscriptionPrompt(true);
          } else {
            setIsOpen(!isOpen);
          }
        }
      );
    } catch (error) {
      console.error("❌ Error in BotHandler:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

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

      {/* Subscription Prompt */}
      {showSubscriptionPrompt && (
        <SubscriptionPrompt onClose={() => setShowSubscriptionPrompt(false)} />
      )}

      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
        `}
      </style>
    </div>
  );
};

export default BotButton;