import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";

const PageNotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center p-6 text-center"
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Error Header */}
        <div className="bg-gradient-to-r from-red-500 to-pink-600 p-6">
          <div className="flex justify-center">
            <FaExclamationTriangle className="text-white text-5xl animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-white mt-4">404</h1>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Animated 404 Illustration */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
            className="my-6"
          >
            <svg
              className="w-32 h-32 mx-auto"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 20L20 100L100 180L180 100L100 20Z"
                stroke="#EF4444"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M60 60L140 140M140 60L60 140"
                stroke="#EF4444"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors duration-300"
            >
              <FaHome className="mr-2" />
              Return Home
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <p className="mt-8 text-gray-500 text-sm">
        If you believe this is an error, please contact support
      </p>
    </motion.div>
  );
};

export default PageNotFound;
