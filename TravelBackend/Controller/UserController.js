const FavouriteLocation = require("../Models/FavoutitesLocation");
const TravelLocations = require("../Models/TravelLocation");

exports.postFavourite = async (req, res, next) => {
  //   console.log(req.body);
  const { Locationid } = req.body;

  const existingFav = await FavouriteLocation.findOne({ Locationid });

  if (existingFav) {
    return res.status(409).json({ message: "Already in favourite" });
  }

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

exports.deleteFavourites = async (req, res, next) => {
  console.log("favourite Id", req.params);
  const { id } = req.params;
  const deleteFavourite = await FavouriteLocation.findOneAndDelete({
    Locationid: id,
  });
  res.status(200).json(deleteFavourite);
};
