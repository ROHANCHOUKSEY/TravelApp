import React, { useState } from "react";
import SearchBar from "./SearchBar";

const SearchContainer = () => {
  const [locationResult, setLocationResult] = useState([]);
  return (
    <>
      <div className="mb-5">
        <SearchBar setLocationResult={setLocationResult} />
        {locationResult.map((loc, id) => (
          <ul
            key={id}
            className="w-full bg-gray-100 rounded shadow-gray-200 shadow-xl dark:shadow-transparent"
          >
            <li className="p-2">
              {loc.locationName
                ? `${loc.locationName.toUpperCase()}, ${loc.state.toUpperCase()}`
                : loc.state.toUpperCase()}
            </li>
          </ul>
        ))}
      </div>
    </> 
  );
};

export default SearchContainer;
