import { useContext, useEffect, useRef, useState } from "react";
import { savetodb, stateLocation } from "../../service/locationService";
import Host from "./Host";
import { AppContext } from "../../CreateContext/Context";

const AddLocation = () => {
  const {setLocationLists, statebaseLocation, setStatebaseLocation} =
    useContext(AppContext);

  const [newLocationPlace, setNewLocationPlace] = useState({
    image: "",
    locationName: "",
    country: "",
    state: "",
    rating: "",
    description: "",
    holeDescription: "",
    history: "",
    timing: "",
    closing: "",
  });

  const handleChange = (e) => {
    setNewLocationPlace({
      ...newLocationPlace,
      [e.target.name]: e.target.value,
    });
  };

  const handleButton = async (e) => {
    e.preventDefault();

    if (!newLocationPlace.image || newLocationPlace.image.length === 0) {
      alert("Please select at least one image");
      return;
    }

    // Step 1: Upload image
    const formData = new FormData();

    Array.from(newLocationPlace.image).forEach((file) => {
      formData.append("images", file);
    });

    console.log("FormData", formData);

    let imageUrls = [];
    try {
      const res = await fetch("http://localhost:3002/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      imageUrls = data.imageUrls;
    } catch (error) {
      console.error("Image upload failed", error);
      return;
    }

    // Step 2: Save location data
    const locationData = {
      ...newLocationPlace,
      image: imageUrls, // Set uploaded image URL
      state: newLocationPlace.state, // Ensure this is correctly set
    };

    console.log("Sending location data:", locationData); // Debug log

    try {
      const savedLocation = await stateLocation(locationData);
      const newLocation = await savetodb(locationData);
      setStatebaseLocation((prev) => [...prev, savedLocation]);
      setLocationLists((prev) => [...prev, newLocation]);
      window.location.href = "/host";
    } catch (error) {
      console.error("Error saving location:", error);
      alert("Failed to save location. Please check console for details.");
    }
  };

  return (
    <>
      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-lg font-medium mb-4">Add Location</h2>

        <form className="space-y-3" action="/host" method="post">
          <div>
            <label className="block text-sm mb-1">Image URL</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              multiple
              className="w-full p-2 border rounded"
              onChange={(e) =>
                setNewLocationPlace({
                  ...newLocationPlace,
                  image: Array.from(e.target.files),
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Location Name</label>
            <input
              type="text"
              name="locationName"
              placeholder="Enter location"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Country</label>
            <input
              type="text"
              name="country"
              placeholder="Enter country"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">State</label>
            <input
              type="text"
              name="state"
              placeholder="Enter country"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Rating (1-5)</label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              step="0.1"
              placeholder="4.5"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Enter description"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm mb-1">Complete Description</label>
            <textarea
              name="holeDescription"
              rows="3"
              placeholder="Enter complete description"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm mb-1">Histoy Location</label>
            <textarea
              name="history"
              rows="3"
              placeholder="Enter history of location"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm mb-1">Opening Timing</label>
            <input
              type="time"
              name="timing"
              placeholder="Enter Opening Timing Of Location"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Closing Timing</label>
            <input
              type="time"
              name="closing"
              placeholder="Enter Opening Timing Of Location"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
          </div>

          <button
            type="button"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={handleButton}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddLocation;
