import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const ContextProvider = (props) => {
  const [locationLists, setLocationLists] = useState([]);
  const [isLoggined, setIsLoggined] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUsertype] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await fetch("http://localhost:3002/auth/session", {
          credentials: "include", // send cookies for session
        });

        if (!res.ok) throw new Error("Session check failed");

        const data = await res.json();
        console.log(data);

        if (data.isLoggined && data.user) {
          setIsLoggined(true);
          setUser(data.user);
          setUsertype(data.user.usertype);
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
  }, [isLoggined]);

  return (
    <AppContext.Provider
      value={{
        locationLists,
        setLocationLists,
        isLoggined,
        setIsLoggined,
        loading,
        user, 
        setUser,
        userType
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
