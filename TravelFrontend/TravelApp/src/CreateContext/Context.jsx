import React, { createContext, useEffect, useState } from "react";
import { getsessionmode } from "../service/locationService";

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
          setUserlastname(data.user.lastname);
        } else {
          setIsLoggined(false);
          setUser(null);
        }

        const modeRes = await getsessionmode();
        if (modeRes === "dark") {
          darkMode();
        } else if (modeRes === "light") {
          lightMode();
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
