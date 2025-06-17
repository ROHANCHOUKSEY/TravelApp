import React, { useState } from "react";
import { signUp } from "../../service/locationService";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaCheck } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const navigation = useNavigate();
  const [validationerror, setValidationerror] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState(true);

  const handlePassword = () => {
    setPassword(!password);
  };

  const [signUpUser, setSignUpUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
    usertype: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignUpUser({
      ...signUpUser,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const newUser = await signUp({
        ...signUpUser,
        terms: signUpUser.terms ? "on" : "",
      });
      setSignUpUser(newUser);
      navigation("/login");
    } catch (error) {
      console.log("User is not signUp", error);
      if (error.errors) {
        setValidationerror(error.errors);
      } else {
        setValidationerror([{ msg: error.message || "Signup failed" }]);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative top-[64px] min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full  max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
          <p className="text-blue-100 mt-2">Join our travel community today</p>
        </div>

        {/* Error Messages */}
        {validationerror.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 mt-4 rounded">
            {validationerror.map((err, index) => (
              <p key={index} className="text-red-700 text-sm">
                {err.msg}
              </p>
            ))}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignUp} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="text"
                name="firstname"
                value={signUpUser.firstname}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
            </div>

            {/* Last Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="text"
                name="lastname"
                value={signUpUser.lastname}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-gray-400" />
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="email"
              name="email"
              value={signUpUser.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type={password ? "password" : "text"}
              name="password"
              value={signUpUser.password}
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

          {/* Confirm Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="password"
              name="confirm_password"
              value={signUpUser.confirm_password}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
          </div>

          {/* User Type */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">I want to:</p>
            <div className="flex items-center space-x-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-blue-600"
                  name="usertype"
                  value="guest"
                  checked={signUpUser.usertype === "guest"}
                  onChange={handleChange}
                  required
                />
                <span className="ml-2 text-gray-700">Explore as Guest</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-blue-600"
                  name="usertype"
                  value="host"
                  checked={signUpUser.usertype === "host"}
                  onChange={handleChange}
                />
                <span className="ml-2 text-gray-700">Host Locations</span>
              </label>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                checked={signUpUser.terms}
                onChange={handleChange}
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-gray-700">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              "Creating Account..."
            ) : (
              <>
                <FaCheck className="mr-2" />
                Sign Up
              </>
            )}
          </button>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Log in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
