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
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header with image */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8">
          {details.image.length > 1 ? (
            // Carousel for multiple images
            <div className="relative h-96 overflow-hidden">
              {details.image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${details.locationName} ${index + 1}`}
                  className={`w-full h-full object-cover ${
                    index === 0 ? "block" : "hidden"
                  }`}
                />
              ))}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {details.image.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === 0 ? "bg-white" : "bg-white/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          ) : (
            // Single image display
            <img
              src={details.image[0]}
              alt={details.locationName}
              className="w-full h-96 object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">{details.locationName}</h1>
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <FaMapMarkerAlt className="mr-1" />
                {details.country}
              </span>
              <span className="flex items-center">
                {renderStars()}
                <span className="ml-1">({details.rating})</span>
              </span>
            </div>
          </div>
        </div>

        {/* Content tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("description")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center justify-center ${
                  activeTab === "description"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FaInfoCircle className="mr-2" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center justify-center ${
                  activeTab === "history"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FaHistory className="mr-2" />
                History
              </button>
              <button
                onClick={() => setActiveTab("timing")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center justify-center ${
                  activeTab === "timing"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FaClock className="mr-2" />
                Visiting Hours
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
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  About {details.locationName}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {details.description}
                </p>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Details
                </h3>
                <p className="text-gray-600 leading-relaxed">
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
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  Historical Background
                </h2>
                <p className="text-gray-600 leading-relaxed">
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
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
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
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Best Time to Visit
                  </h3>
                  <p className="text-gray-600">
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
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Visitor Tips
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
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
              </li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Quick Facts
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{details.country}</p>
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
      {/* Image Gallery */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Photo Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {details.image.map((img, index) => (
            <div key={index} className="overflow-hidden rounded-lg">
              <img
                src={img}
                alt={`${details.locationName} ${index + 1}`}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                // onClick={() => window.open(img, "_blank")}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ViewDetails;
