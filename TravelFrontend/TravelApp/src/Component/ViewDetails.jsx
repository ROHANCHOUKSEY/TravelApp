import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { locationDetails } from "../service/locationService";

const ViewDetails = () => {
  const [details, setDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await locationDetails(id);
        setDetails(data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    }

    fetchDetails();
  }, [id]);

  if (!details) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{details.locationName}</h1>
      <img src={details.image} alt={details.locationName} className="w-full h-96 object-cover rounded mb-4" />
      <p className="text-gray-700 mb-2"><strong>Country:</strong> {details.country}</p>
      <p className="text-gray-700 mb-2"><strong>Rating:</strong> {details.rating}</p>
      <p className="text-gray-700 mb-2"><strong>Description:</strong> {details.description}</p>
      <p className="text-gray-700 mb-2"><strong>Complete Description:</strong> {details.holeDescription}</p>
      <p className="text-gray-700 mb-2"><strong>History:</strong> {details.history}</p>
      <p className="text-gray-700 mb-2"><strong>Timing:</strong> {details.timing} - {details.closing}</p>
    </div>
  );
};

export default ViewDetails;
