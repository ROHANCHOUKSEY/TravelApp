import React, { useContext, useEffect, useState } from "react";
import { locationFromServer } from "../service/locationService";
import { FaStar, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import { Search } from "lucide-react";
import SearchBar from "./SearchBar/SearchBar";
import SearchContainer from "./SearchBar/SearchContainer";
import { AppContext } from "../CreateContext/AppContext";
import ImageSlider from "./ImagesFeature/ImageSlider";

const Explore = () => {
  const { locationLists, setLocationLists, isLoggined } =
    useContext(AppContext);

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchLocation() {
      try {
        setLoading(true);
        const response = await locationFromServer();
        setLocationLists(response);
      } catch (error) {
        console.log("All location is not fetch", error);
      }
    }
    fetchLocation();
    setLoading(false);
  }, []);

  const suffleCard = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const [locationCards, setLocationCards] = useState([]);

  useEffect(() => {
    const isPageReload = window.performance.getEntriesByType("navigation")[0]?.type === "reload";
    if (isPageReload && locationLists && locationLists.length) {
      const shuffledCards = suffleCard(locationLists);
      setLocationCards(shuffledCards);
      // console.log("Shuffled because page was reloaded manually");
    } else {
      setLocationCards(locationLists);
      // console.log("Used original order because it was not a page reload");
    }

  }, [locationLists]);


  return (
    <>
      <div className="relative top-[64px] min-h-screen bg-gray-50 p-0 dark:bg-gray-900 transition-colors duration-300">
        <div className="w-full flex justify-center">
          <img className="w-full h-120" src="/Images/Explore.jpeg" alt="" />
        </div>
        <div className="mb-8 relative bottom-100">
          <h1 className="text-center font-sans text-3xl underline underline-offset-4 font-bold text-white dark:text-gray-100 mb-2">
            Discover Incredible India
          </h1>
          <p className="text-lg text-white dark:text-gray-300 max-w-2xl mx-auto text-center">
            Explore breathtaking destinations and hidden gems across our beautiful
            country
          </p>
        </div>

        {/* Search Bar */}
        {isLoggined ? <SearchContainer /> : ""}
        {isLoggined ? <ImageSlider /> : ""}
        

        {loading ? <h1>Loading...</h1> :
          <div className={`relative ${isLoggined ? 'bottom-40' :' bottom-20'} grid grid-cols-1 md:grid-cols-2 p-6 lg:grid-cols-3 gap-6`}>
            {locationCards.map((location) => (
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
                  <div className="absolute top-2 right-2 bg-white bg-opacity-80 px-2 py-1 rounded-full flex items-center dark:bg-gray-700 dark:bg-opacity-90">
                    <FaStar className="text-yellow-500 mr-1" />
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {location.rating}
                    </span>
                  </div>
                </div>

                {/* Location Details */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                      {location.locationName}
                    </h2>
                    <div className="flex items-center bg-blue-100 px-2 py-1 rounded dark:bg-blue-900/50">
                      <FaGlobe className="text-blue-500 mr-1 dark:text-blue-400" />
                      <span className="text-sm text-blue-800 dark:text-blue-200">
                        {location.country}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-3 dark:text-gray-400">
                    <FaMapMarkerAlt className="mr-2 text-red-500 dark:text-red-400" />
                    <span className="text-sm">
                      {location.country}, {location.state}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 dark:text-gray-300">
                    {location.description}
                  </p>

                  <div className="flex justify-between items-center">
                    {isLoggined ? (
                      <NavLink
                        to={`viewDetails/${location.id}`}
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg dark:shadow-lg  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300"
                      >
                        View Details
                      </NavLink>
                    ) : (
                      <NavLink
                        to="login"
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg  dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300"
                      >
                        View Details
                      </NavLink>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </>
  );
};

export default Explore;
