import React from 'react'
import { VscRobot } from "react-icons/vsc";

const BotButton = () => {
  return (
    <div>
        {/* Button with bot icon */}
        <button 
      style={{
        position: "fixed",
        right: "20px", // Added right position
        top: "80%", // Center vertically
        backgroundColor: "black",
        color: "white",
        border: "none",
        display: "flex",
        justifyContent: "center", // Changed to center since button is positioned
        alignItems: "center",
        padding: "10px",
        borderRadius: "12px",
      }}
      > 
      <VscRobot style={{color:"white", fontSize:"30px"}}/>
      </button>
    </div>
  )
}

export default BotButton
