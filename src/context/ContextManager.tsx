// import { createContext, useState, ReactNode, useContext } from "react";

// // Create Context - provider
// export const ContextAPI = createContext<{
//     isDetect: boolean;
//     setDetect: React.Dispatch<React.SetStateAction<boolean>>;
//     loader: boolean;
//     setLoader: React.Dispatch<React.SetStateAction<boolean>>;
//     fn: () => void;
// } | undefined>(undefined);



// // Provider Component - consumer here
// export const GloblaContextFunction = ({ children }: { children: ReactNode }) => {
//   const [isDetect, setDetect] = useState(false);
//   const [loader, setLoader] = useState(false); // Add loader state

//   const fn =()=>{
//     alert("hey sagar");
//   }

//   return (
//     <ContextAPI.Provider value={{ isDetect, setDetect, loader, setLoader , fn}}>
//       {children}
//     </ContextAPI.Provider>
//   );
// };

// // Custom Hook for using context
// export const useGlobalContext = () => {
//     const context = useContext(ContextAPI);
//     if (!context) {
//       throw new Error("useGlobalContext must be used within a GlobalContextProvider");
//     }
//     return context;
//   };