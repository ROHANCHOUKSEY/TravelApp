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
}