import React from "react";
import BotButton from "./BotButton";
import { useGlobalContext } from "../context/ContextManager";

// main content component Which injects the bot button
const Content = () => {
  const { isDetect, setDetect } = useGlobalContext();

  return (
    <div>
      
      {/* Show BotButton only when "Try for Free" is clicked */}
      {isDetect &&
       <BotButton />}
    </div>  
  );
};

export default Content;

// "content_security_policy": {
//   "extension_pages": "script-src 'self' 'wasm-unsafe-eval' 'sha256-yt+SNVxRkIi6H6yb7ndFuZM1esMX9esg3UpRHaTsyVk=' http://localhost:* http://127.0.0.1:*; object-src 'self'; connect-src 'self' https://*.googleapis.com"
// }
