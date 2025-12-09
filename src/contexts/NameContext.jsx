import { createContext, useState } from "react";

export const NamesContext = createContext();

export const NamesProvider = ({ children }) => {
  const [names, setNames] = useState(["Josue", "Hope"]);
  
  return (
    <NamesContext.Provider value={{ names, setNames }}>
      {children}
    </NamesContext.Provider>
  );
};
