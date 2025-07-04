import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";

const SearchContainer = () => {
  const [locationResult, setLocationResult] = useState([]);

  const stateHandle = () => {
    console.log("State is Searched")
  }

  return (
    <> 
      <div className="mb-5">
        <SearchBar setLocationResult={setLocationResult}/>
        {locationResult.map((loc) => (
          <ul
            key={loc.locationId}
            className="w-full bg-gray-100 rounded shadow-gray-200 shadow-xl dark:shadow-transparent"
          >
            <li className="p-2 hover:bg-gray-200 cursor-pointer">
              {loc.locationName
                ? <NavLink to={`viewDetails/${loc.locationId}`}>{loc.locationName.toUpperCase()}, {loc.state.toUpperCase()}</NavLink>
                : <NavLink to={`/stateSearch/${loc.state}`}>{loc.state.toUpperCase()}</NavLink>}
            </li>
          </ul>
        ))}
      </div>
    </>
  );
};

export default SearchContainer;
