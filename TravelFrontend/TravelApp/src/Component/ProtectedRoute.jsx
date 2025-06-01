import React, { useContext } from "react";
import { AppContext } from "../CreateContext/Context";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoggined } = useContext(AppContext);

  if (isLoggined === false) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
