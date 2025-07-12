import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../CreateContext/Context";
import { getStateLocation } from "../../service/locationService";
import { NavLink, useParams } from "react-router-dom";

const StateLocations = () => {
  const { statebaseLocation, setStatebaseLocation } = useContext(AppContext);
  const [activeState, setActiveState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStateLocation() {
      try {
        setLoading(true);
        const data = await getStateLocation();

        if (data && data.length > 0) {
          const locationsData = data[0];
          console.log("locationsData", locationsData);
          setStatebaseLocation(locationsData);

          // Verify the data structure and set first valid state
          const validStates = Object.entries(locationsData).filter(
            ([state, locations]) =>
              Array.isArray(locations) && locations.length > 0
          );

          if (validStates.length > 0) {
            setActiveState(validStates[0][0]);
          }
        }
      } catch (error) {
        console.error("Error fetching state locations:", error);
        setError("Failed to load locations. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchStateLocation();
  }, []);

  const formatStateName = (state) => {
    if (!state) return "";
    return state
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-indigo-600 text-xl font-semibold animate-pulse">Loading...</h1>
      </div>
    );
  }


  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!statebaseLocation || typeof statebaseLocation !== "object") {
    return <div className="text-center py-8">No locations data available</div>;
  }

  // Get states that have valid arrays with locations
  const statesWithLocations = Object.entries(statebaseLocation)
    .filter(
      ([state, locations]) => Array.isArray(locations) && locations.length > 0
    )
    .map(([state]) => state);

  if (loading === true && statesWithLocations.length === 0) {
    return <div className="text-center py-8">Loading...</div>;
  }

  // Safely get current locations
  const currentLocations =
    activeState && Array.isArray(statebaseLocation[activeState])
      ? statebaseLocation[activeState]
      : [];

  return (
    <>
      <div className="relative top-[64px] container  mx-auto px-4 py-8 dark:bg-gray-900">
        <div className="mb-8">
          <h1 className="text-center font-sans text-3xl dark:text-white underline underline-offset-4  font-bold text-gray-800 mb-2">
            Discover India, One State at a Time
          </h1>
          <p className="text-lg text-center dark:text-white text-gray-600 max-w-2xl mx-auto">
            Explore breathtaking destinations across India, organized by state.
            From majestic forts to serene beaches — start your journey with just a
            click.
          </p>
        </div>
        {/* State Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {statesWithLocations.map((state) => (
            <button
              key={state}
              onClick={() => setActiveState(state)}
              className={`px-5 py-2 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ease-in-out transform hover:scale-105 ${activeState === state
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 dark:shadow-blue-700/50"
                : "bg-white text-gray-700 hover:text-blue-600 shadow-md hover:shadow-lg dark:bg-gray-700 dark:text-gray-200 dark:hover:text-blue-300 border border-gray-200 dark:border-gray-600"
                }`}
            >
              {formatStateName(state)}
            </button>
          ))}
        </div>

        {/* Locations for Selected State */}
        {activeState && currentLocations.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 dark:text-white">
              {formatStateName(activeState)} ({currentLocations.length} locations)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentLocations.map((location, index) => {
                // Ensure location is an object
                if (typeof location !== "object" || location === null) {
                  return null; // Skip invalid entries
                }

                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:hover:shadow-gray-700/50"
                  >
                    {/* Render location details */}
                    {location.image &&
                      Array.isArray(location.image) &&
                      location.image[0] && (
                        <img
                          src={location.image[0]}
                          alt={location.locationName || "Location image"}
                          className="w-full h-48 object-cover"
                        />
                      )}

                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl dark:text-white font-semibold">
                          {location.locationName || "Unnamed Location"}
                        </h3>
                        {location.rating && (
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {location.rating} ★
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 dark:text-white mb-3">
                        {location.state ? formatStateName(location.state) : ""},{" "}
                        {location.country || ""}
                      </p>

                      {location.description && (
                        <p className="text-gray-700 dark:text-white mb-3">
                          {location.description}
                        </p>
                      )}

                      <div className="flex justify-between">
                        <NavLink
                          to={`/viewDetails/${location._id}`}
                          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        >
                          View Details
                        </NavLink>
                        <button
                          onClick={() => handleFavourite(location.id)}
                          className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        >
                          Favourites
                        </button>
                      </div>

                      {/* More details would go here */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div >

    </>
  );
};

export default StateLocations;
