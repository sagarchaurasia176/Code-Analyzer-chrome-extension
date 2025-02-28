import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../context/ContextManager";

const FIREBASE_HOSTING_URL = "https://extension--auth-firebase.web.app";

const AuthIframe = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const{loading,user,setError,setLoading,setUser,error} = useGlobalContext();
    const requestAuth = () => {
      if (!iframeRef.current) return;
      setLoading(true);
      setError(null);
      iframeRef.current.contentWindow?.postMessage({ initAuth: true }, FIREBASE_HOSTING_URL);
    };
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
      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default AuthIframe;
