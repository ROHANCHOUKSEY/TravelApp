import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../CreateContext/Context";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    isLoggined,
    setIsLoggined,
    loading,
    user,
    setUser,
    userType,
    userName,
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
      setIsMobileMenuOpen(false); // Close mobile menu after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <nav className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg fixed z-10">
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
                BrandName
              </span>
              {isLoggined ? (
                <h1 className="text-white px-6">Welecome, {userName}</h1>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            {isLoggined ? (
              userType === "guest" ? (
                <>
                  <NavLink to="/" className={getNavlinkClass}>
                    Explore
                  </NavLink>
                  <NavLink to="/stateLocation" className={getNavlinkClass}>
                    StateLocations
                  </NavLink>
                  <NavLink to="/location" className={getNavlinkClass}>
                    Top Location
                  </NavLink>
                  <NavLink to="/favourites" className={getNavlinkClass}>
                    Favourites
                  </NavLink>
                  <NavLink
                    to="/login"
                    onClick={handleLogout}
                    className={getNavlinkClass}
                  >
                    LogOut
                  </NavLink>
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
                  <NavLink
                    to="/login"
                    onClick={handleLogout}
                    className={getNavlinkClass}
                  >
                    LogOut
                  </NavLink>
                </>
              )
            ) : (
              <>
                <NavLink to="/" className={getNavlinkClass}>
                  Explore
                </NavLink>
                <div className="hidden md:flex items-center space-x-4 ml-6">
                  <NavLink to="/login" className={getNavlinkClass}>
                    Login
                  </NavLink>
                  <NavLink to="/signUp" className={getNavlinkClass}>
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
                  <NavLink
                    to="/login"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                    className={getMobileNavlinkClass}
                  >
                    LogOut
                  </NavLink>
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
                  <NavLink
                    to="/login"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                    className={getMobileNavlinkClass}
                  >
                    LogOut
                  </NavLink>
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
