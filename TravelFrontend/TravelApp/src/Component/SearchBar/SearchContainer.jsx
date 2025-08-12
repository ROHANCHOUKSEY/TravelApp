import React, { useContext, useState } from "react";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import "../../index.css"
import { AppContext } from "../../CreateContext/AppContext";

const SearchContainer = () => {
  const [showResult, setShowResult] = useState(false);
  const [locationResult, setLocationResult] = useState([]); 
  return (
    <>
      <div className="mb-5 max-w-full w-150 mx-auto relative bottom-63">
        <SearchBar setLocationResult={setLocationResult} setShowResult={setShowResult} />
        {showResult && locationResult.length > 0 && (
          <div className="mt-2 space-y-2 h-0 relative z-1">
            {/* Search Results Container with Light Gray Background */}
            <div className={showResult && `bg-gray-100 rounded-lg p-3 shadow-lg border border-gray-200 max-h-80 overflow-y-scroll`}>
              {locationResult.map((loc, index) => (
                <div
                  key={loc._id || `state-${loc.state}-${index}`}
                  className="w-60 md:w-full bg-white rounded-lg border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden mb-2 last:mb-0"
                >
                  <NavLink
                    to={loc.locationName ? `viewDetails/${loc._id}` : `/stateSearch/${loc.state}`}
                    className="block p-3 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <svg
                        className={`w-5 h-5 mr-3 ${loc.locationName ? 'text-blue-500' : 'text-purple-500'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={loc.locationName ? "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" : "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"}
                        />
                      </svg>
                      <span className="font-medium text-gray-800">
                        {loc.locationName
                          ? `${loc.locationName.toUpperCase()}, ${loc.state.toUpperCase()}`
                          : `ALL LOCATIONS IN ${loc.state.toUpperCase()}`}
                      </span>
                    </div>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchContainer;
