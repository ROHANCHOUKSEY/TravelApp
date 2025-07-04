import { Search } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../CreateContext/Context";

const SearchBar = ({ setLocationResult }) => {

  const { setStateLocation } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const controllRef = useRef(null);

  //   const fetchLocationData = async (value) => {
  //     const searchValue = value.toLowerCase().trim();

  //     if (!searchValue) {
  //       setLocationResult([]);
  //       return;
  //     }

  //     const response = await fetch("http://localhost:3002/api/host");
  //     const data = await response.json();
  //     const filterLocations = data.filter((location) => {
  //       const nameMatch = location.locationName
  //         .toLowerCase()
  //         .includes(searchValue);
  //       const stateMatch = location.state.toLowerCase().includes(searchValue);
  //       return nameMatch || stateMatch;
  //     });
  //     console.log("FilterLocation: ", filterLocations);
  //     setLocationResult(filterLocations);
  //   };

  useEffect(() => {
    const searchValue = searchQuery.toLowerCase().trim();

    if (!searchValue) {
      if (controllRef.current) controllRef.current.abort();
      setLocationResult([]);
      return;
    }

    //debounce
    const id = setTimeout(() => {
      fetchLocationData(searchValue)
    }, 200);

    return () => clearTimeout(id);

  }, [searchQuery]);

  const fetchLocationData = async (searchValue) => {

    if (controllRef.current) controllRef.current.abort();
    controllRef.current = new AbortController();
    const { signal } = controllRef.current;

    try {

      const response = await fetch("http://localhost:3002/api/host", { signal });
      const data = await response.json();

      const uniqueState = new Set(data.map((loc) => loc.state.toLowerCase()));

      if (uniqueState.has(searchValue)) {
        const stateLocation = data.filter((loc) =>
          loc.state.toLowerCase() === searchValue
        )
        setStateLocation(stateLocation);
        setLocationResult([{ locationName: "", state: searchValue }]);
        return;
      }

      const uniqueLocation = data.map((loc) => ({
        locationName: loc.locationName,
        state: loc.state,
        locationId: loc._id,
      }));

      const filteredLocation = uniqueLocation.filter((loc) => {

        const searchLocationName = loc.locationName.toLowerCase().includes(searchValue);
        const searchState = loc.state.toLowerCase().includes(searchValue);
        return searchLocationName || searchState;
      });

      setLocationResult(filteredLocation);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error);
      }
    }
  };

  const handleChange = (value) => {
    setSearchQuery(value);
    // fetchLocationData(value);
  };

  return (
    <>
      <div className="relative">
        <input
          type="text"
          className="block w-full p-4 pl-10 pr-3 py-3  border border-gray-300 rounded-lg bg-gray-50  focus:outline-0"
          placeholder="Search Your Place..."
          value={searchQuery}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className="text-gray-500 p-2 absolute inset-y-0 left-0 pr-3 flex items-center ">
          <Search />
        </div>
      </div> 
    </>
  );
};

export default SearchBar;
