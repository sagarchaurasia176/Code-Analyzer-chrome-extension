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
        left: "50%",
        top: "50%",
        transform: isOpen ? "translate(-50%, -50%)" : "translate(-50%, -40%)",
        width: "500px",
        minHeight: "300px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "16px",
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        padding: "24px",
        zIndex: 1000,
        animation: "popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        opacity: isOpen ? 1 : 0,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        backdropFilter: "blur(8px)",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          background: "rgba(255, 255, 255, 0.1)",
          padding: "12px",
          borderRadius: "12px",
          backdropFilter: "blur(4px)",
        }}>
          <h5 style={{
            margin: 0,
            fontSize: "22px",
            fontWeight: "700",
            color: "#ffffff",
            textAlign: "center",
            padding: "4px 0",
            width: "100%"
          }}>
            <b>
              AI-Powered Code Analysis in Action!
            </b>
          </h5>
        </div>
        <div style={{
          maxHeight: "500px",
          overflowY: "auto",
          animation: "slideUpFade 0.6s ease-in",
          background: "rgba(255, 255, 255, 0.95)",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease"
        }}>
          {loading ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '30px',
              gap: '20px'
            }}>
              <div style={{
                width: '100%',
                height: '6px',
                background: 'rgba(226, 232, 240, 0.6)',
                borderRadius: '3px',
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #667eea, #764ba2)',
                  transition: 'width 0.5s ease-out',
                  borderRadius: '3px',
                  boxShadow: '0 0 10px rgba(102,126,234,0.5)'
                }} />
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <VscLoading className="spin-animation-glow"
                  style={{
                    color: '#667eea',
                    fontSize: '28px'
                  }}
                />
                <span style={{
                  color: '#2d3748',
                  fontSize: '18px',
                  fontFamily: 'system-ui',
                  fontWeight: '600'
                }}>
                  Analyzing your code...
                </span>
              </div>
            </div>
          ) : (
            <span style={{
              fontSize: "18px",
              lineHeight: "1.6",
              color: "#2d3748",
              display: "block",
              padding: "16px",
              background: "linear-gradient(135deg, #fff 0%, #f7fafc 100%)",
              borderRadius: "10px",
              border: "2px solid #e2e8f0",
              boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
              animation: "fadeScale 0.5s ease-out"
            }}>
              <b style={{
                display: "block",
                marginBottom: "12px",
                color: "#4a5568",
                fontSize: "20px"
              }}>Time Complexity: {complexity.time}</b>
              <b style={{
                display: "block",
                color: "#4a5568",
                fontSize: "20px"
              }}>Space Complexity: {complexity.space}</b>
            </span>
          )}
        </div>
      </div>
      <style>
        {`
            @keyframes popIn {
              0% {
                opacity: 0;
                transform: translate(-50%, -40%) scale(0.8);
              }
              100% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
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
            
            @keyframes slideUpFade {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes glow {
              from {
                text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #667eea;
              }
              to {
                text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #667eea;
              }
            }
            
            @keyframes fadeScale {
              from {
                opacity: 0;
                transform: scale(0.95);
              }
              to {
                opacity: 1;
                transform: scale(1);
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
            
            .spin-animation-glow {
              animation: spin 1s linear infinite;
              filter: drop-shadow(0 0 5px #667eea);
            }
            
            ::-webkit-scrollbar {
              width: 8px;
            }
            
            ::-webkit-scrollbar-track {
              background: rgba(255,255,255,0.1);
              border-radius: 4px;
            }
            
            ::-webkit-scrollbar-thumb {
              background: rgba(102,126,234,0.6);
              border-radius: 4px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
              background: rgba(102,126,234,0.8);
            }
          `}
      </style>
    </div>
  )
}

export default ComplexityPopupBox
