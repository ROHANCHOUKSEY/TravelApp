import { Search } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../CreateContext/AppContext";

const SearchBar = ({ setLocationResult }) => {

  const { showResult, setShowResult } = useContext(AppContext);
  const [search, setSearch] = useState("")

  const fetchLocationData = async () => {

    if(search === '') return;

    console.log("API CALL", search);
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/host/search?q=${encodeURIComponent(search)}`);
      const data = await response.json();
      setLocationResult(data);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    //debounce
    const timer = setTimeout(fetchLocationData, 300);

    return () => clearTimeout(timer);

  }, [search]);

  const handleBlur = () => {
    setTimeout(() => {
      setShowResult(false);
    }, 300)
  }

  return (
    <>
      <div className="relative text-center max-w-2xl w-full mx-auto">
        {/* Search Icon (Left) */}
        <div className="absolute left-6 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Input Field */}
        <input
          type="text"
          className=" md:w-full py-4 pl-12 pr-12 rounded-none md:rounded-full border-2 border-amber-300/30 bg-white/90 backdrop-blur-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-lg transition-all duration-200"
          placeholder="Search destinations, states, or experiences..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShowResult(true)}
          onBlur={handleBlur}
        />

        {/* Clear Button (Right) - Only shows when there's text */}
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Search Button (Right) - Shows when no text or replaces clear button */}
        {!search && (
          <button
            onClick={() => {/* Add your search handler here */ }}
            className="absolute right-6 md:right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-amber-500 to-orange-600 text-white p-2 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        )}
      </div>
    </>
  );
};

export default SearchBar;
