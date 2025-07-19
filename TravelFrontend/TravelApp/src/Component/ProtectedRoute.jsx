import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../CreateContext/AppContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggined } = useContext(AppContext);

  if (isLoggined === false) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
