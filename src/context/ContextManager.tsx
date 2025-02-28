import { createContext, useState, ReactNode, useContext, useRef, useEffect } from "react";

// Create Context - provider
export const ContextAPI = createContext<{
  isDetect: boolean;
  setDetect: React.Dispatch<React.SetStateAction<boolean>>;
  user: { name: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ name: string } | null>>;
  loading: boolean;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
} | undefined>(undefined);

const FIREBASE_HOSTING_URL = "https://extension--auth-firebase.web.app";

// Provider Component
export const GlobalContextFunction = ({ children }: { children: ReactNode }) => {
  const [isDetect, setDetect] = useState(true);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect logic for authentication handling
  useEffect(() => {
    const handleIframeMessage = (event: MessageEvent) => {
      try {
        if (event.origin !== FIREBASE_HOSTING_URL) return;

        const parsedData = JSON.parse(event.data);
        console.log("Auth Response:", parsedData);

        if (parsedData?.user?.displayName) {
          setUser({ name: parsedData.user.displayName });
          setError(null); // Clear errors if login is successful
        } else {
          throw new Error("Invalid user data received");
        }
      } catch (e) {
        console.error("Error parsing iframe message:", e);
        // setError("Authentication failed. P");
      } finally {
        setLoading(false);
      }
    };

    window.addEventListener("message", handleIframeMessage);

    return () => {
      window.removeEventListener("message", handleIframeMessage);
    };
  }, []);

  return (
    <ContextAPI.Provider value={{ isDetect, setDetect, user, setUser, loading,setLoading ,error,setError}}>
      {children}
    </ContextAPI.Provider>
  );
};

// Custom Hook for using context
export const useGlobalContext = () => {
  const context = useContext(ContextAPI);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalContextProvider");
  }
  return context;
};
