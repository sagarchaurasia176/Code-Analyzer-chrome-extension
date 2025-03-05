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

  return (
    <ContextAPI.Provider
      value={{
        isDetect,
        setDetect,
        loading,
        setLoading,
        error,
        setError,
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
