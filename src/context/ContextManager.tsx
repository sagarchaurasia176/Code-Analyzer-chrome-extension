import { createContext, useState, ReactNode, useContext } from "react";

// Create Context - provider
export const ContextAPI = createContext<
  | {
      isDetect: boolean;
      setDetect: React.Dispatch<React.SetStateAction<boolean>>;
      loader: boolean;
      setLoader: React.Dispatch<React.SetStateAction<boolean>>;
      fn: () => void;
    }
  | undefined
>(undefined);

// Provider Component
export const GlobalContextFunction = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isDetect, setDetect] = useState(true);
  const [loader, setLoader] = useState(false);

  // Function to handle authentication
  const fn = () => {
    setLoader(true); // Start loading state
    try {
      console.log("Google Authentication Triggered");
      // Here you can implement Google OAuth or Firebase authentication logic
      setTimeout(() => {
        alert("Authentication successful!");
        setLoader(false); // Stop loading after authentication
      }, 2000);
    } catch (error) {
      console.error("Authentication failed", error);
      setLoader(false);
    }
  };

  return (
    <ContextAPI.Provider value={{ isDetect, setDetect, loader, setLoader, fn }}>
      {children}
    </ContextAPI.Provider>
  );
};

// Custom Hook for using context
export const useGlobalContext = () => {
  const context = useContext(ContextAPI);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};
