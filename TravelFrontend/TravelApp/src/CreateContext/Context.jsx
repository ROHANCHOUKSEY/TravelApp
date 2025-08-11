import React, { createContext, useEffect, useState } from "react";
import { getsessionmode } from "../service/locationService";
import { AppContext } from "./AppContext";
 

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
  const [mode, setMode] = useState();
  const [stateLocation, setStateLocation] = useState([]);
  const [stateName, setStateName] = useState("");
  


  const lightMode = () => {
    setMode("light");
  };

  const darkMode = () => {
    setMode("dark");
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/session`, {
          credentials: "include", // send cookies for session
        });
        console.log("Response:", res);

        if (!res.ok) throw new Error("Session check failed"); 
 
        const data = await res.json();

        if (data.isLoggined === true && data.user) {
          setIsLoggined(true);
          setUser(data.user);
          setUsertype(data.user.usertype);
          setUsername(data.user.firstname);
          setUserlastname(data.user.lastname);
          const modeRes = await getsessionmode();
          if (modeRes === "dark") {
            darkMode();
          } else if (modeRes === "light") {
            lightMode();
          }
        } else {
          setIsLoggined(false);
          setUser(null);
        }
      } catch (err) {
        console.error("Error checking session:", err);
        setIsLoggined(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    console.log("isLoggined: ", isLoggined);
    console.log("userType: ", userType);
    checkLoginStatus();
  }, [isLoggined, mode]);

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
        stateLocation,
        setStateLocation,
        stateName,
        setStateName,
        mode,
        lightMode,
        darkMode,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
