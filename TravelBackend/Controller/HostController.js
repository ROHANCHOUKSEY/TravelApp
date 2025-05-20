const TravelLocations = require("../Models/TravelLocation");

exports.postLocation = async (req, res, next) => {
  console.log(req.body);
  const { image, locationName, country, rating, description } = req.body;
  const newLocation = await new TravelLocations({
    image,
    locationName,
    country,
    rating,
    description,
  });
  await newLocation.save();
  res.status(200).json(newLocation);
};

exports.getLocation = async (req, res, next) => {
  const getLocations = await TravelLocations.find(req.body);
  res.status(200).json(getLocations);
};

exports.getEditLocation = async (req, res, next) => {
  const { id } = req.params;
  const editLocation = await TravelLocations.findById(id);
  res.status(200).json(editLocation);
};

exports.postEditLocation = async (req, res, next) => {
  const { id } = req.params;
  const { image, locationName, country, rating, description } = req.body;
  const updateLocation = await TravelLocations.findByIdAndUpdate(id, {
    image,
    locationName,
    country,
    rating,
    description,
  }, {new: true});
  await updateLocation.save();
  res.status(200).json(updateLocation);
};
