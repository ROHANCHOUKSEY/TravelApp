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
    return <div className="text-center py-8">Loading locations...</div>;
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

  if (statesWithLocations.length === 0) {
    return <div className="text-center py-8">No locations found.</div>;
  }

  // Safely get current locations
  const currentLocations =
    activeState && Array.isArray(statebaseLocation[activeState])
      ? statebaseLocation[activeState]
      : [];

  return (
    <div className="container  mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mt-10 mb-8 text-center">
        Explore Locations by State
      </h1>

      {/* State Selection Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {statesWithLocations.map((state) => (
          <button
            key={state}
            onClick={() => setActiveState(state)}
            className={`px-4 py-2 rounded-full ${
              activeState === state
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {formatStateName(state)}
          </button>
        ))}
      </div>

      {/* Locations for Selected State */}
      {activeState && currentLocations.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">
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
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
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
                      <h3 className="text-xl font-semibold">
                        {location.locationName || "Unnamed Location"}
                      </h3>
                      {location.rating && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {location.rating} ★
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 mb-3">
                      {location.state ? formatStateName(location.state) : ""},{" "}
                      {location.country || ""}
                    </p>

                    {location.description && (
                      <p className="text-gray-700 mb-3">
                        {location.description}
                      </p>
                    )}

                    <NavLink
                      to={`/viewDetails/${location._id}`}
                      className="text-blue-500"
                    >
                      View Details
                    </NavLink>

                    {/* More details would go here */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StateLocations;
