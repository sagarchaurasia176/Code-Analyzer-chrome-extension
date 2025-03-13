import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../context/ContextManager";
import toast from "react-hot-toast";

const FIREBASE_HOSTING_URL = "https://code-analyzer-login-auth.vercel.app";
const API_BASE_URL = "http://localhost:2000"; // Extract this to an environment variable

const AutheFrame = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { loading, setError, setLoading, error, userResponse, setUserResponse } = useGlobalContext();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Request authentication 
  const requestAuth = () => {
    setLoading(true);
    setErrorMessage(null);
    if (!iframeRef.current?.contentWindow) {
      setErrorMessage("Authentication frame not loaded");
      setLoading(false);
      return;
    }
    iframeRef.current.contentWindow.postMessage(
      { initAuth: true },
      FIREBASE_HOSTING_URL
    );
  };

  useEffect(() => {
       chrome.storage.sync.get("analyzer", (result) => {
      const savedUser = result.analyzer;
      if (savedUser) setUserResponse(JSON.parse(savedUser));
      console.log("saved user is :",savedUser);
    });
  }, [setUserResponse]);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      const allowedOrigins = [FIREBASE_HOSTING_URL, "chrome-extension://fmjgimepnoffjjongiedkgbanfnhobkk"];
      if (!allowedOrigins.includes(event.origin)) {
        console.warn("Blocked message from:", event.origin);
        return;
      }
      const { idToken } = JSON.parse(event.data);
      if (!idToken) {
        console.error("token not received:", idToken);
        setErrorMessage(idToken);
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_BASE_URL}/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`
          },
          credentials: "same-origin",
          body: JSON.stringify({ idToken })
        });
        if (!response.ok) {
          console.error("Server Error:", response.status, response.statusText);
          setErrorMessage(`Server error: ${response.statusText}`);
          setLoading(false);
          return;
        } 
        const FinalResponseData = await response.json();

        if (!FinalResponseData || typeof FinalResponseData !== "object") {
          console.error("Invalid response format:", FinalResponseData);
          setErrorMessage("Unexpected server response");
          setLoading(false);
          return;
        }
        const { message, user: userData } = FinalResponseData;
        if (userData?.email) {
              chrome.storage.sync.set({ analyzer: JSON.stringify(userData) }); 
          setUserResponse({ name: userData.name });
          toast.success("Login successful!");
        }
        else {
          throw new Error(message || "Login failed");
        }
      

      } catch (error) {
        console.error("Login error:", error);
        setError("error");
      } finally {
        setLoading(false);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [setUserResponse, setLoading, setError]);

  const logout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({})
      });

      if (!response.ok) {
        throw new Error(`Logout failed: ${response.status} ${response.statusText}`);
      }

      chrome.storage.sync.remove("analyzer");
      setUserResponse(null);
      toast.success("Logout successful!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed: CORS or server issue");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-zinc-800 rounded-lg shadow-lg">
      <iframe
        ref={iframeRef}
        src={FIREBASE_HOSTING_URL}
        style={{ display: "none" }}
        title="Authentication Frame"
      />
      <p className="text-center mt-2 text-sm text-gray-400"></p>
      <p className="text-center mt-4 text-sm font-semibold text-white">
        Authenticate with Google to use
        <span className="block text-xl font-bold text-blue-500">
          Complexity Analyzer
        </span>
      </p>
      <p className="text-center mt-2 text-sm text-gray-400">
        Your data is secure and will not be shared with third parties.
      </p>

    {
      userResponse ? (<>
      
      <button
        onClick={logout}
        className={`p-3 rounded-lg w-full cursor-pointer bg-green-400 text-zinc-900 font-bold shadow-md flex items-center justify-center mt-4 transition 
        ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-500"}`}
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center">
        <span className="mr-2">You Logging Out... Come Back Soon! 😢</span>
        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-zinc-900"></div>
          </span>
        ) : (
          <span className="flex cursor-pointer items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        Logout
          </span>
        )}
      </button>
      <p className="text-center mt-2 text-sm text-gray-400">
        Thank you for using Complexity Analyzer. We hope to see you again soon!
      </p>
      </> ) : (<>
      
        <button
        onClick={requestAuth}
        className={`p-3 rounded-lg w-full cursor-pointer bg-blue-500 text-white font-bold shadow-md flex items-center justify-center mt-4 transition 
        ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={loading}
            >
        {loading ? (
          <span className="flex items-center">
            <span className="mr-2">Processing...</span>
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
          </span>
        ) : (
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            Try For Free
          </span>
        )}
            </button> 
      </>)
    }
      {errorMessage && (
        <div className="mt-4 text-red-400 text-sm bg-red-900/20 p-2 rounded-md w-full text-center">
          {errorMessage}
        </div>
      )}

      {userResponse?.name && (
        <div className="text-white text-sm mt-4 bg-blue-900/20 p-2 rounded-md w-full text-center">
          Logged in as: <span className="font-bold text-white text-xs">{userResponse.name}</span>
        </div>
      )}

    </div>
  );
};

export default AutheFrame;
