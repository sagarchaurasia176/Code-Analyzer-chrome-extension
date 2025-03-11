import React, { useRef, useState } from "react";
import { useGlobalContext } from "../context/ContextManager";
import toast from "react-hot-toast";

const FIREBASE_HOSTING_URL = "https://code-analyzer-login-auth.vercel.app";
const API_BASE_URL = "http://localhost:9000"; // Extract this to an environment variable

const AutheFrame = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { loading, setError, setLoading, error } =
    useGlobalContext();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string } | null>(null);
  //Request authentication !
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
  // ✅Send the response to the backend
  React.useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      const allowedOrigins = [FIREBASE_HOSTING_URL, "chrome-extension://fmjgimepnoffjjongiedkgbanfnhobkk"];

      if (!allowedOrigins.includes(event.origin)) {
        console.warn("Blocked message from:", event.origin);
        return;
      }
      const { idToken } = JSON.parse(event.data); // Ensure it's parsed correctly

      if (!idToken) {
        console.error("token not received :", idToken);
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
          body: JSON.stringify({ idToken }) // Send as a plain object, NOT inside "data"
        });
        if (!response.ok) {
          console.error("Server Error:", response.status, response.statusText);
          setErrorMessage(`Server error: ${response.statusText}`);
          setLoading(false);
          return;
        }
        const FinalResponseData = await response.json();
        console.log("Backend response:", FinalResponseData);

        if (!FinalResponseData || typeof FinalResponseData !== "object") {
          console.error("Invalid response format:", FinalResponseData);
          setErrorMessage("Unexpected server response");  // 🔴 This causes the UI error
          setLoading(false);
          return;
        }
        const { message , user: userData } = FinalResponseData;
        if (userData?.email) {
          console.log("Login successful:", userData);
          setUser({ name: userData.name });
          toast.success("Login successful!");
        } else {
          throw new Error(message || "Login failed");
        }




      } catch (error) {
        console.error("Login error:", error);
        setError("error"); // For your global state
      } finally {
        setLoading(false);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [setUser , setLoading , setError]);



  //   const demo = async()=>{
  //     const resp = await fetch(`${API_BASE_URL}/dummy` , {
  //       method:"POST",
  //       headers:{
  //            "Content-Type":"application/json"
  //       },
  //       body:JSON.stringify({message:"test"})
  //     })

  //     const data = await resp.json(); // ✅ Extract JSON data
  //     console.log("Backend Response:",data); // ✅ Now it will show the message
  // }



  return (
    <div className="flex flex-col items-center justify-center p-6 bg-zinc-800 rounded-lg shadow-lg">
      <iframe
        ref={iframeRef}
        src={FIREBASE_HOSTING_URL}
        style={{ display: "none" }}
        title="Authentication Frame"
      />

      <p className="text-center mt-4 text-sm font-semibold text-white">
        Authenticate with Google to use
        <span className="block text-xl font-bold text-blue-500">
          Complexity Analyzer
        </span>
      </p>
      <p className="text-center mt-2 text-sm text-gray-400">
        Your data is secure and will not be shared with third parties.
      </p>

      <button
        onClick={requestAuth}
        className={`p-3 rounded-lg w-full cursor-pointer bg-green-400 text-zinc-900 font-bold shadow-md flex items-center justify-center mt-4 transition 
        ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-500"}`}
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center">
            <span className="mr-2">Processing...</span>
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-zinc-900"></div>
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
            Login with Google
          </span>
        )}
      </button>

      {errorMessage && (
        <div className="mt-4 text-red-400 text-sm bg-red-900/20 p-2 rounded-md w-full text-center">
          {errorMessage}
        </div>
      )}

      {user?.name && (
        <div className="text-white text-sm mt-4 bg-blue-900/20 p-2 rounded-md w-full text-center">
          Logged in as: <span className="font-bold text-white text-xs">{user.name}</span>
        </div>
      )}

      <button className="p-3 rounded-lg w-full cursor-pointer bg-blue-400 text-zinc-900 font-bold shadow-md flex items-center justify-center mt-4 transition hover:bg-blue-500">
        Try for Free
      </button>
    </div>
  );
};

export default AutheFrame;
