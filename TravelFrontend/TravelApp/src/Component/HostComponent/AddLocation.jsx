import { useContext, useRef, useState } from "react";
import { savetodb } from "../../service/locationService";
import Host from "./Host";
import { AppContext } from "../../CreateContext/Context";

const AddLocation = () => {
  const { locationLists, setLocationLists } = useContext(AppContext);

  const [newLocationPlace, setNewLocationPlace] = useState({
    image: "",
    locationName: "",
    country: "",
    rating: "",
    description: "",
  });

  const handleChange = (e) => {
    setNewLocationPlace({
      ...newLocationPlace,
      [e.target.name]: e.target.value,
    });
  };

  const handleButton = async (e) => {
    e.preventDefault();

    const newLocation = await savetodb(newLocationPlace);

    setLocationLists(...locationLists, newLocation);

    window.location.href = "/host";
  };

  return (
    <>
      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-lg font-medium mb-4">Add Location</h2>

        <form className="space-y-3" action="/host" method="post">
          <div>
            <label className="block text-sm mb-1">Image URL</label>
            <input
              type="url"
              name="image"
              placeholder="https://example.com/image.jpg"
              className="w-full p-2 border rounded"
              onChange={handleChange}
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
