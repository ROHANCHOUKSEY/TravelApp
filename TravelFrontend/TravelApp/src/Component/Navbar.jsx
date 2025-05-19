import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const getNavlinkClass = ({ isActive }) => {
    return isActive
      ? "text-white bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 cursor-pointer"
      : "text-white hover:bg-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 cursor-pointer";
  };

  return (
    <nav className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
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
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/" className={getNavlinkClass}>
              Explore
            </NavLink>
            <NavLink to="/location" className={getNavlinkClass}>
              Top Location
            </NavLink>
            <NavLink to="/favourites" className={getNavlinkClass}>
              Favourites
            </NavLink>
            <NavLink
              to="/host"
              className={getNavlinkClass}
            >
              Host
            </NavLink>
            <NavLink
              to="/addLocation"
              className={getNavlinkClass}
            >
              Add Location
            </NavLink>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 ml-6">
            <Link
              to="/login"
              className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 cursor-pointer"
            >
              Login
            </Link>
            <Link
              to="/signUp"
              className="bg-white text-indigo-600 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition duration-300 cursor-pointer shadow-sm"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-white hover:text-gray-200 focus:outline-none">
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
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;