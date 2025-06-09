import React, { useContext, useEffect } from "react";
import { AppContext } from "../CreateContext/Context";
import { locationFromServer } from "../service/locationService";
import { FaStar, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";

const Explore = () => {
  const { locationLists, setLocationLists, isLoggined } =
    useContext(AppContext);

  useEffect(() => {
    async function fetchLocation() {
      try {
        const response = await locationFromServer();
        setLocationLists(response);
      } catch (error) {
        console.log("All location is not fetch", error);
      }
    }
    fetchLocation();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mt-15 mb-8">
        <h1 className="text-center font-sans text-3xl underline underline-offset-4  font-bold text-gray-800 mb-2">
          Discover Incredible India
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore breathtaking destinations and hidden gems across our beautiful
          country
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locationLists.map((location) => (
          <div
            key={location.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Location Image */}
            <div className="relative h-48  overflow-hidden">
              <img
                src={location.image[0]}
                alt={location.locationName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=Image+Not+Available";
                }}
              />
              <div className="absolute top-2 right-2 bg-white bg-opacity-80 px-2 py-1 rounded-full flex items-center">
                <FaStar className="text-yellow-500 mr-1" />
                <span className="font-semibold text-gray-800">
                  {location.rating}
                </span>
              </div>
            </div>

            {/* Location Details */}
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-gray-800">
                  {location.locationName}
                </h2>
                <div className="flex items-center bg-blue-100 px-2 py-1 rounded">
                  <FaGlobe className="text-blue-500 mr-1" />
                  <span className="text-sm text-blue-800">
                    {location.country}
                  </span>
                </div>
              </div>

              <div className="flex items-center text-gray-600 mb-3">
                <FaMapMarkerAlt className="mr-2 text-red-500" />
                <span className="text-sm">
                  {location.country}, {location.state}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {location.description}
              </p>

              <div className="flex justify-between items-center">
                {isLoggined ? (
                  <NavLink
                    to={`viewDetails/${location.id}`}
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    View Details
                  </NavLink>
                ) : (
                  <NavLink
                    to="login"
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    View Details
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
