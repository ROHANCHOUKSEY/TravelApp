import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { locationDetails } from "../service/locationService";
import {
  FaMapMarkerAlt,
  FaStar,
  FaClock,
  FaHistory,
  FaInfoCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ViewDetails = () => {
  const [details, setDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const { id } = useParams();

  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await locationDetails(id);
        setDetails(data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    }

    fetchDetails();
  }, [id]);

  if (!details) { 
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    ); 
  }

  // Generate star rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i <= details.rating ? "text-yellow-400" : "text-gray-300"}
        />
      );
    }
    return stars;
  };
 
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative top-[64px] min-h-screen  from-blue-50 bg-gray-100 dark:bg-gray-900 to-indigo-50 py-12 px-4  sm:px-6 lg:px-8"
    >
      <div className=" max-w-6xl mx-auto">
        
        {/* Image Gallery */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white px-6 pt-6">
            Photo Gallery
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
            {details.image.map((img, index) => (
              <div
                key={index}
                className={`relative group overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-lg ${
                  index === 0
                    ? "sm:col-span-2 md:col-span-2 lg:col-span-2 row-span-2"
                    : ""
                }`}
              >
                <img
                  src={img}
                  alt={`${details.locationName} ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                  onClick={() => window.open(img, "_blank")}
                />
                <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {details.image.length > 8 && (
            <div className="px-6 pb-6 text-center">
              <button className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 shadow-md">
                View All Photos ({details.image.length})
              </button>
            </div>
          )}
        </div>

        {/* Content tabs */}
        <div className="bg-white dark:bg-gray-800  rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="sm:flex -mb-px">
              <button
                onClick={() => setActiveTab("description")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center justify-center ${
                  activeTab === "description"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent dark:text-gray- text-gray-500 dark:text-white hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FaInfoCircle className="mr-2 dark:text-white" />
                <p className="dark:text-white">Overview</p>
              </button>
              <button
                onClick={() => setActiveTab("history")} 
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center justify-center ${
                  activeTab === "history"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FaHistory className="mr-2 dark:text-white" />
                <p className="dark:text-white">History</p>
              </button>
              <button
                onClick={() => setActiveTab("timing")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center justify-center ${
                  activeTab === "timing"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FaClock className="mr-2 dark:text-white" />
                <p className="dark:text-white">Visiting Hours</p>
              </button>
            </nav>
          </div>

          <div className="p-8">
            {activeTab === "description" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                  About {details.locationName}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed dark:text-white">
                  {details.description}
                </p>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                  Details
                </h3>
                <p className="text-gray-600 leading-relaxed dark:text-white">
                  {details.holeDescription}
                </p>
              </motion.div>
            )}

            {activeTab === "history" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                  Historical Background
                </h2>
                <p className="text-gray-600 leading-relaxed dark:text-white">
                  {details.history}
                </p>
              </motion.div>
            )}

            {activeTab === "timing" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                  Visiting Hours
                </h2>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FaClock className="text-blue-500 mr-3 text-xl" />
                    <div>
                      <p className="font-medium text-gray-800">
                        Open from {details.timing} to {details.closing}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Last entry 30 minutes before closing
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                    Best Time to Visit
                  </h3>
                  <p className="text-gray-600 dark:text-white">
                    Early mornings or weekdays are recommended to avoid crowds.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Additional info cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            whileHover={{ y: -5 }}
            className="dark:bg-gray-800 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              Visitor Tips
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-white">
              {/* <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                Wear comfortable shoes for walking
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                Bring water and sunscreen
              </li>
              <li className="flex items-start"> 
                <span className="text-indigo-500 mr-2">•</span>
                Photography is allowed but check for restricted areas
              </li> */}
              {details.VisitorTips}
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800"
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              Quick Facts
            </h3>
            <div className="space-y-3 dark:text-white">
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium dark:text-white">{details.country}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Average Visit Duration</p>
                <p className="font-medium">2-3 hours</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Accessibility</p>
                <p className="font-medium">Wheelchair accessible</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ViewDetails;
