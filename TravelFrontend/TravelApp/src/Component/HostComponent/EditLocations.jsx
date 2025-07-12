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
    editimage: [],
    editlocationName: "",
    editcountry: "",
    editState: "",
    editrating: "",
    editdescription: "",
    editHoledescription: "",
    editHistory: "",
    editVisitorTips: "",
    editTiming: "",
    editClosing: "",
  });

  useEffect(() => {
    const fetchEditData = async () => {
      try {
        if (id) {
          const editItem = await editFromServer(id);
          const {
            image,
            locationName,
            country,
            state,
            rating,
            description,
            holeDescription,
            history,
            VisitorTips,
            timing,
            closing,
          } = editItem;
          setEditLocations({
            editimage: image,
            editlocationName: locationName,
            editcountry: country,
            editState: state,
            editrating: rating,
            editdescription: description,
            editHoledescription: holeDescription,
            editHistory: history,
            editVisitorTips: VisitorTips,
            editTiming: timing,
            editClosing: closing,
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
      editState:
        e.target.name === "state" ? e.target.value : editLocations.editState,
      editrating:
        e.target.name === "rating" ? e.target.value : editLocations.editrating,
      editdescription:
        e.target.name === "description"
          ? e.target.value
          : editLocations.editdescription,
      editHoledescription:
        e.target.name === "holeDescription"
          ? e.target.value
          : editLocations.editHoledescription,
      editHistory:
        e.target.name === "history"
          ? e.target.value
          : editLocations.editHistory,
      editVisitorTips:
        e.target.name === "VisitorTips"
          ? e.target.value
          : editLocations.editVisitorTips,
      editTiming:
        e.target.name === "timing" ? e.target.value : editLocations.editTiming,
      editClosing:
        e.target.name === "closing"
          ? e.target.value
          : editLocations.editClosing,
    });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setEditLocations((prev) => ({
      ...prev,
      editimage: selectedFiles,
    }));
  };

  const editButton = async () => {
    let imageUrls = [];

    if (
      editLocations.editimage.length > 0 &&
      typeof editLocations.editimage[0] !== "string"
    ) {
      const formData = new FormData();
      editLocations.editimage.forEach((file) => {
        formData.append("images", file);
      });
      try {
        const res = await fetch("http://localhost:3002/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        imageUrls = data.imageUrls;
      } catch (error) {
        console.log("Image upload Failed", error);
        return;
      }
    } else {
      imageUrls = editLocations.editimage;
    }

    const updateItem = await postEditFromServer(id, {
      image: imageUrls,
      locationName: editLocations.editlocationName,
      country: editLocations.editcountry,
      state: editLocations.editState,
      rating: editLocations.editrating,
      description: editLocations.editdescription,
      holeDescription: editLocations.editHoledescription,
      history: editLocations.editHistory,
      VisitorTips: editLocations.editVisitorTips,
      timing: editLocations.editTiming,
      closing: editLocations.editClosing,
    });

    setEditLocations({
      editimage: updateItem.image,
      locationName: updateItem.locationName,
      country: updateItem.country,
      state: updateItem.state,
      rating: updateItem.rating,
      description: updateItem.description,
      holeDescription: updateItem.holeDescription,
      history: updateItem.history,
      VisitorTips: updateItem.VisitorTips,
      timing: updateItem.timing,
      closing: updateItem.closing,
    });
    window.location.href = "/host";
  };

  return (
    <>
      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-lg font-medium mb-4">Add Location</h2>

        <form className="space-y-3" action="/host" method="post">
          <div>
            <label className="block text-sm mb-1">Image Upload</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              multiple
              className="w-full p-2 border rounded"
              onChange={handleImageChange}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {Array.isArray(editLocations.editimage) &&
                editLocations.editimage.map((img, index) => (
                  <img
                    key={index}
                    src={
                      typeof img === "string" ? img : URL.createObjectURL(img)
                    }
                    alt="preview"
                    className="w-20 h-20 object-cover border rounded"
                  />
                ))}
            </div>
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
            <label className="block text-sm mb-1">State</label>
            <input
              type="text"
              name="state"
              className="w-full p-2 border rounded"
              value={editLocations.editState}
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

          <div>
            <label className="block text-sm mb-1">Complete Description</label>
            <textarea
              name="holeDescription"
              rows="3"
              className="w-full p-2 border rounded"
              value={editLocations.editHoledescription}
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm mb-1">Histoy Location</label>
            <textarea
              name="history"
              rows="3"
              className="w-full p-2 border rounded"
              value={editLocations.editHistory}
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm mb-1">VisitorTips</label>
            <textarea
              name="VisitorTips"
              rows="3"
              className="w-full p-2 border rounded"
              value={editLocations.editVisitorTips}
              onChange={handleChange}
            ></textarea> 
          </div>

          <div>
            <label className="block text-sm mb-1">Timing Details</label>
            <textarea
              name="timing"
              rows="3"
              type="text"
              className="w-full p-2 border rounded"
              value={editLocations.editTiming}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* <div>
            <label className="block text-sm mb-1">Closing Timing</label>
            <input
              name="closing"
              rows="3"
              type="text"
              className="w-full p-2 border rounded"
              value={editLocations.editClosing}
              onChange={handleChange}
            ></input>
          </div> */}

          <button
            type="button"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
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
