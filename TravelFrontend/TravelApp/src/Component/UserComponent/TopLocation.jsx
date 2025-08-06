import React, { useContext, useEffect } from "react";
import {
  locationFromServer,
  userFavourite,
} from "../../service/locationService";
import { FaStar, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../../CreateContext/AppContext";

const TopLocation = () => {
  const { locationLists, setLocationLists } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLocation() {
      try {
        const data = await locationFromServer();
        setLocationLists(data);
      } catch (error) {
        console.log("Location is not fetch");
      }
    }
    fetchLocation();
  }, []);

  const handleFavourite = async (id) => {
    const alreadyFavourite = locationLists.find(
      (location) => location.id === id
    );
    if (alreadyFavourite?.isFavourite) {
      console.log("Already Favourite");
      navigate("/favourites");
    } else {
      await userFavourite(id);
      console.log("Add favourite");
      navigate("/favourites");
    }
  };
  return (
    <div className="relative top-[64px] min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <div className="mb-12 text-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-wide mb-6 animate-pulse">
            Must-Visit Destinations
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8 rounded-full">
          </div>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore the most loved and highly rated locations in India.
            </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locationLists.map((location) => (
          <div
            key={location.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:hover:shadow-gray-700/50"
          >
            {/* Location Image */}
            <div className="relative h-48 overflow-hidden">
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
              <div className="flex dark:text-white justify-between items-start mb-2">
                <h2 className="text-xl font-bold  text-gray-800 dark:text-white">
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

              <p className="text-gray-600 dark:text-white text-sm mb-4 line-clamp-2">
                {location.description}
              </p>

              <div className="flex justify-between items-center">
                <button className="text-white bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  shadow-blue-500/50  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                  <NavLink to={`/viewDetails/${location.id}`}>
                    {" "}
                    View Details
                  </NavLink>
                </button>
                <button
                  onClick={() => handleFavourite(location.id)}
                  className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-red-500/50  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Favourites
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopLocation;
