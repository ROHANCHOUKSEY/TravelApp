import React, { useEffect, useState } from "react";
import { deleteFromServer, hostlocation } from "../../service/locationService";
import { FaStar, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";

const Host = () => {
  const [locationLists, setLocationLists] = useState([]);

  const id = useParams();

  useEffect(() => {
    async function fetchLocation() {
      const response = await hostlocation();
      setLocationLists(response);
    }
    fetchLocation();
  }, []);

  const deleteLocation = async (id) => {
    const deleteLocation = await deleteFromServer(id);
    const UpdateList = locationLists.filter(
      (item) => item.id !== deleteLocation
    );
    setLocationLists(UpdateList);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {locationLists.length === 0 ? (
        <h1 className="w-full text-center font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">There is no hosted Location</h1>
      ) : (
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Your Hosted Locations
        </h1>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locationLists.map((location) => (
          <div
            key={location.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Location Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={location.image}
                alt={location.locationName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=Image+Not+Available";
                }}
              />
              <div className="absolute top-2 right-2 bg-white bg-opacity-80 px-2 py-1 rounded-full flex items-center">
                <FaStar className="text-yellow-500 mr-1" />
                <span className="font-semibold text-gray-800">
                  {location.rating}
                </span>
              </div>
            </div>

            {/* Location Details */}
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-gray-800">
                  {location.locationName}
                </h2>
                <div className="flex items-center bg-blue-100 px-2 py-1 rounded">
                  <FaGlobe className="text-blue-500 mr-1" />
                  <span className="text-sm text-blue-800">
                    {location.country}
                  </span>
                </div>
              </div>

              <div className="flex items-center text-gray-600 mb-3">
                <FaMapMarkerAlt className="mr-2 text-red-500" />
                <span className="text-sm">{location.country}</span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {location.description}
              </p>

              <div className="flex justify-between items-center">
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                  onClick={() => deleteLocation(location.id)}
                >
                  Delete
                </button>
                <NavLink
                  to={`/editLocation/${location.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Edit
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Host;
