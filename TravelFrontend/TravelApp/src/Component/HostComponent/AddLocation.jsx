import { useContext, useState } from "react";
import { savetodb, stateLocation } from "../../service/locationService";
import { AppContext } from "../../CreateContext/Context";

const AddLocation = () => {
  const { setLocationLists, setStatebaseLocation, mode } = useContext(AppContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newLocationPlace, setNewLocationPlace] = useState({
    image: "",
    locationName: "",
    country: "",
    state: "",
    rating: "",
    description: "",
    holeDescription: "",
    history: "",
    VisitorTips: "",
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
    setIsSubmitting(true);

    if (!newLocationPlace.image || newLocationPlace.image.length === 0) {
      alert("Please select at least one image");
      setIsSubmitting(false);
      return;
    }

    try {
      // Upload images
      const formData = new FormData();
      Array.from(newLocationPlace.image).forEach((file) => {
        formData.append("images", file);
      });

      const res = await fetch("http://localhost:3002/api/upload", {
        method: "POST",
        body: formData,
      });
      const { imageUrls } = await res.json();

      // Save location data
      const locationData = {
        ...newLocationPlace,
        image: imageUrls,
      };

      const [savedStateLocation, newLocation] = await Promise.all([
        stateLocation(locationData),
        savetodb(locationData)
      ]);

      setStatebaseLocation(prev => [...prev, savedStateLocation]);
      setLocationLists(prev => [...prev, newLocation]);

      window.location.href = "/host";
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to save location: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`relative top-[64px] min-h-screen py-8 px-4 transition-colors duration-300 ${mode === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <div className={`max-w-2xl mx-auto rounded-xl shadow-lg overflow-hidden ${mode === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Header */}
        <div className={`p-6 ${mode === 'dark' ? 'bg-gray-700' : 'bg-blue-600'} text-white`}>
          <h2 className="text-2xl font-bold">Add New Location</h2>
          <p className="opacity-90">Share your favorite travel destination with the community</p>
        </div>

        {/* Form */}
        <form className="p-6 space-y-6" onSubmit={handleButton}>
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Location Images</label>
            <div className={`flex items-center justify-center w-full rounded-lg border-2 border-dashed ${mode === 'dark' ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'} transition-colors cursor-pointer`}>
              <input
                type="file"
                name="image"
                accept="image/*"
                multiple
                className="hidden"
                id="image-upload"
                onChange={(e) => setNewLocationPlace({...newLocationPlace, image: Array.from(e.target.files)})}
              />
              <label htmlFor="image-upload" className="w-full p-8 text-center cursor-pointer">
                {newLocationPlace.image?.length > 0 ? (
                  <span className="text-blue-500 dark:text-blue-400">
                    {newLocationPlace.image.length} file(s) selected
                  </span>
                ) : (
                  <div className="space-y-1">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48" 
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                        Click to upload
                      </span>{' '}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Location Name</label>
              <input
                type="text"
                name="locationName"
                placeholder="Taj Mahal"
                className={`w-full p-3 rounded-lg border ${mode === 'dark' ? 'bg-gray-700 border-gray-600 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition`}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                type="text"
                name="country"
                placeholder="India"
                className={`w-full p-3 rounded-lg border ${mode === 'dark' ? 'bg-gray-700 border-gray-600 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition`}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">state</label>
              <input
                type="text"
                name="state"
                placeholder="Uttar Pradesh"
                className={`w-full p-3 rounded-lg border ${mode === 'dark' ? 'bg-gray-700 border-gray-600 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition`}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                step="0.1"
                placeholder="4.5"
                className={`w-full p-3 rounded-lg border ${mode === 'dark' ? 'bg-gray-700 border-gray-600 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition`}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Short Description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Brief description that will appear in listings..."
              className={`w-full p-3 rounded-lg border ${mode === 'dark' ? 'bg-gray-700 border-gray-600 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition`}
              onChange={handleChange}
              required
            ></textarea>
          </div> 

          {/* Full Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Full Description</label>
            <textarea
              name="holeDescription"
              rows="5"
              placeholder="Detailed description about the location..."
              className={`w-full p-3 rounded-lg border ${mode === 'dark' ? 'bg-gray-700 border-gray-600 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition`}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* History */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Historical Background</label>
            <textarea
              name="history"
              rows="4"
              placeholder="Historical significance of this location..."
              className={`w-full p-3 rounded-lg border ${mode === 'dark' ? 'bg-gray-700 border-gray-600 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition`}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* VisitorTips */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Visitor Tips</label>
            <textarea
              name="VisitorTips"
              rows="4"
              placeholder="Visitor Tips To Help Turiest"
              className={`w-full p-3 rounded-lg border ${mode === 'dark' ? 'bg-gray-700 border-gray-600 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition`}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Timing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Opening Time</label>
              <input
                type="time"
                name="timing"
                className={`w-full p-3 rounded-lg border ${mode === 'dark' ? 'bg-gray-700 border-gray-600 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition`}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Closing Time</label>
              <input
                type="time"
                name="closing"
                className={`w-full p-3 rounded-lg border ${mode === 'dark' ? 'bg-gray-700 border-gray-600 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition`}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-indigo-700 dark:to-indigo-800 hover:from-blue-700 hover:to-indigo-800 dark:hover:from-indigo-600 dark:hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-indigo-500 transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Submit Location'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLocation;