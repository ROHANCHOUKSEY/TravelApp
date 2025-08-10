import React, { useContext, useEffect } from "react";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { AppContext } from "./CreateContext/AppContext";

const App = () => {

  const{mode} = useContext(AppContext);

  const ScrollToTopOnRouteChange = () => {
    const location = useLocation();
    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, [location.pathname]);
    return null;
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(mode);
  }, [mode]);

  return (
    <>
      <ScrollToTopOnRouteChange /> 
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
