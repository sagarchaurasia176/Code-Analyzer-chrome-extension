import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import toast from "react-hot-toast";

// Create Context - provider
export const ContextAPI = createContext<
  | {
      isDetect: boolean;
      setDetect: React.Dispatch<React.SetStateAction<boolean>>;
      loading: boolean;
      error: string | null;
      setError: React.Dispatch<React.SetStateAction<string | null>>;
      setLoading: React.Dispatch<React.SetStateAction<boolean>>;
      toggleDetect: () => void;
      isGenerated: boolean;
      setIsGenerated: React.Dispatch<React.SetStateAction<boolean>>;
      randomCode :string | null,
      setRandomCode:React.Dispatch<React.SetStateAction<string | null>>
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [randomCode, setRandomCode] = useState<string | null>(null);

  useEffect(() => {
    const storedCode = localStorage.getItem("accessCode");
    if (storedCode) {
      setRandomCode(storedCode);
      setIsGenerated(true);
    }
  }, []);




  useEffect(() => {
    chrome.storage.local.get("isDetect", (result) => {
      setDetect(result.isDetect ?? false);
    });
  }, []);

  // Toogle Detect to the function apply it so we get 
  const toggleDetect = () => {
    setDetect((prev) => !prev);
    chrome.storage.local.set({ isDetect: !isDetect }, () => {
      toast.success(`Detection ${!isDetect ? "enabled" : "disabled"}`);
    });
  };


  return (
    <ContextAPI.Provider
      value={{
        isDetect,
        setDetect,
      isGenerated,
      setIsGenerated,
      randomCode,
      setRandomCode,
        loading,
        setLoading,
        error,
        setError,
        toggleDetect,
      }}
    >
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
