const FavouriteLocation = require("../Models/FavoutitesLocation");
const TravelLocations = require("../Models/TravelLocation");

exports.postFavourite = async (req, res, next) => {
//   console.log(req.body);
  const { Locationid } = req.body;
  const newFavId = await new FavouriteLocation({ Locationid });
  await newFavId.save();
  res.status(200).json(newFavId);
};

exports.getFavourites = async (req, res, next) => {
  const favourites = await FavouriteLocation.find();
  const locationIds = favourites.map((fav) => fav.Locationid);
  const locations = await TravelLocations.find({ _id: { $in: locationIds } });

  res.status(200).json(locations); 
};
