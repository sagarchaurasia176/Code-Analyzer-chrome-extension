import React, { useRef } from "react";
import { useGlobalContext } from "../context/ContextManager";
import toast from "react-hot-toast";

const FIREBASE_HOSTING_URL = "https://chrome-firebase.vercel.app";
// const BACKEND_API_URL = "http://localhost:5080/user/auth/login"; // Replace with your backend URL

const AutheFrame = () => {


  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { loading, setError, setLoading, error ,user,setUser} = useGlobalContext();
  const requestAuth = () => {
    setLoading(true);
    if (!iframeRef.current) return;
    iframeRef.current.contentWindow?.postMessage({ initAuth: true }, FIREBASE_HOSTING_URL);
  };

  // Listen for messages from the authentication popup
  React.useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== FIREBASE_HOSTING_URL) return; // Ensure it's from your trusted source
      const { idToken } = event.data;

      try {
        const response = await fetch("http://localhost:5080/user/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        });

        const data = await response.json();
        console.log("after backend response we get it!")
        console.log(data)
        
        setUser(data);
        if (!response.ok) throw new Error(data.message || "Authentication failed");

        // Store user session, token, or update global state as needed
        } catch (error) {
          console.log("backend error")
        } finally {
        setLoading(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hidden Iframe for Authentication */}
      <iframe ref={iframeRef} src={FIREBASE_HOSTING_URL} style={{ display: "none" }} />
      
      <p className="text-center mt-4 text-sm font-semibold">
      Authenticate with Google to use 
      <span className="block text-xl font-bold text-blue-500">Complexity Analyzer</span>
      </p>
      <p className="text-center mt-2 text-sm text-gray-600">
      Your data is secure and will not be shared with third parties.
      </p>

      {/* Login Button */}
      <button
      onClick={requestAuth}
      className={`p-2 rounded-lg w-full cursor-pointer bg-green-400 text-zinc-900 font-bold shadow-md flex items-center justify-center mt-4 transition 
      ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-500"}`}
      disabled={loading}
      >
      {loading ? "Processing..." : "Login with Google"}
      </button>

      {/* Loader */}
      {loading && (
      <div className="mt-4">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
      </div>
      )}
      {/* User Email */}
      {user && <p className="text-white text-sm mt-2">Logged in as: {user.email}</p>}
    </div>
  );
};

export default AutheFrame;


// Issues - from frontend request not goes to backend 
// but from the backend the data stored into the db