import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../context/ContextManager";
import toast from "react-hot-toast";

const FIREBASE_HOSTING_URL = (import.meta as any).env.FIREBASE_HOSTING_URL;
const API_BASE_URL = (import.meta as any).env.API_BASE_URL;
const CHROME_ID = (import.meta as any).env.CHROME_ID;

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
      
      // Validate origin
      const allowedOrigins = new Set([FIREBASE_HOSTING_URL, CHROME_ID]);
      if (!allowedOrigins.has(event.origin)) {
        console.warn("⛔ Blocked Message from:", event.origin);
        return;
      }
      
      try {
        // Parse event data properly
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        console.log("✅ Parsed Data:", data);
        
        const { idToken } = data;
        if (!idToken) throw new Error("Token missing from response");
        
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
      const loadToast = toast.loading("Logging out...|  We'll miss you!");
      
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