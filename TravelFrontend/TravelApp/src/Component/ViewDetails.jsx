import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getReview,
  locationDetails,
  postReview,
} from "../service/locationService";
import {
  FaMapMarkerAlt,
  FaStar,
  FaClock,
  FaInfoCircle,
  FaHistory,
  FaLandmark,
  FaTicketAlt,
  FaWheelchair,
  FaExclamationCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Review from "./Review/Review";
import { AppContext } from "../CreateContext/Context";

const ViewDetails = () => {

  const{userType} = useContext(AppContext);

  const [details, setDetails] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await locationDetails(id);
        console.log("fetchDetailsData", data);
        setDetails(data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    }

    fetchDetails();
  }, []);

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

  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <FaStar
          key={i}
          className={i < details.rating ? "text-yellow-400" : "text-gray-300"}
        />
      ));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative top-[64px] min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Image Gallery (unchanged) */}
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
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
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

        {/* Enhanced Details Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header Section */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {details.locationName}
                  </h1>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{details.country}</span>
                  </div>
                </div>
                <div className="flex items-center mt-4 md:mt-0">
                  <div className="flex mr-4">{renderStars()}</div>
                  <span className="text-gray-600 dark:text-gray-300">
                    {details.rating}/5.0
                  </span>
                </div>
              </div>

              {/* Overview Section */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <FaLandmark className="text-blue-500 mr-3 text-xl" />
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Overview
                  </h2>
                </div>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p className="leading-relaxed">{details.description}</p>
                  <p className="leading-relaxed">{details.holeDescription}</p>
                </div>
              </div>

              {/* History Section */}
              {details.history && (
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <FaHistory className="text-blue-500 mr-3 text-xl" />
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                      Historical Significance
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {details.history}
                  </p>
                </div>
              )}

              {/* Visitor Information */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <FaExclamationCircle className="text-blue-500 mr-3 text-xl" />
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Visitor Information
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">
                      Tips & Guidelines
                    </h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      {details.VisitorTips &&
                      typeof details.VisitorTips === "string" ? (
                        <li>{details.VisitorTips}</li>
                      ) : (
                        details.VisitorTips?.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            {tip}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                  <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">
                      Facilities
                    </h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-center">
                        <FaWheelchair className="text-blue-500 mr-2" />
                        Wheelchair accessible
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="w-4 h-4 text-blue-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Guided tours available
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Timing Section (at the end as requested) */}
              <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <FaClock className="text-blue-600 dark:text-blue-300 mr-3 text-2xl" />
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Visiting Hours
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                      Regular Hours
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Open:</span>{" "}
                      {details.timing}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Close:</span>{" "}
                      {details.closing}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        {userType === "guest" ?  <Review /> : "" }
      </div>
    </motion.div>
  );
};

export default ViewDetails;
