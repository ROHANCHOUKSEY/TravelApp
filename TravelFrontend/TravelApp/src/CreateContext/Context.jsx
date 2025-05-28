import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const ContextProvider = (props) => {
  const [locationLists, setLocationLists] = useState([]);
  const [isLoggined, setIsLoggined] = useState(false);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const res = await fetch("http://localhost:3002/auth/session", {
  //         credentials: "include", // send cookies for session
  //       });

  //       const data = await res.json();
  //       console.log(data)

  //       if (data.isLoggined && data.user) {  
  //         setIsLoggined(true);
  //       } else {
  //         setIsLoggined(false);
  //       } 
  //     } catch (err) {
  //       console.error("Error checking session:", err);
  //       setIsLoggined(false);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);

  return (
    <AppContext.Provider
      value={{ locationLists, setLocationLists, isLoggined, setIsLoggined, loading }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
