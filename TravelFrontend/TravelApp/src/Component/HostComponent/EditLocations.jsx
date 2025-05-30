import { useEffect, useState } from "react";
import {
  editFromServer, 
  postEditFromServer,
  savetodb,
} from "../../service/locationService";
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
      try {
        if (id) {
          const editItem = await editFromServer(id);
          const { image, locationName, country, rating, description } =
            editItem;
          setEditLocations({
            editimage: image,
            editlocationName: locationName,
            editcountry: country,
            editrating: rating,
            editdescription: description,
          });
        }
      } catch (error) {
        console.log("Edit data is not fetch");
      }
    };

    fetchEditData();
  }, [id]);

  const handleChange = (e) => {
    console.log(editLocations);
    setEditLocations({
      editimage:
        e.target.name === "image" ? e.target.value : editLocations.editimage,
      editlocationName:
        e.target.name === "locationName"
          ? e.target.value
          : editLocations.editlocationName,
      editcountry:
        e.target.name === "country"
          ? e.target.value
          : editLocations.editcountry,
      editrating:
        e.target.name === "rating" ? e.target.value : editLocations.editrating,
      editdescription:
        e.target.name === "description"
          ? e.target.value
          : editLocations.editdescription,
    });
  };

  const editButton = async () => {
    const updateItem = await postEditFromServer(id, {
      image: editLocations.editimage,
      locationName: editLocations.editlocationName,
      country: editLocations.editcountry,
      rating: editLocations.editrating,
      description: editLocations.editdescription,
    });
    setEditLocations({
      image: updateItem.image,
      locationName: updateItem.locationName,
      country: updateItem.country,
      rating: updateItem.rating,
      description: updateItem.description,
    });
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
              value={editLocations.editdescription}
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
