import React from 'react';

const DialogueBox = ({isOpen, setIsOpen}:{isOpen:boolean, setIsOpen:React.Dispatch<React.SetStateAction<boolean>>}) => {

  return (
    <div>
        <div style={{
          position: "fixed",
          right: "20px",
          bottom: "calc(20% + 60px)",
          width: "390px",
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
              textAlign: "center",
              borderBottom: "1px solid black",
              animation: "fadeIn 0.5s ease-in"
            }}>
              <b>
            {isOpen ? "AI-Powered Code Analysis in Action! 🤖" : "Tc_Analyzers"}

              </b>
            </h5>
            <hr />
          
          </div>
          <div style={{
            maxHeight: "400px",
            overflowY: "auto",
            animation: "fadeIn 0.5s ease-in"
          }}>
            {/* Chat or content here */}
            {/* Add your chat or content here */}
            <span style={{ 
              fontSize: "16px", 
              lineHeight: "1.5", 
              color: "black",
              animation: "slideUp 0.5s ease-out"
            }}>
              {/*Time complexity analysis */}
              <b>Time Complexity :- O(N)</b><br />
              <b>Space Complexity :- O(1)</b>
            </span>
          </div>
        </div>
    </div>
  )
}

export default DialogueBox
