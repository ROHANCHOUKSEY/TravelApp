import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../CreateContext/Context";
import { CircleUserRound, ChevronDown, LogOut, User } from "lucide-react";
import {
  getsessionmode,
  loginUser,
  postsessionmode,
} from "../service/locationService";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropDown, setDropdown] = useState(false);
  const dropdownRef = useRef();
  const [screenMode, setScreenMode] = useState("light");

  const {
    isLoggined,
    setIsLoggined,
    loading,
    user,
    setUser,
    userType,
    userName,
    userlastName,
    mode,
    lightMode,
    darkMode,
  } = useContext(AppContext);

  const getNavlinkClass = ({ isActive }) => {
    return isActive
      ? "text-white bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 cursor-pointer"
      : "text-white hover:bg-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 cursor-pointer";
  };

  const getMobileNavlinkClass = ({ isActive }) => {
    return isActive
      ? "block text-white bg-indigo-700 px-3 py-2 rounded-md text-base font-medium"
      : "block text-white hover:bg-indigo-600 px-3 py-2 rounded-md text-base font-medium";
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3002/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setIsLoggined(false);
      setUser(null);
      navigate("/login");
      setIsMobileMenuOpen(false);
      setDropdown(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdown(!dropDown);
  };

  const handleOutSideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutSideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, []);

  const handleToogle = async (e) => {
    const modeStatus = e.target.checked;
    console.log("modeStatus", modeStatus);
    const mode = modeStatus ? "dark" : "light";
    try {
      await postsessionmode(mode);
      mode === "dark" ? darkMode() : lightMode();
    } catch (error) {
      console.log("Mode is not change ", error);
    }
  };

  useEffect(() => {
    async function getScreenMode() {
      try {
        const res = await getsessionmode();
        // const data = await res.json();
        console.log("getsessionmode", res);

        if (res.mode === "dark") {
          darkMode();
        } else {
          lightMode();
        }
      } catch (err) {
        console.error("Failed to get screen mode", err);
      }
    }

    getScreenMode();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <nav className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg fixed z-10 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="ml-2 text-white text-xl font-bold">
                Bharat Explorer
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            {isLoggined ? (
              userType === "guest" ? (
                <>
                  <NavLink to="/" className={getNavlinkClass}>
                    Discover
                  </NavLink>
                  <NavLink to="/stateLocation" className={getNavlinkClass}>
                    By State
                  </NavLink>
                  <NavLink to="/location" className={getNavlinkClass}>
                    Top Picks
                  </NavLink>
                  <NavLink to="/favourites" className={getNavlinkClass}>
                    Favourites
                  </NavLink>

                  <div className="relative ml-2" ref={dropdownRef}>
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center text-white hover:bg-indigo-700 px-3 py-2 rounded-md transition duration-300"
                    >
                      <CircleUserRound className="h-5 w-5 mr-1" />
                      <span className="text-sm font-medium">
                        {userName} {userlastName}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 ml-1 transition-transform duration-200 ${
                          dropDown ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>

                    {dropDown && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-200">
                        <div className="py-1">
                          <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100 bg-gray-50">
                            <p className="font-medium">Welcome back!</p>
                            <p className="truncate">
                              {userName} {userlastName}
                            </p>
                          </div>

                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-200"
                          >
                            <LogOut className="h-4 w-4 mr-2 text-indigo-600" />
                            Sign out
                          </button>
                          <div>
                            <label className="relative left-3 inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-gray-900">
                              <input
                                className="peer sr-only"
                                id="AcceptConditions"
                                onChange={handleToogle}
                                type="checkbox"
                                checked={mode === "dark"}
                              />
                              <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-gray-300 ring-[6px] ring-inset ring-white transition-all peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <NavLink to="/" className={getNavlinkClass}>
                    Explore
                  </NavLink>
                  <NavLink to="/host" className={getNavlinkClass}>
                    Host
                  </NavLink>
                  <NavLink to="/addLocation" className={getNavlinkClass}>
                    Add Location
                  </NavLink>

                  <div className="relative ml-2" ref={dropdownRef}>
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center text-white hover:bg-indigo-700 px-3 py-2 rounded-md transition duration-300"
                    >
                      <CircleUserRound className="h-5 w-5 mr-1" />
                      <span className="text-sm font-medium">
                        {userName} {userlastName}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 ml-1 transition-transform duration-200 ${
                          dropDown ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>

                    {dropDown && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-200">
                        <div className="py-1">
                          <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100 bg-gray-50">
                            <p className="font-medium">Host Dashboard</p>
                            <p className="truncate">
                              {userName} {userlastName}
                            </p>
                          </div>

                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-200"
                          >
                            <LogOut className="h-4 w-4 mr-2 text-indigo-600" />
                            Sign out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )
            ) : (
              <>
                <NavLink to="/" className={getNavlinkClass}>
                  Discover
                </NavLink>
                <div className="hidden md:flex items-center space-x-4 ml-6">
                  <NavLink to="/login" className={getNavlinkClass}>
                    Login
                  </NavLink>
                  <NavLink to="/signUp" className={getNavlinkClass}>
                    Sign Up
                  </NavLink>
                  <label className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-gray-900">
                    <input
                      className="peer sr-only"
                      id="AcceptConditions"
                      type="checkbox"
                    />
                    <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-gray-300 ring-[6px] ring-inset ring-white transition-all peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"></span>
                  </label>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gray-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-indigo-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isLoggined ? (
              userType === "guest" ? (
                <>
                  <NavLink
                    to="/"
                    className={getMobileNavlinkClass}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Explore
                  </NavLink>
                  <NavLink
                    to="/location"
                    className={getMobileNavlinkClass}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Top Location
                  </NavLink>
                  <NavLink
                    to="/stateLocation"
                    className={getMobileNavlinkClass}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    StateLocation
                  </NavLink>
                  <NavLink
                    to="/favourites"
                    className={getMobileNavlinkClass}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Favourites
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-white hover:bg-indigo-600 px-3 py-2 rounded-md text-base font-medium"
                  >
                    Sign out
                  </button>
                  <div className="pt-2 border-t border-indigo-800"></div>
                </>
              ) : (
                <>
                  <NavLink
                    to="/"
                    className={getMobileNavlinkClass}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Explore
                  </NavLink>
                  <NavLink
                    to="/host"
                    className={getMobileNavlinkClass}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Host
                  </NavLink>
                  <NavLink
                    to="/addLocation"
                    className={getMobileNavlinkClass}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Add Location
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-white hover:bg-indigo-600 px-3 py-2 rounded-md text-base font-medium"
                  >
                    Sign out
                  </button>
                </>
              )
            ) : (
              <>
                <NavLink
                  to="/"
                  className={getMobileNavlinkClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Explore
                </NavLink>
                <NavLink
                  to="/login"
                  className={getMobileNavlinkClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signUp"
                  className={getMobileNavlinkClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
