import { useEffect, useState } from "react";
import { editFromServer, savetodb } from "../../service/locationService";
import { useParams } from "react-router-dom";

const EditLocations = () => {
  const { id } = useParams();

  const [editLocations, setEditLocations] = useState({
    editimage: "",
    editlocationName: "",
    editcountry: "",
    editrating: "",
    editdescription: "",
  });

  useEffect(() => {
    const fetchEditData = async () => {
      if (id) {
        const editItem = await editFromServer(id);
        const { image, locationName, country, rating, description } = editItem;
        setEditLocations({
          editimage: image,
          editlocationName: locationName,
          editcountry: country,
          editrating: rating,
          editdescription: description,
        });
      }
    };

    fetchEditData();
  }, [id]);

  const handleChange = () => {};

  const editButton = () => {
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
              className="w-full p-2 border rounded"
              value={editLocations.editimage}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Location Name</label>
            <input
              type="text"
              name="locationName"
              className="w-full p-2 border rounded"
              value={editLocations.editlocationName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Country</label>
            <input
              type="text"
              name="country"
              className="w-full p-2 border rounded"
              value={editLocations.editcountry}
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
              className="w-full p-2 border rounded"
              value={editLocations.editrating}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              name="description"
              rows="3"
              className="w-full p-2 border rounded"
              value={editLocations.editreditdescriptionating}
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            type="button"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={editButton}
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default EditLocations;
