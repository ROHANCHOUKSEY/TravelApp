import React, { useContext, useEffect } from "react";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import { Outlet } from "react-router-dom";
import { AppContext } from "./CreateContext/Context";

const App = () => {

  const{mode} = useContext(AppContext);

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(mode);
  }, [mode]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
