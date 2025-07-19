import React, { useContext, useEffect } from 'react'
import { FaGlobe, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { NavLink, useParams } from 'react-router-dom';
import { AppContext } from '../../CreateContext/AppContext';

const SearchStateLocations = () => {
    const { setStateLocation, stateLocation, isLoggined, setStateName, stateName } = useContext(AppContext);
    const { stateName: urlStateName } = useParams();

    useEffect(() => {
        const fetchStateLocations = async () => {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/host`);
            const data = await response.json();
            const filterState = data.filter((loc) => loc.state.toLowerCase() === urlStateName.toLowerCase());
            setStateName(urlStateName.toUpperCase());
            setStateLocation(filterState);
        }
        fetchStateLocations();
    }, [urlStateName])

    return (
        <>
            <div className='relative top-[64px] min-h-screen bg-gray-50 p-6 dark:bg-gray-900 transition-colors duration-300'>
                <h1 className='m-2 text-center text-2xl font-bold dark:text-white'>EXPLORE {stateName}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stateLocation.map((location) => (
                        <div
                            key={location._id}
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
                                            to={`/viewDetails/${location._id}`}
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
            </div>
        </>
    )
}

export default SearchStateLocations