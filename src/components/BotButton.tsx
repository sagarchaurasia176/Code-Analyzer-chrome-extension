import React, { useState } from 'react'
import { VscRobot } from "react-icons/vsc";

const BotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Button with bot icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
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
        <div style={{
          position: "fixed",
          right: "20px",
          bottom: "calc(20% + 60px)",
          width: "410px",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e2e8f0",
          padding: "16px",
          zIndex: 1000,
          animation: "slideIn 0.3s ease-out",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0)" : "translateY(20px)"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px"
          }}>
            <h5 style={{ 
              margin: 0, 
              fontSize: "18px", 
              fontWeight: "600", 
              color: "black", 
              borderBottom: "1px solid black",
              animation: "fadeIn 0.5s ease-in"
            }}>
              <b>
            {isOpen ? "AI-Powered Code Analysis in Action! 🤖" : "Tc_Analyzers"}

              </b>
            </h5>
            <hr />
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "20px",
                color: "#666",
                transition: "transform 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "rotate(90deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "rotate(0deg)";
              }}
            >
              ×
            </button>
          </div>
          <div style={{
            maxHeight: "400px",
            overflowY: "auto",
            animation: "fadeIn 0.5s ease-in"
          }}>
            {/* Add your chat or content here */}
            <span style={{ 
              fontSize: "16px", 
              lineHeight: "1.5", 
              color: "black",
              animation: "slideUp 0.5s ease-out"
            }}>
              {/*Time complexity analysis */}
              <b>Time Complexity :- </b><br />
              <b>Space Complexity :- </b>
            </span>
          </div>
        </div>
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
