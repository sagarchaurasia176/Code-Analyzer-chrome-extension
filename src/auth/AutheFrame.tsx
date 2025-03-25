import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../context/ContextManager";
import toast from "react-hot-toast";

const FIREBASE_HOSTING_URL = process.env.FIREBASE_HOSTING_URL;
const API_BASE_URL = process.env.API_BASE_URL;
const CHROME_ID = process.env.CHROME_ID;

// Auth frame component
const AuthFrame: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { loading, setLoading, setUserResponse, userResponse } = useGlobalContext();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load user data from Chrome storage on mount
  useEffect(() => {
    chrome.storage.sync.get("analyzer", (result) => {
      if (result.analyzer) {
        try {
          setUserResponse(JSON.parse(result.analyzer));
        } catch (error) {
          console.error("Error parsing stored user data:", error);
        }
      }
    });
  }, [setUserResponse]);

  // Handle authentication messages
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      console.log("🚀 Event Received:", event);
      console.log("Raw data type:", typeof event.data);
      console.log("Raw data value:", event.data);
      
      // Validate origin
      const allowedOrigins = new Set([FIREBASE_HOSTING_URL, CHROME_ID]);
      if (!allowedOrigins.has(event.origin)) {
        console.warn("⛔ Blocked Message from:", event.origin);
        return;
      }
      
      try {
        // Enhanced data parsing with special handling for problematic format
        let data;
        
        if (typeof event.data === 'object') {
          // Already an object, no need to parse
          data = event.data;
        } else if (typeof event.data === 'string') {
          // Check for the problematic "!_" prefix
          if (event.data.startsWith('!_')) {
            console.warn("Received special format data, extracting content");
            try {
              // Skip the first 2 characters and try to parse the rest
              const cleanData = event.data.substring(2);
              data = JSON.parse(cleanData);
            } catch (parseError) {
              console.error("Failed to parse after removing prefix:", parseError);
              
              // Try to extract data between first { and last }
              const match = event.data.match(/\{.*?\}/);
              if (match) {
                try {
                  data = JSON.parse(match[0]);
                } catch (e) {
                  console.error("Extraction failed:", e);
                  throw new Error("Unable to parse message data");
                }
              } else {
                throw new Error("Invalid message format");
              }
            }
          } else {
            // Standard JSON string
            data = JSON.parse(event.data);
          }
        } else {
          throw new Error(`Unsupported data type: ${typeof event.data}`);
        }
        
        console.log("✅ Parsed Data:", data);
        
        const { idToken } = data;
        let toasts;
        if (!idToken) {
          toasts = toast.loading("Authenticating... Please wait.");
          return;
        }
        toast.dismiss(toasts);
        setLoading(true);
        
        // API call to login
        const response = await fetch(`${API_BASE_URL}/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          credentials: "include",
          body: JSON.stringify({ idToken }),
        });
        
        if (!response.ok) throw new Error(`Server error: ${response.statusText}`);
        
        const userData = await response.json();
        console.log("🔵 Server Response:", userData);
        
        if (userData.user?.email) {
          chrome.storage.sync.set({ analyzer: JSON.stringify(userData.user) });
          setUserResponse({ name: userData.user.name });
          toast.success("Login successful!");
        } else {
          throw new Error(userData.message || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        setErrorMessage(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [setLoading, setUserResponse]);
  
  // Initiate authentication
  const requestAuth = () => {
    setLoading(true);
    setErrorMessage(null);
    
    if (!iframeRef.current?.contentWindow) {
      setErrorMessage("Authentication frame not loaded.");
      setLoading(false);
      return;
    }
    
    iframeRef.current.contentWindow.postMessage({ initAuth: true }, FIREBASE_HOSTING_URL);
  };
  
  // Handle logout
  const logout = async () => {
    try {
      const loadToast = toast.loading("Logging out...| We'll miss you!");
      
      const response = await fetch(`${API_BASE_URL}/user/logout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      
      if (!response.ok) throw new Error(`Logout failed: ${response.statusText}`);
      
      chrome.storage.sync.remove("analyzer");
      setUserResponse(null);
      toast.dismiss(loadToast);
      toast.success("Logout successful!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-950 rounded-lg">
      {/* Hidden Authentication Frame */}
      <iframe
        ref={iframeRef}
        src={FIREBASE_HOSTING_URL}
        style={{ display: "none" }}
        title="Authentication Frame"
      />

      <p className="text-center mt-4 text-sm font-semibold text-slate-400">
        Unlock the full potential of our extension by authenticating with Google.
      </p>

      {userResponse ? (
        <>
          {/* Logout Button */}
          <button
            onClick={logout}
            className={`p-3 rounded-lg w-full cursor-pointer bg-green-400 text-zinc-900 font-bold shadow-md flex items-center justify-center mt-4 transition 
              ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-500"}`}
            disabled={loading}
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
          <p className="text-center mt-2 text-sm text-gray-400">
            Thank you for using Complexity Analyzer. See you again soon!
          </p>
        </>
      ) : (
        <>
          {/* Login Button */}
          <button
            onClick={requestAuth}
            className={`p-3 rounded-lg w-full cursor-pointer bg-gradient-to-r from-slate-900 via-slate-900 to-red-500 text-white font-bold shadow-md flex items-center justify-center mt-4 transition 
            ${loading ? "opacity-50 cursor-not-allowed" : "hover:to-red-600"}`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Get Started for Free"}
          </button>
        </>
      )}

      {/* Display Error Message */}
      {errorMessage && (
        <div className="mt-4 text-red-400 text-sm bg-red-900/20 p-2 rounded-md w-full text-center">
          {errorMessage}
        </div>
      )}

      {/* Display Logged-in User */}
      {userResponse?.name && (
        <div className="text-white text-sm mt-4 bg-blue-900/20 p-2 rounded-md w-full text-center">
          Logged in as: <span className="font-bold">{userResponse.name}</span>
        </div>
      )}
    </div>
  );
};

export default AuthFrame;