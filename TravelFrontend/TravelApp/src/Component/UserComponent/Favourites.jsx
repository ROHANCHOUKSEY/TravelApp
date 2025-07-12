import React, { useEffect, useState } from "react";
import {
  deleteFromFavourite,
  favouriteFromServer,
} from "../../service/locationService";
import { FaStar, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Favourites = () => {
  const [locationLists, setLocationLists] = useState([]);

  useEffect(() => {
    const fetchfavourites = async () => {
      try {
        const data = await favouriteFromServer();
        setLocationLists(data);
      } catch (error) {
        console.log("Favourite is not fetch");
      }
    };
    fetchfavourites();
  }, []);

  const handleDelete = async (id) => {
    console.log("ID", id);
    try {
      const deletedId = await deleteFromFavourite(id);
      const updatedList = locationLists.filter((fav) => fav.id !== deletedId);
      setLocationLists(updatedList);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <>
      <div className="relative top-[64px] min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
        <div className="mb-8">
          <h1 className="text-center font-sans text-3xl underline underline-offset-4  font-bold text-gray-800 mb-2 dark:text-white">
            Your Favourite Destinations
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locationLists.length <= 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="mb-6 p-6 bg-blue-50 rounded-full animate-pulse">
                <svg
                  className="w-20 h-20 text-blue-400 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                No Favorites Yet
              </h1>
              <p className="text-lg text-gray-600 dark:text-white max-w-md mb-6">
                You haven't saved any locations to your favorites. Start
                exploring and add places you love!
              </p>
              <NavLink
                to="/location"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md"
              >
                Discover Amazing Places
              </NavLink>
            </div>
          ) : (
            locationLists.map((location) => (
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
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold dark:text-white text-gray-800">
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
                    <NavLink
                      to={`/viewDetails/${location.id}`}
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  shadow-blue-500/50  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      View Details
                    </NavLink>
                    <button
                      onClick={() => handleDelete(location.id)}
                      className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                    >
                      <svg
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          strokeWidth="2"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        ></path>
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Favourites;
