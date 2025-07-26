import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppContext } from "../CreateContext/AppContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggined, userType } = useContext(AppContext);
  const location = useLocation();

  if (isLoggined === false) {
    return <Navigate to="/login" replace />;
  }
  
  if(location.pathname === "/addLocation"  &&  userType !== "host") {
    return <Navigate to="/" replace/>
  }

  return children;
};

export default ProtectedRoute;
 