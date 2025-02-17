import React from 'react'
import { VscLoading } from 'react-icons/vsc';

interface ComplexityPopupBoxProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  complexity: {
    time: string;
    space: string;
  };
  progress: number;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

const ComplexityPopupBox: React.FC<ComplexityPopupBoxProps> = ({ isOpen, setIsOpen, complexity, progress, loading, setLoading, setProgress }) => {
  return (
    <div>
       <div style={{
        position: "fixed",
        right: "20px",
        bottom: "calc(20% + 60px)",
        width: "390px",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)",
        borderRadius: "12px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        padding: "16px",
        zIndex: 1000,
        animation: "slideIn 0.3s ease-out",
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        backdropFilter: "blur(4px)",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
          background: "linear-gradient(90deg, #f3f4f6 0%, #fff 100%)",
          padding: "8px",
          borderRadius: "8px",
        }}>
          <h5 style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: "600",
            color: "#2d3748",
            textAlign: "center",
            borderBottom: "2px solid #4a5568",
            animation: "fadeIn 0.5s ease-in",
            background: "linear-gradient(45deg, #2d3748, #4a5568)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            padding: "4px 0"
          }}>
            <b>
              AI-Powered Code Analysis in Action!
            </b>
          </h5>
        </div>
        <div style={{
          maxHeight: "400px",
          overflowY: "auto",
          animation: "fadeIn 0.5s ease-in",
          background: "rgba(255, 255, 255, 0.9)",
          padding: "12px",
          borderRadius: "8px",
          boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)"
        }}>
          {loading ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              gap: '15px'
            }}>
              <div style={{
                width: '100%',
                height: '4px',
                background: '#e2e8f0',
                borderRadius: '2px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #3b82f6, #2563eb)',
                  transition: 'width 0.5s ease-out',
                  borderRadius: '2px'
                }} />
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <VscLoading className="spin-animation"
                  style={{
                    color: '#3b82f6',
                    fontSize: '24px'
                  }}
                />
                <span style={{
                  color: '#1f2937',
                  fontSize: '16px',
                  fontFamily: 'system-ui',
                  fontWeight: '500'
                }}>
                  Analyzing your code...
                </span>
              </div>
            </div>
          ) : (
            <span style={{
              fontSize: "16px",
              lineHeight: "1.5",
              color: "#2d3748",
              display: "block",
              padding: "8px",
              background: "linear-gradient(135deg, #fff 0%, #f7fafc 100%)",
              borderRadius: "6px",
              border: "1px solid #e2e8f0"
            }}>
              <b style={{
                display: "block",
                marginBottom: "8px",
                color: "#2d3748",
              }}>Time Complexity: {complexity.time}</b>
              <b style={{
                display: "block",
                color: "#2d3748"
              }}>Space Complexity: {complexity.space}</b>
            </span>
          )}
        </div>
      </div>
      <style>
        {`
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateY(40px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes pulse {
              0% {
                opacity: 1;
              }
              50% {
                opacity: 0.7;
              }
              100% {
                opacity: 1;
              }
            }
            
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
            
            .spin-animation {
              animation: spin 1s linear infinite;
            }
          `}
      </style>
    </div>
  )
}

export default ComplexityPopupBox
