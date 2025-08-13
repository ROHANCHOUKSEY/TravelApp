import React, { useContext, useEffect, useState } from "react";
import { locationFromServer } from "../service/locationService";
import { FaStar, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import { Search } from "lucide-react";
import SearchBar from "./SearchBar/SearchBar";
import SearchContainer from "./SearchBar/SearchContainer";
import { AppContext } from "../CreateContext/AppContext";
import ImageSlider from "./ImagesFeature/ImageSlider";
import HomePage from "./HomeComponent.jsx/HomePage";
import "../index.css"

const Explore = () => {
  const { locationLists, setLocationLists, isLoggined } =
    useContext(AppContext);

  const [loading, setLoading] = useState(true);
  // Add filtration state
  const [selectLocation, setSelectLocation] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [locationCards, setLocationCards] = useState([]);

  // Location types for filtering
  const Locations = ["Temple", "Hill Station", "Beach", "Zoo", "Fort"];

  // Handle location selection
  const handleSelectLocation = (e) => {
    setSelectLocation(e.target.value);
  };

  // Filter locations based on selected type
  const filterLocations = () => {
    if (selectLocation) {
      const filtered = locationLists.filter(
        (loc) => loc.typeOfPlace.toLowerCase() === selectLocation.toLowerCase()
      );
      setFilteredLocations(filtered);
      return filtered;
    } else {
      setFilteredLocations(locationLists);
      return locationLists;
    }
  };

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

  // Update location cards when locationLists or filter changes
  useEffect(() => {
    const isPageReload = window.performance.getEntriesByType("navigation")[0]?.type === "reload";
    const locationsToDisplay = filterLocations();
    if (isPageReload && locationsToDisplay && locationsToDisplay.length) {
      const shuffledCards = suffleCard(locationsToDisplay);
      setLocationCards(shuffledCards);
    } else {
      setLocationCards(locationsToDisplay);
    }
  }, [locationLists, selectLocation]);


  return (
    <>
      <div className="relative top-[64px] min-h-screen bg-gray-50 p-0 dark:bg-gray-900 transition-colors duration-300">

        {/* Home PageConainter */}
        <HomePage />

        {/* //Filteration Container */}
        {isLoggined ? <SearchContainer /> : ""}

        {isLoggined && <div className="bg-gray-100 dark:bg-gray-900 relative bottom-60 md:bottom-62 h-62 md:h-100 shadow-xl">
          <div className="w-full text-center">
            <h1 className="text-[15px] md:text-[50px] font-extrabold uppercase text-sky-400 tracking-wide">Explore India’s Diverse Beauty
              {/* <span class="absolute bottom-82 left-0.5 md:left-45 w-100 h-1 bg-amber-400"></span> */}
              {/* <span class="absolute bottom-82 right-0.5 md:right-45 w-100 h-1 bg-emerald-500"></span> */}
            </h1>
          </div>

          {/* Search Bar */}
          <ImageSlider />
        </div>}

        <div className={`relative  ${isLoggined ? 'bottom-55 md:bottom-50' : 'md:bottom-0'} text-center`}>
          <div className="mb-8">
            <h1 className="text-[20px] md:text-[60px] font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-wide mb-4 animate-pulse">
              Top Destinations to Explore in India
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-[14px] md:text-2xl font-medium text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Handpicked places worth visiting for history, culture, and natural beauty.
            </p>

            {/* Add Filter Dropdown */}
            {isLoggined && (
              <div className="mt-6 mb-4 relative md:right-[40%]">
                <select
                  value={selectLocation}
                  onChange={handleSelectLocation}
                  className="w-[220px] px-4 py-2 border-2 border-gray-300 rounded-lg 
                 focus:outline-none focus:border-blue-500 
                 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out
                 bg-gradient-to-r from-blue-50 via-white to-blue-100 
                 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
                 text-gray-800 dark:text-gray-200 font-medium "
                >
                  <option
                    value=""
                    className="border-b border-gray-300"
                  >
                    All Locations
                  </option>
                  {Locations.map((location, index) => (
                    <option
                      key={index}
                      value={location}
                      className="border-b border-gray-300"
                    >
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            )}

          </div>
        </div>

        {loading ? <h1>Loading...</h1> :
          <div className={`relative ${isLoggined ? 'bottom-55 md:bottom-45' : ' bottom-0'} grid grid-cols-1 md:grid-cols-2 p-6 lg:grid-cols-3 gap-10`}>

            {locationCards.map((location) => (
              <div
                key={location.id}
                className="transition-transform duration-300 ease-in-out transform hover:-translate-y-2 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg  dark:bg-gray-800 dark:hover:shadow-gray-700/50 "
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
                        className="text-white bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg dark:shadow-lg  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300"
                      >
                        View Details
                      </NavLink>
                    ) : (
                      <NavLink
                        to="login"
                        className="text-white bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg  dark:shadow-lg  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-300"
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
