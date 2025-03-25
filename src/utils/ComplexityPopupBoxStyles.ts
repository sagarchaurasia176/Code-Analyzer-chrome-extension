export const popupStyles: React.CSSProperties = {
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    minHeight: "300px",
    background: "linear-gradient(to right, #6366F1, #9333EA)",
    borderRadius: "16px",
    boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "24px",
    zIndex: 50,
    transition: "all 0.4s ease-in-out",
    backdropFilter: "blur(10px)",
  };
  
  export const analysisBoxStyles: React.CSSProperties = {
    maxHeight: "500px",
    overflowY: "auto",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease-in-out",
  };
  
  export const progressBarStyles: React.CSSProperties = {
    width: "100%",
    height: "6px",
    backgroundColor: "#d1d5db",
    borderRadius: "6px",
    overflow: "hidden",
    boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
  };
  
  export const progressFillStyles = (progress: number): React.CSSProperties => ({
    height: "100%",
    background: "linear-gradient(to right, #6366F1, #9333EA)",
    width: `${progress}%`,
    transition: "width 0.5s ease-out",
    borderRadius: "6px",
  });
  
  export const fadeScaleAnimation: React.CSSProperties = {
    animation: "fadeScale 0.3s ease-in-out",
    opacity: 1,
    transform: "scale(1)",
  };
  