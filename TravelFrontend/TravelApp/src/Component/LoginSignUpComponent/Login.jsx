import React, { useContext, useState } from "react";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";
import { loginUser } from "../../service/locationService";
import { NavLink, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { AppContext } from "../../CreateContext/AppContext";

const Login = () => {
  const [password, setPassword] = useState(true);

  const handlePassword = () => {
    setPassword(!password);
  };

  const { setIsLoggined } = useContext(AppContext);
  const navigation = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  }); 

  const [loginerror, setLoginError] = useState("");
  const [loading, setLoading] = useState(null);

  const handleChange = (e) => {
    setUser({ 
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userLogin = await loginUser(user);
      setIsLoggined(true);
      setUser(userLogin);
      navigation("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.message) {
        setLoginError(error.message);
      }
    }
  };
  
  return (
    <div className="relative top-[64px] min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-blue-100 mt-2">Please enter your credentials</p>
        </div>
        {loginerror && (
          <div className="mx-6 mt-4">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">
                    {loginerror}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
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
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent "
                type={password ? "password" : "text"}
                name="password"
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                {password ? (
                  <Eye onClick={handlePassword} />
                ) : (
                  <EyeOff onClick={handlePassword} />
                )}
              </div>
            </div>

            <button
              // onClick={handleSignIn}
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
            >
              <FaSignInAlt className="mr-2" />
              {loading ? (<span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing you in...
            </span>) : <span>Sign In</span>}
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
