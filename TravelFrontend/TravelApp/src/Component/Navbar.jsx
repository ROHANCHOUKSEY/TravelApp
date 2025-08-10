import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CircleUserRound, ChevronDown, LogOut, User } from "lucide-react";
import { Sun, Moon } from "lucide-react";
import {
  getsessionmode,
  loginUser,
  postsessionmode,
} from "../service/locationService";
import { AppContext } from "../CreateContext/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropDown, setDropdown] = useState(false);
  const dropdownRef = useRef();

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
      ? "text-white bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105"
      : "text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer backdrop-blur-sm hover:shadow-lg transform hover:scale-105";
  };

  const getMobileNavlinkClass = ({ isActive }) => {
    return isActive
      ? "block text-white bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 rounded-lg text-base font-semibold shadow-lg"
      : "block text-white hover:bg-white/10 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300";
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/logout`, {
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
    // console.log("modeStatus", modeStatus);
    const mode = modeStatus ? "dark" : "light";
    try {
      await postsessionmode(mode);
      mode === "dark" ? darkMode() : lightMode();
    } catch (error) {
      console.log("Mode is not change ", error);
    }
  };

  // useEffect(() => {
  //   async function getScreenMode() {
  //     try {
  //       const res = await getsessionmode();
  //       // const data = await res.json();
  //       console.log("getsessionmode", res);

  //       if (res.mode === "dark") {
  //         darkMode();
  //       } else {
  //         lightMode();
  //       }
  //     } catch (err) {
  //       console.error("Failed to get screen mode", err);
  //     }
  //   }

  //   getScreenMode();
  // }, []);

  // if (loading) {
  //   return null;
  // }

  useEffect(() => {
    // Only change mode if already set in context
    if (mode === "dark") {
      darkMode();
    } else if (mode === "light") {
      lightMode();
    }
  }, [mode]);

  return (
    <nav className="w-full bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 shadow-2xl fixed z-10 backdrop-blur-md border-b border-white/20 dark:border-none dark:shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 dark:bg-gray-900 ">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center group">
            <div className="flex items-center cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="relative">
                <svg
                  className="h-8 w-8 text-white drop-shadow-lg group-hover:animate-pulse"
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
                <div className="absolute inset-0 bg-white/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
              </div>
              <NavLink to="/">
                <span className="ml-3 text-white text-xl font-bold tracking-wide drop-shadow-lg group-hover:text-amber-100 transition-colors duration-300">
                  Bharat Explorer
                </span>
              </NavLink>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            {loading ? (<>
              <div className="flex space-x-4">
                <div className="h-8 w-20 bg-white/20 rounded-lg animate-pulse"></div>
                <div className="h-8 w-20 bg-white/20 rounded-lg animate-pulse"></div>
                <div className="h-8 w-20 bg-white/20 rounded-lg animate-pulse"></div>
                <div className="h-8 w-20 bg-white/20 rounded-lg animate-pulse"></div>
                <div className="h-8 w-20 bg-white/20 rounded-lg animate-pulse"></div>
              </div>
            </>) :
              isLoggined ? (
                userType === "guest" ? (
                  <>
                    <NavLink to="/" className={getNavlinkClass}>
                      Discover
                    </NavLink>
                    <NavLink to="/stateLocation" className={getNavlinkClass}>
                      Explore More
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
                        className="flex items-center text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer backdrop-blur-sm hover:shadow-lg transform hover:scale-105"
                      >
                        <div className="relative">
                          <CircleUserRound className="h-5 w-5 mr-2 drop-shadow-lg" />
                          <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
                        </div>
                        <span className="text-sm font-medium drop-shadow-lg">
                          {userName} {userlastName}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 ml-2 transition-transform duration-300 drop-shadow-lg ${dropDown ? "transform rotate-180" : ""
                            }`}
                        />
                      </button>

                      {dropDown && (
                        <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden z-20 border border-white/20 animate-fade-in">
                          <div className="py-2">
                            <div className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50">
                              <p className="font-bold text-amber-600">Welcome back!</p>
                              <p className="truncate text-gray-600">
                                {userName} {userlastName}
                              </p>
                            </div>

                            {/* Dark/Light Mode Toggle */}
                            <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-amber-50 transition-all duration-200">
                              <div className="flex items-center">
                                {mode === "dark" ? (
                                  <Moon className="h-4 w-4 mr-3 text-amber-600" />
                                ) : (
                                  <Sun className="h-4 w-4 mr-3 text-amber-600" />
                                )}
                                <span className="font-medium">
                                  {mode === "dark" ? "Dark" : "Light"} Mode
                                </span>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  checked={mode === "dark"}
                                  onChange={handleToogle}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-amber-500 peer-checked:to-orange-500"></div>
                              </label>
                            </div>

                            <button
                              onClick={handleLogout}
                              className="flex w-full items-center px-4 py-3 text-sm cursor-pointer text-gray-700 hover:bg-red-50 transition-all duration-200 group"
                            >
                              <LogOut className="h-4 w-4 mr-3 text-red-500 group-hover:animate-pulse" />
                              <span className="font-medium group-hover:text-red-600">Sign out</span>
                            </button>
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
                        className="flex items-center text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm hover:shadow-lg transform hover:scale-105"
                      >
                        <div className="relative">
                          <CircleUserRound className="h-5 w-5 mr-2 drop-shadow-lg" />
                          <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
                        </div>
                        <span className="text-sm font-medium drop-shadow-lg">
                          {userName} {userlastName}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 ml-2 transition-transform duration-300 drop-shadow-lg ${dropDown ? "transform rotate-180" : ""
                            }`}
                        />
                      </button>

                      {dropDown && (
                        <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden z-20 border border-white/20 animate-fade-in">
                          <div className="py-2">
                            <div className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50">
                              <p className="font-bold text-amber-600">Host Dashboard</p>
                              <p className="truncate text-gray-600">
                                {userName} {userlastName}
                              </p>
                            </div>
                            {/* Dark/Light Mode Toggle */}
                            <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-amber-50 transition-all duration-200">
                              <div className="flex items-center">
                                {mode === "dark" ? (
                                  <Moon className="h-4 w-4 mr-3 text-amber-600" />
                                ) : (
                                  <Sun className="h-4 w-4 mr-3 text-amber-600" />
                                )}
                                <span className="font-medium">
                                  {mode === "dark" ? "Dark" : "Light"} Mode
                                </span>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  checked={mode === "dark"}
                                  onChange={handleToogle}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-amber-500 peer-checked:to-orange-500"></div>
                              </label>
                            </div>
                            <button
                              onClick={handleLogout}
                              className="flex w-full items-center px-4 py-3 text-sm cursor-pointer text-gray-700 hover:bg-red-50 transition-all duration-200 group"
                            >
                              <LogOut className="h-4 w-4 mr-3 text-red-500 group-hover:animate-pulse" />
                              <span className="font-medium group-hover:text-red-600">Sign out</span>
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
                    <NavLink to="/signUp" className="bg-gradient-to-r from-white to-gray-100 text-amber-600 hover:from-gray-100 hover:to-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105">
                      Sign Up
                    </NavLink>
                  </div>
                </>
              )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-amber-100 focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6 transform rotate-180 transition-transform duration-300"
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
                  className="h-6 w-6 transition-transform duration-300"
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
        <div className="md:hidden bg-gradient-to-b from-amber-600/95 to-orange-600/95 backdrop-blur-md border-t border-white/20 animate-slide-down">
          <div className="px-4 pt-4 pb-6 space-y-2">
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
                    className="block w-full text-left text-white hover:bg-red-500/20 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300"
                  >
                    Sign out
                  </button>
                  <div className="pt-2 border-t border-white/20"></div>
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
                    className="block w-full text-left text-white hover:bg-red-500/20 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300"
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
