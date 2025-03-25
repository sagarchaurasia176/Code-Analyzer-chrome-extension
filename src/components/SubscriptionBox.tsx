import React from "react";
import { FaCrown } from "react-icons/fa";
import logo from '../../icons/codeAnalyzer.png'

interface SubscriptionPromptProps {
  onClose: () => void;
}

const SubscriptionPrompt: React.FC<SubscriptionPromptProps> = ({ onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "150px",
        right: "20px",
        width: "300px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        padding: "20px",
        zIndex: 1000,
        animation: "slideIn 0.3s ease-out",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        <h3 style={{ margin: 0, fontWeight: 600 }}>Upgrade Your Experience</h3>
        <button
          onClick={onClose}
          style={{
            color:"black",
            padding:"4px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "24px",
          borderRadius: "16px",
          padding: "16px",
          animation: "fadeIn 0.3s ease-out",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <h1 style={{ fontSize: "20px", fontWeight: "800", display: "flex", alignItems: "center", color: "#000" }}>
        Code
          </h1>
          <img src={logo} alt="Code Analyzer Logo" style={{ width: "24px", height: "24px" }} />
          <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#facc15" }}>Analyzer</h2>
        </div>
      </div>


{/* desc */}
      <p style={{ margin: "10px 0", color: "#555" }}>
        You've reached your free limit. Upgrade now to continue using our AI Bot.
      </p>
      
      <div style={{
        display: "flex",
        gap: "10px",
        marginTop: "15px"
      }}>
        <button
          onClick={() => window.open("https://analyzer.dev-saga.in/", "_blank")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            flex: 3,
            padding: "10px 15px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <FaCrown /> Subscribe Now
        </button>
        
        <button
          onClick={onClose}
          style={{
            flex: 1,
            padding: "10px",
            backgroundColor: "#f0f0f0",
            color: "#333",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          Later
        </button>
      </div>

      <style>
        {`
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default SubscriptionPrompt;