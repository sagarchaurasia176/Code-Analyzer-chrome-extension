import React, { useEffect, useRef } from "react";
import { VscLoading } from "react-icons/vsc";
import {
  popupStyles,
  analysisBoxStyles,
  progressBarStyles,
  progressFillStyles,
  fadeScaleAnimation,
} from "../utils/ComplexityPopupBoxStyles"; // Ensure correct import

interface ComplexityPopupBoxProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  complexity: { time: string; space: string };
  progress: number;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

const ComplexityPopupBox: React.FC<ComplexityPopupBoxProps> = ({
  isOpen,
  setIsOpen, // We need this to close on outside click
  complexity,
  progress,
  loading,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div>
      <div
        ref={popupRef} // Attach ref to the popup
        style={{
          ...popupStyles,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {/* Title */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "16px",
            padding: "12px",
          }}
        >
          <h5
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              width: "100%",
            }}
          >
            <b>AI-Powered Code Analysis in Action!</b>
          </h5>
        </div>

        {/* Content */}
        <div style={analysisBoxStyles}>
          {loading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "32px",
                gap: "20px",
              }}
            >
              {/* Progress Bar */}
              <div style={progressBarStyles}>
                <div style={progressFillStyles(progress)} />
              </div>

              {/* Loading Spinner */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <VscLoading
                  style={{
                    color: "#6366F1",
                    fontSize: "24px",
                    animation: "spin 1s linear infinite",
                    filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))",
                  }}
                />
                <span
                  style={{
                    color: "#1F2937",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  Analyzing your code...
                </span>
              </div>
            </div>
          ) : (
            <span
              style={{
                ...fadeScaleAnimation,
                fontSize: "18px",
                lineHeight: "1.5",
                color: "#1F2937",
                display: "block",
                padding: "16px",
                background: "linear-gradient(to right, #ffffff, #f3f4f6)",
                borderRadius: "8px",
                border: "2px solid #d1d5db",
                boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <b
                style={{
                  display: "block",
                  marginBottom: "12px",
                  color: "#374151",
                  fontSize: "20px",
                }}
              >
                Time Complexity: {complexity.time}
              </b>
              <b
                style={{ display: "block", color: "#374151", fontSize: "20px" }}
              >
                Space Complexity: {complexity.space}
              </b>
            </span>
          )}
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes fadeScale {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default ComplexityPopupBox;
