import React, { useContext, useState } from "react";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";
import { AppContext } from "../../CreateContext/Context";
import { loginUser } from "../../service/locationService";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const { setIsLoggined } = useContext(AppContext);
  const navigation = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loginerror, setLoginError] = useState("");

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userLogin = await loginUser(user);
      setIsLoggined(true);
      setUser(userLogin);
      navigation("/");
    } catch (error) {
      console.log(error);
      if (error.message) {
        setLoginError(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-blue-100 mt-2">Please enter your credentials</p>
        </div>
        {loginerror && <p>{loginerror}</p>}
        {/* Form Section */}
        <div className="p-8">
          <form className="space-y-6" onSubmit={handleSignIn}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Email Address"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>

            <button
              // onClick={handleSignIn}
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
            >
              <FaSignInAlt className="mr-2" />
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <NavLink
              to="/signUp"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
