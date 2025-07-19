import { Search } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SearchBar = ({ setLocationResult }) => {

  const [searchQuery, setSearchQuery] = useState("");
  const controllRef = useRef(null);

  const fetchLocationData = async (searchValue) => {

    if (controllRef.current) controllRef.current.abort();
    controllRef.current = new AbortController();
    const { signal } = controllRef.current;

    try {

      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/host`, { signal });
      const data = await response.json();

      const uniqueState = new Set(data.map((loc) => loc.state.toLowerCase()));

      if (uniqueState.has(searchValue)) {
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

  const handleChange = (value) => {
    setSearchQuery(value);
  };

  return (
    <>
      <div className="relative max-w-lg mx-auto">
        <input
          type="text"
          className="block w-full p-4 pl-12 pr-10 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
          placeholder="Search your place..."
          value={searchQuery}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        {searchQuery && (
          <button
            onClick={() => handleChange('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </>
  );
};

export default SearchBar;
