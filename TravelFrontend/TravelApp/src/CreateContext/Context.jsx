import React, { createContext } from "react";
import { useState } from "react";

export const AppContext = createContext();

export const ContextProvider = (props) => {

 const[locationLists, setLocationLists] = useState([]);
 const[isLoggined, setIsLoggined] = useState(false);

  return (
    <AppContext.Provider value={{ locationLists, setLocationLists, isLoggined, setIsLoggined}}>
      {props.children}
    </AppContext.Provider>
  );
};
  