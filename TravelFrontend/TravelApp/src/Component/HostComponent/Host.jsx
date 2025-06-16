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
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      {locationLists.length === 0 ? (
        <div className="mt-15 mb-8">
          <h1 className="text-center font-sans text-3xl underline underline-offset-4  font-bold text-gray-800 mb-2 dark:text-white">
            There is no location shared
          </h1>
        </div>
      ) : (
        <div className="mt-15 mb-8">
          <h1 className="text-center font-sans text-3xl underline underline-offset-4  font-bold text-gray-800 mb-2 dark:text-white">
            Locations You've Shared
          </h1>
            <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto dark:text-white">
            These are the destinations you've added to the platform. Thank you for helping travelers discover new places and experiences.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locationLists.map((location) => (
          <div
            key={location.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:hover:shadow-gray-700/50"
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
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
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

              <p className="text-gray-600 text-sm mb-4 line-clamp-2 dark:text-white">
                {location.description}
              </p>

              <div className="flex justify-between items-center">
                <button
                  className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                  onClick={() => deleteLocation(location.id)}
                >
                  <svg
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    class="h-5 w-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      stroke-width="2"
                      stroke-linejoin="round"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                  Delete
                </button>
                <NavLink
                  to={`/editLocation/${location.id}`}
                  className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 ease-in-out delay-75 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
                >
                  <svg
                    class="h-5 w-5 mr-1 self-center items-center"
                    fill="none"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"></path>
                  </svg>
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
