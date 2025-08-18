import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppContext } from "../CreateContext/AppContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggined, userType, loading } = useContext(AppContext);
  const location = useLocation();

  if(loading){
    return <div>Loading...</div>
  }

  if (isLoggined === false) {
    return <Navigate to="/login" replace />;
  }

  console.log("userType: ", userType);
  
  if(location.pathname === "/addLocation"  && userType &&  userType !== "host") {
    return <Navigate to="/" replace/>
  }

  return children;
};

export default ProtectedRoute;
 