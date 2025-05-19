import React, { createContext } from "react";
import { useState } from "react";

export const AppContext = createContext();

export const ContextProvider = (props) => {

 const[locationLists, setLocationLists] = useState([]);

  return (
    <AppContext.Provider value={{ locationLists, setLocationLists }}>
      {props.children}
    </AppContext.Provider>
  );
};
