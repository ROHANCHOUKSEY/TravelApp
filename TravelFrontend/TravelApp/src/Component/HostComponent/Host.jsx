import React, { useEffect, useState } from "react";
import { hostlocation } from "../service/locationService";
import { Link } from "react-router-dom";

const Host = () => {
  const [locationLists, setLocationLists] = useState([]);

  useEffect(() => {
    async function fetchLocation() {
      try {
        const response = await hostlocation();

        if (Array.isArray(response)) {
          setLocationLists(response);
        } else {
          setLocationLists([]); // fallback if response is not array
        }
      } catch (error) {
        console.error("Error fetching host locations:", error);
        setLocationLists([]); // prevent crash
      }
    }

    fetchLocation();
  }, []);

  return (
    <div className="p-10 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Hosted Locations</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {locationLists.map((location) => (
          <div key={location._id} className="bg-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img
              src={
                Array.isArray(location.image)
                  ? location.image[0]
                  : "https://via.placeholder.com/400x300?text=No+Image"
              }
              alt={location.locationName}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{location.locationName}</h2>
              <p className="text-gray-700 mb-1">
                <strong>Country:</strong> {location.country}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>State:</strong> {location.state}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Rating:</strong> {location.rating}
              </p>
              <p className="text-gray-700 mb-3">
                <strong>Description:</strong>{" "}
                {location.description?.substring(0, 100)}...
              </p>

              <div className="flex justify-between">
                <Link
                  to={`/viewlocation/${location._id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  View
                </Link>
                <Link
                  to={`/editlocation/${location._id}`}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Fallback UI if no data */}
        {locationLists.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            No hosted locations found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Host;
