import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const ContextProvider = (props) => {
  const [locationLists, setLocationLists] = useState([]);
  const [statebaseLocation, setStatebaseLocation] = useState([]);
  const [isLoggined, setIsLoggined] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUsertype] = useState("");
  const [userName, setUsername] = useState("");
  const [userlastName, setUserlastname] = useState("");
  const [details, setDetails] = useState("");
  const [mode, setMode] = useState("lightmode");

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await fetch("http://localhost:3002/auth/session", {
          credentials: "include", // send cookies for session
        });

        if (!res.ok) throw new Error("Session check failed");
 
        const data = await res.json();

        if (data.isLoggined && data.user) {
          setIsLoggined(true);
          setUser(data.user);
          setUsertype(data.user.usertype);
          setUsername(data.user.firstname);
          setUserlastname(data.user.lastname)
        } else {
          setIsLoggined(false);
          setUser(null)
        }
      } catch (err) {
        console.error("Error checking session:", err);
        setIsLoggined(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
    console.log(isLoggined);
  }, [isLoggined]);

  return (
    <AppContext.Provider
      value={{
        locationLists,
        setLocationLists,
        statebaseLocation, 
        setStatebaseLocation,
        isLoggined,
        setIsLoggined,
        loading,
        user, 
        setUser,
        userType,
        userName,
        userlastName,
        details,
        setDetails,
        setMode
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
